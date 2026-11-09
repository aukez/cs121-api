const express = require("express");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

const students = [{ id: 1, name: "Awa Diop" }];
let nextId = 2;

app.get("/", (req, res) => {
  res.json({ message: "CS121 API is running" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(s => String(s.id) === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

app.post("/students", (req, res) => {
  const name = req.body?.name;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const student = { id: nextId++, name: name.trim() };
  students.push(student);

  res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
  const student = students.find(s => String(s.id) === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const name = req.body?.name;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  student.name = name.trim();
  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => String(s.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  res.status(204).end();
});

app.listen(port, "0.0.0.0", () => {
  console.log("CS121 API listening on port " + port);
});
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi");

app.get("/openapi.json", (req, res) => {
  res.json(openapi);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));