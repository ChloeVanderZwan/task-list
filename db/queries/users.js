import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username
  ]);
  return result.rows[0];
}

export async function getUserById(id) {
  const result = await db.query(
    "SELECT id, username FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function authenticateUser(username, password) {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
