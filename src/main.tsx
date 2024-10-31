import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoursesForm from "./components/forms/CoursesForm";
import Employees from "./components/Employees";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/courses",
        element: <CoursesForm />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
