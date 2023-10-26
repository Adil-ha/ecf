import express from "express";
import cors from "cors";
import { ProjectDao } from "./dao/ProjectDao.js";
import { Project } from "./models/Project.js";

const app = express();

const projectDao = new ProjectDao();
app.use(cors());

app.use(express.json());

app.get("/projects", (req, res) => {
  res.json(projectDao.getAll());
});

app.get("/projects/:projectId", (req, res) => {
  let project = projectDao.findById(+req.params.projectId);

  if (project == undefined) {
    res
      .status(404)
      .json({ code: 404, message: "Aucun projet trouvé avec cet id" });
  }

  res.json(project);
});

app.post("/projects", (req, res) => {
  const {
    projectName,
    projectManager,
    projectDescription,
    participants,
    budget,
    projectStatus,
    startDate,
    endDate,
  } = req.body;
  let project = new Project(
    null,
    projectName,
    projectManager,
    projectDescription,
    participants,
    budget,
    projectStatus,
    startDate,
    endDate
  );
  res.json(projectDao.save(project));
});

app.put("/projects/:projectId", (req, res) => {
  const {
    id,
    projectName,
    projectManager,
    projectDescription,
    participants,
    budget,
    projectStatus,
    startDate,
    endDate,
  } = req.body;

  if (req.params.projectId != id) {
    res.sendStatus(409);
    return;
  }

  let project = new Project(
    id,
    projectName,
    projectManager,
    projectDescription,
    participants,
    budget,
    projectStatus,
    startDate,
    endDate
  );

  projectDao.updateProject(project)
    ? res.sendStatus(200)
    : res.status(400).json({
        code: 400,
        message: "Problème lors de la mise à jour du projet",
      });
});

app.delete("/projects/:projectId", (req, res) => {
  projectDao.deleteProject(+req.params.projectId);
  res.sendStatus(200);
});

app.listen(3001, () => {
  projectDao.readFile();
  console.log("http://127.0.0.1:3001");
});
