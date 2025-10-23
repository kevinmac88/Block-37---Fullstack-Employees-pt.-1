import express from "express";
import employeesRouter from "./api/employees.js";
const app = express();

//middleware for JSON req bodies --> turns JSON into JS objects (jsobects cannot travel over http)
app.use(express.json());

//welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

//employee routes
app.use("/employees", employeesRouter);

export default app;
