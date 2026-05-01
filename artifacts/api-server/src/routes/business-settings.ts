import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import {
  getBusinessSettings,
  serializePublicBusinessSettings,
} from "../lib/businessSettings";

const router: IRouter = Router();

// Public endpoint: returns the current shop contact info (phone, address,
// hours) used to render every page. Cached briefly because owners change
// these values infrequently and the build script also hits this endpoint.
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const row = await getBusinessSettings();
    res.set("Cache-Control", "public, max-age=60, s-maxage=60");
    res.json({ settings: serializePublicBusinessSettings(row) });
  } catch (err) {
    next(err as Error);
  }
});

export default router;
