import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1990-05-15", salary: 75000 },
    { name: "Bob Smith", birthday: "1985-08-22", salary: 82000 },
    { name: "Carol Williams", birthday: "1992-11-03", salary: 68000 },
    { name: "David Brown", birthday: "1988-03-17", salary: 91000 },
    { name: "Emma Davis", birthday: "1995-07-29", salary: 63000 },
    { name: "Frank Miller", birthday: "1983-12-08", salary: 95000 },
    { name: "Grace Wilson", birthday: "1991-04-25", salary: 71000 },
    { name: "Henry Moore", birthday: "1987-09-14", salary: 88000 },
    { name: "Iris Taylor", birthday: "1993-06-30", salary: 67000 },
    { name: "Jack Anderson", birthday: "1989-01-19", salary: 79000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
