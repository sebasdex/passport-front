import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./components/Employees";
import Courses from "./components/Courses";
import Users from "./components/Users";
import LogIn from "./components/LogIn";

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
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <Courses />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <Employees />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
