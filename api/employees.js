import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

//get all the employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

//get 1 employee with id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validate id is positive int (digits only)
    const numId = Number(id);
    if (!/^\d+$/.test(id) || !Number.isInteger(numId) || numId < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const employee = await getEmployee(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

//create new employee
router.post("/", async (req, res, next) => {
  try {
    // check if req body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res.status(400).json({
        error: "Missing required fields: name, birthday, salary",
      });
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

//update employee
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // validate id w/ regex
    const numId = Number(id);
    if (!/^\d+$/.test(id) || !Number.isInteger(numId) || numId < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    // check if req body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { name, birthday, salary } = req.body;

    // field validation
    if (!name || !birthday || !salary) {
      return res.status(400).json({
        error: "Missing required fields: name, birthday, salary",
      });
    }

    // attempt update
    const employee = await updateEmployee({ id, name, birthday, salary });

    // check if employee exsits to recieve update
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

//delete employee
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const numId = Number(id);
    if (!/^\d+$/.test(id) || !Number.isInteger(numId) || numId < 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const employee = await deleteEmployee(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
