import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./components/Employees";
import Courses from "./components/Courses";
import Users from "./components/Users";
import LogIn from "./components/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App";
import { UserProvider } from "./context/AuthContext";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    element: <ProtectedRoute redirectTo="/login" allowedRoles={["empleado", "administrador"]} />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <App />,
          },
        ]
      },
    ],
  },
  {
    element: <ProtectedRoute redirectTo="/login" allowedRoles={["administrador"]} />,
    children: [
      {
        element: <Layout />,
        errorElement: <Error />,
        children: [
          {
            path: "/courses",
            element: <Courses />,
          },
          {
            path: "/courses/:id",
            element: <Courses />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/:id",
            element: <Users />,
          },
          {
            path: "/employees",
            element: <Employees />,
          },
          {
            path: "/employees/:id",
            element: <Employees />,
          },

        ]
      },
    ],
  },

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
