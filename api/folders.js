import express from "express";
import { getFolders } from "#db/queries/folders";
const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});
