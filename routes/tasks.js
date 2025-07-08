import express from "express";
import {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
  getTaskById
} from "#db/queries/tasks";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireUser);

// POST /tasks
router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await createTask(title, done, req.user.id);
  res.status(201).json(task);
});

// GET /tasks
router.get("/", async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);
  res.json(tasks);
});

// PUT /tasks/:id
router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  const task = await updateTask(id, title, done, req.user.id);

  if (!task) {
    return res.status(403).send("Forbidden");
  }

  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const task = await deleteTask(id, req.user.id);

  if (!task) {
    return res.status(403).send("Forbidden");
  }

  res.status(204).send();
});

export default router;
