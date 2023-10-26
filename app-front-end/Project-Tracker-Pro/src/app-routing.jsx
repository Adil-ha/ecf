import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import DisplayProject from "./components/project/DisplayProject";
import FormAdmin from "./components/auth/FormAdmin";
import DetailProject from "./components/project/DetailProject";
import FormProject from "./components/project/FormProject";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DisplayProject />,
      },
      {
        path: "/formAdmin",
        element: <FormAdmin />,
      },
      {
        path: "/DetailProject/:id",
        element: <DetailProject />,
      },
      {
        path: "/FormProject",
        element: (
          <ProtectedRoute>
            <FormProject />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
