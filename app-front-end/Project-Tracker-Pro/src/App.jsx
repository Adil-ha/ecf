import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

function App() {
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!storedUsername && !!storedPassword
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    setIsLoggedIn(!!storedUsername && !!storedPassword);
  }, []); // Utilisez une dépendance vide pour un rendu initial

  return (
    <div className="App">
      <header>
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Tracker Pro
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/`}>
                    Accueil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/FormProject`}>
                    Créer un nouveau projet
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                {isLoggedIn ? (
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/formAdmin">
                      Connexion
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container">
        <div className="row my-3">
          <div className="col-10 offset-1 rounded p-3 bg-dark text-light">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
