/**
 * One-shot backfill for the new `contact_messages.source` column.
 *
 * Before this column existed, financing pre-qualification leads went through
 * /leads/contact with a literal `[FINANCING PRE-QUALIFICATION — source:
 * financing]` prefix at the top of `message`. Now that we have a structured
 * `source` column (default "contact"), this script:
 *
 *   1. Sets `source = 'financing'` on any row whose message body still starts
 *      with that legacy prefix.
 *   2. Strips the prefix (and its trailing blank line) from `message` so the
 *      admin inbox shows just what the customer wrote.
 *
 * The script is idempotent and safe to re-run — rows that were already
 * migrated (no prefix in `message`) are skipped automatically by the WHERE
 * clauses. It runs as part of `scripts/post-merge.sh` after the schema push,
 * so a checkout that pulls in the new column also gets the data brought
 * forward in the same step.
 */

import { db, contactMessagesTable, pool } from "@workspace/db";
import { sql } from "drizzle-orm";

const LEGACY_PREFIX_PATTERN = "[FINANCING PRE-QUALIFICATION%";

async function main(): Promise<void> {
  // Match the prefix case-insensitively (the constant the form used was
  // upper-case but defensiveness is cheap) and only against the very start
  // of the message after trimming leading whitespace.
  const tagged = await db
    .update(contactMessagesTable)
    .set({ source: "financing" })
    .where(
      sql`upper(ltrim(${contactMessagesTable.message})) like ${LEGACY_PREFIX_PATTERN}
          and ${contactMessagesTable.source} <> 'financing'`,
    )
    .returning({ id: contactMessagesTable.id });

  // Strip the legacy header line (and the blank line that follows it) from
  // the body so the admin sees the customer's intake fields cleanly. The
  // regexp accepts an optional CR before the newline so Windows-edited rows
  // are handled too.
  const cleaned = await db
    .update(contactMessagesTable)
    .set({
      message: sql`regexp_replace(${contactMessagesTable.message},
        '^\\s*\\[FINANCING PRE-QUALIFICATION[^\\n]*\\r?\\n(\\r?\\n)?',
        '', 'i')`,
    })
    .where(
      sql`upper(ltrim(${contactMessagesTable.message})) like ${LEGACY_PREFIX_PATTERN}`,
    )
    .returning({ id: contactMessagesTable.id });

  console.log(
    `backfill-contact-source: tagged ${tagged.length} row(s) as financing, cleaned ${cleaned.length} message body(ies).`,
  );
}

main()
  .catch((err) => {
    console.error("backfill-contact-source failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
