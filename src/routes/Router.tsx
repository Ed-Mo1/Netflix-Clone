import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../common/components/Layout";
import VideoPlayer from "../pages/VideoPlayer";
import ProtectedRoute from "./ProtectedRoute";
import { Suspense } from "react";
import React from "react";
import Loader from "../components/Loader";
const Home = React.lazy(() => import("../pages/home/Home"));
const Register = React.lazy(() => import("../pages/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const routes = createBrowserRouter([
  {
    path: "/Netflix-Clone",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/Netflix-Clone/register",
    element: (
      <Suspense  fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/Netflix-Clone/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/Netflix-Clone/:mediaType/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <VideoPlayer />
      </Suspense>
    ),
  },
]);
const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;

