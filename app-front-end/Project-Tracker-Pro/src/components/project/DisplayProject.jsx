import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProjects } from "./projectSlice";
import React from "react";
import ProjectItem from "./ProjectItem";

const DisplayProject = () => {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("Tous");
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter((project) => {
    if (filterStatus === "Tous") {
      return true;
    } else {
      return project.projectStatus === filterStatus;
    }
  });

  return (
    <>
      <h3 className="text-center">Liste des Projets</h3>
      <hr />

      <div className="mb-3">
        <label htmlFor="filterStatus" className="form-label">
          Filtrer par statut :
        </label>
        <select
          id="filterStatus"
          className="form-select w-50"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Tous">Tous</option>
          <option value="Non débuté">Non débuté</option>
          <option value="En cours">En cours</option>
          <option value="En attente">En attente</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>
      <hr />

      <div className="row">
        {filteredProjects.length === 0 ? (
          <div className="col-12">
            <p className="text-center">
              Aucun projet disponible pour le moment!
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id}>
              <ProjectItem project={project} />
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DisplayProject;
