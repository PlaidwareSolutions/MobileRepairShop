import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { asc } from "drizzle-orm";
import { db, promotionsTable } from "@workspace/db";
import { isPromotionLive } from "../lib/promotionsSchedule";
import { serializePublicPromotion } from "../lib/promotionsMapper";

const router: IRouter = Router();

// Public endpoint: returns ONLY promotions that are live right now according
// to the server-side schedule evaluation. The client never sees paused or
// out-of-window promotions, so dismissal/pre-launch leaks aren't possible.
router.get("/active", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db
      .select()
      .from(promotionsTable)
      .orderBy(asc(promotionsTable.sortOrder), asc(promotionsTable.id));
    const now = new Date();
    const live = rows.filter((row) => isPromotionLive(row, now));
    // Cache hint: short TTL is enough — banners change infrequently and any
    // schedule transition becomes visible within a minute.
    res.set("Cache-Control", "public, max-age=30, s-maxage=30");
    res.json({ promotions: live.map(serializePublicPromotion) });
  } catch (err) {
    next(err as Error);
  }
});

export default router;
