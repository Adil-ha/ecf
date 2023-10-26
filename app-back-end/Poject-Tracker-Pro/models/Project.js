export class Project {
  constructor(
    id,
    projectName,
    projectManager,
    projectDescription,
    participants,
    budget,
    projectStatus,
    startDate,
    endDate
  ) {
    this.id = id;
    this.projectName = projectName;
    this.projectManager = projectManager;
    this.projectDescription = projectDescription;
    this.participants = participants;
    this.budget = budget;
    this.projectStatus = projectStatus;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
