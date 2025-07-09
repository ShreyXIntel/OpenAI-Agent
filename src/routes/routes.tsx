import {
  createBrowserRouter,
  type IndexRouteObject,
  type NonIndexRouteObject,
} from "react-router-dom";
import { ErrorPage } from "../pages/error-page";
import Chat from "../ui/chat";
import Root from "../pages/root";
import Logs from "../ui/logs";
import DevMode from "../test/devMode";

type RouteObject = IndexRouteObject | NonIndexRouteObject;

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Chat />
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "logs",
        element: <Logs />,
      },
      {
        path: "dev",
        element: <DevMode />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
