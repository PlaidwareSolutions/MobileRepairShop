import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import adminRouter from "./admin";
import inventoryRouter from "./inventory";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/leads", leadsRouter);
router.use("/admin", adminRouter);
router.use("/inventory", inventoryRouter);

router.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  req.log.error({ err }, "api.error");
  if (res.headersSent) return;
  res.status(500).json({ error: "Internal server error" });
});

export default router;
