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

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const item = INVENTORY.find((it) => it.id === id);
  if (!item) {
    res.status(404).json({ error: "Inventory item not found" });
    return;
  }
  res.json(item);
});

export default router;
