import {
  createBrowserRouter,
  type IndexRouteObject,
  type NonIndexRouteObject,
} from "react-router-dom";
import { ErrorPage } from "../pages/error-page";
import Chat from "../ui/chat";
import Root from "../pages/root";
import Logs from "../ui/logs";
import Ideas from "../test/ideas";

type RouteObject = IndexRouteObject | NonIndexRouteObject;

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "logs",
        element: <Logs />,
      },
      {
        path: "ideas",
        element: <Ideas />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
