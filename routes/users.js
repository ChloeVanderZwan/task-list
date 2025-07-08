import express from "express";
import { createUser, authenticateUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import requireBody from "#middleware/requireBody";

const router = express.Router();

// POST /users/register
router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);
      const token = createToken({ id: user.id });
      res.status(201).send(token);
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).send("Username already exists");
      }
      throw error;
    }
  }
);

// POST /users/login
router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const token = createToken({ id: user.id });
    res.send(token);
  }
);

export default router;
