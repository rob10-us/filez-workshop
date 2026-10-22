import express from "express";
import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

const app = express();
export default app;

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err.message || "Something went wrong");
});
