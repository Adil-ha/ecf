import { useDispatch, useSelector } from "react-redux";
import { postProject, updateProject } from "./projectSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const FormProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");

  const projects = useSelector((state) => state.projects.projects);

  const projectNameRef = useRef();
  const projectManagerRef = useRef();
  const projectDescriptionRef = useRef();
  const participantsRef = useRef();
  const budgetRef = useRef();
  const projectStatusRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const findProjectById = (projectId) => {
    return projects.find((project) => project.id == projectId);
  };

  const populateForm = (project) => {
    projectNameRef.current.value = project.projectName;
    projectManagerRef.current.value = project.projectManager;
    projectDescriptionRef.current.value = project.projectDescription;
    participantsRef.current.value = project.participants;
    budgetRef.current.value = project.budget;
    projectStatusRef.current.value = project.projectStatus;
    startDateRef.current.value = project.startDate;
    endDateRef.current.value = project.endDate;
  };

  useEffect(() => {
    if (mode == "edit" && id) {
      const projectToEdit = findProjectById(id);
      if (projectToEdit) {
        populateForm(projectToEdit);
      }
    }
  }, [mode, id, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !projectNameRef.current.value ||
      !projectManagerRef.current.value ||
      !projectDescriptionRef.current.value ||
      !participantsRef.current.value ||
      !budgetRef.current.value ||
      !projectStatusRef.current.value ||
      !startDateRef.current.value ||
      !endDateRef.current.value
    ) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const newProject = {
      projectName: projectNameRef.current.value,
      projectManager: projectManagerRef.current.value,
      projectDescription: projectDescriptionRef.current.value,
      participants: +participantsRef.current.value,
      budget: +budgetRef.current.value,
      projectStatus: projectStatusRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
    };

    if (mode === "edit" && id) {
      const updatedProject = { id, ...newProject };
      console.log(updatedProject);

      dispatch(updateProject(updatedProject));
    } else {
      dispatch(postProject(newProject));
    }
    navigate("/");
  };

  return (
    <>
      <h1>{mode === "edit" ? "Modifier" : "Créer"} un projet</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Nom du Projet :
          </label>
          <input
            type="text"
            className="form-control"
            name="projectName"
            ref={projectNameRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectManager" className="form-label">
            Chef du Projet :
          </label>
          <input
            type="text"
            className="form-control"
            name="projectManager"
            ref={projectManagerRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Description du Projet :
          </label>
          <textarea
            className="form-control"
            name="projectDescription"
            ref={projectDescriptionRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="participants" className="form-label">
            Nombre de participants :
          </label>
          <input
            type="number"
            className="form-control"
            name="participants"
            ref={participantsRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="budget" className="form-label">
            Budget :
          </label>
          <input
            type="number"
            className="form-control"
            name="budget"
            ref={budgetRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectStatus" className="form-label">
            État du Projet :
          </label>
          <select
            className="form-select"
            name="projectStatus"
            ref={projectStatusRef}
          >
            <option value="Non débuté">Non débuté</option>
            <option value="En cours">En cours</option>
            <option value="En attente">En attente</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Date de debut :
          </label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            ref={startDateRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Date de fin :
          </label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            ref={endDateRef}
            required
          />
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-success">
            {mode === "edit" ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormProject;
