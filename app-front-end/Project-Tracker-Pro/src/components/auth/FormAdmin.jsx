import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormAdmin = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    navigate("/FormProject");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Authentification administrateur</h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          ref={usernameRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="password"
          ref={passwordRef}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormAdmin;
