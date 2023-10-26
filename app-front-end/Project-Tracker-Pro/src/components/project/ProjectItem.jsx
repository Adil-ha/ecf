import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectItem = (props) => {
  const navigate = useNavigate();
  const project = props.project;

  const handleDetailsProject = () => {
    navigate("/DetailProject/" + project.id);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <h5>Nom du projet : {project.projectName}</h5>
      <p>Statut du projet : {project.projectStatus}</p>

      <button onClick={handleDetailsProject} className="btn btn-primary">
        Voir les détails du projet
      </button>
    </li>
  );
};

export default ProjectItem;
