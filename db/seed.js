import db from "#db/client";
import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Create a sample user
  const user = await createUser("tasktesttask", "password");
  console.log(`Created user: ${user.username}`);

  // Create sample tasks for the user
  const tasks = [
    { title: "Complete project documentation", done: false },
    { title: "Review code changes", done: true },
    { title: "Prepare presentation slides", done: false },
    { title: "Schedule team meeting", done: true },
    { title: "Update dependencies", done: false }
  ];

  for (const task of tasks) {
    await createTask(task.title, task.done, user.id);
    console.log(`Created task: ${task.title}`);
  }
}
