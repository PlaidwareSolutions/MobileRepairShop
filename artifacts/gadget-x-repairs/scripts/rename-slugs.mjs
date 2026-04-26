import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "..", "src");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

const SPECIAL = {
  "samsung-phone-repair-houston": "samsung-repair-houston-tx",
  "motorola-phone-repair-houston": "motorola-repair-houston-tx",
  "ipad-tablet-repair-houston": "tablet-repair-houston-tx",
  "buy-my-phone-houston": "sell-phone-houston-tx",
  "att-prepaid-activation-houston": "att-activation-houston-tx",
  "xfinity-mobile-payment-houston": "xfinity-mobile-activation-houston-tx",
  "prepaid-phone-activations-houston": "phone-activation-houston-tx",
};

const AREA_SLUGS = [
  "phone-repair-sugar-land",
  "phone-repair-missouri-city",
  "phone-repair-stafford",
  "phone-repair-katy",
  "phone-repair-alief",
  "phone-repair-sharpstown",
];

const ARTICLE_NONHOUSTON_SLUGS = [
  "ps5-hdmi-port-repair-worth-it",
  "repair-or-replace-laptop",
  "phone-battery-needs-replacement",
  "used-vs-refurbished-phones",
  "can-locked-phone-be-unlocked",
  "check-before-buying-used-iphone",
  "laptop-not-charging",
  "xbox-hdmi-port-problems",
];

function rewrite(src) {
  let out = src;

  for (const [from, to] of Object.entries(SPECIAL)) {
    out = out.split(from).join(to);
  }

  out = out.replace(/-houston(?![a-z-])/g, "-houston-tx");

  for (const slug of AREA_SLUGS) {
    out = out.replace(new RegExp(`\\b${slug}\\b(?!-tx)`, "g"), `${slug}-tx`);
  }

  for (const slug of ARTICLE_NONHOUSTON_SLUGS) {
    out = out.replace(new RegExp(`\\b${slug}\\b(?!-tx)`, "g"), `${slug}-tx`);
  }

  return out;
}

const files = walk(SRC);

let changed = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  const after = rewrite(before);
  if (after !== before) {
    writeFileSync(f, after);
    changed += 1;
    console.log("rewrote", f.replace(SRC, "src"));
  }
}
console.log(`Rewrote ${changed} file(s).`);
