import { Router, type IRouter, type Request, type Response } from "express";
import { INVENTORY, type InventoryItem } from "../data/inventory";

const router: IRouter = Router();

router.get("/", (req: Request, res: Response) => {
  const category = (req.query.category as string | undefined)?.toLowerCase();
  let items: InventoryItem[] = INVENTORY;
  if (category) {
    items = items.filter((it) => it.category.toLowerCase() === category);
  }
  res.json(items);
});

export default router;
