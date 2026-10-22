import express from "express";
import { createFile } from "#db/queries/files";
import { getFolders, getFolderByIdIncludingFiles } from "#db/queries/folders";
const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) return res.status(404).send("Folder not found");

  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is required");
  }

  const { name, size } = req.body;

  if (!name || size == null) {
    return res.status(400).send("Request body needs: name, size");
  }

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
