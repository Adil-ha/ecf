import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProject, fetchProjectById } from "./projectSlice";
import { useEffect } from "react";

const DetailProject = () => {
  const { id } = useParams();
  const project = useSelector((state) => state.projects.selectedProject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn =
    !!localStorage.getItem("username") && !!localStorage.getItem("password");

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (!project) {
    return <p>Chargement en cours...</p>;
  }

  const handleDeleteProject = () => {
    dispatch(deleteProject(id));
    navigate("/");
  };

  const handleEditProject = () => {
    navigate(`/FormProject?mode=edit&id=${id}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{project.projectName}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Description du Projet:</strong> {project.projectDescription}
        </p>
        <p className="card-text">
          <strong>Chef du Projet:</strong> {project.projectManager}
        </p>
        <p className="card-text">
          <strong>Nombre de Participants:</strong> {project.participants}
        </p>
        <p className="card-text">
          <strong>Budget:</strong> {project.budget} €
        </p>
        <p className="card-text">
          <strong>Statut du Projet:</strong> {project.projectStatus}
        </p>

        <p className="card-text">
          <strong>Date de Début:</strong> {project.startDate}
        </p>

        <p className="card-text">
          <strong>Date de Fin:</strong> {project.endDate}
        </p>

        {isLoggedIn && (
          <div className="d-flex justify-content-between">
            <button onClick={handleDeleteProject} className="btn btn-danger">
              Supprimer
            </button>
            <button onClick={handleEditProject} className="btn btn-primary">
              Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProject;
