import { Router, type IRouter, type Request, type Response } from "express";
import { Readable } from "stream";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { inventoryImagesTable } from "@workspace/db";
import { ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();

/**
 * Serve a publicly-readable object by its path under one of PUBLIC_OBJECT_SEARCH_PATHS.
 * No auth: only files explicitly written to a public search path are reachable here,
 * so callers (admin upload endpoint) decide what becomes public at write time.
 */
router.get("/storage/db-images/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [row] = await db
      .select()
      .from(inventoryImagesTable)
      .where(eq(inventoryImagesTable.id, id));
    if (!row) {
      res.status(404).json({ error: "Image not found" });
      return;
    }
    res.setHeader("Content-Type", row.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(row.data);
  } catch (error) {
    req.log.error({ err: error }, "Error serving db image");
    res.status(500).json({ error: "Failed to serve image" });
  }
});

router.get("/storage/public-objects/*filePath", async (req: Request, res: Response) => {
  try {
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await objectStorageService.searchPublicObject(filePath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    const response = await objectStorageService.downloadObject(file);
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body as ReadableStream<Uint8Array>);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    req.log.error({ err: error }, "Error serving public object");
    res.status(500).json({ error: "Failed to serve public object" });
  }
});

export default router;
