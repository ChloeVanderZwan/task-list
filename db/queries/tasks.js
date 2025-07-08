import db from "#db/client";

export async function createTask(title, done, userId) {
  const result = await db.query(
    "INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, done, userId]
  );
  return result.rows[0];
}

export async function getTasksByUserId(userId) {
  const result = await db.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id",
    [userId]
  );
  return result.rows;
}

export async function getTaskById(id) {
  const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateTask(id, title, done, userId) {
  const result = await db.query(
    "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
    [title, done, id, userId]
  );
  return result.rows[0];
}

export async function deleteTask(id, userId) {
  const result = await db.query(
    "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId]
  );
  return result.rows[0];
}
