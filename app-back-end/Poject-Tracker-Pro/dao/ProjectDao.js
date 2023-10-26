import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export class ProjectDao {
  constructor() {
    this.file = resolve("./data/dbProject.json");
    this.Projects = [];
  }

  readFile() {
    const file = readFileSync(this.file, { encoding: "utf-8" });
    this.Projects = JSON.parse(file);
  }

  writeFile() {
    writeFileSync(this.file, JSON.stringify(this.Projects));
  }

  getAll() {
    return this.Projects;
  }

  save(project) {
    project.id = Date.now();
    this.Projects.push(project);
    this.writeFile();
    return project;
  }

  findById(id) {
    return this.Projects.find((project) => project.id == id);
  }

  deleteProject(id) {
    this.Projects = this.Projects.filter((project) => project.id !== id);
    this.writeFile();
  }

  updateProject(projectUpdate) {
    const project = this.findById(projectUpdate.id);
    if (!project) {
      return { success: false, message: "Projet non trouvé" };
    }
    project.id = projectUpdate.id;
    project.projectStatus = projectUpdate.projectStatus;
    project.projectName = projectUpdate.projectName;
    project.projectManager = projectUpdate.projectManager;
    project.projectDescription = projectUpdate.projectDescription;
    project.participants = projectUpdate.participants;
    project.budget = projectUpdate.budget;
    project.startDate = projectUpdate.startDate;
    project.endDate = projectUpdate.endDate;

    this.writeFile();
    return { success: true, message: "Projet mis à jour avec succès" };
  }

  filterByStatus(status) {
    return this.Projects.filter((project) => project.projectStatus === status);
  }
}
