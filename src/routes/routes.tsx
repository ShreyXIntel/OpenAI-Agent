import {
  createBrowserRouter,
  type IndexRouteObject,
  type NonIndexRouteObject,
} from "react-router-dom";
import { ErrorPage } from "../pages/error-page";
import Chat from "../ui/chat";
import Root from "../pages/root";
import Logs from "../ui/logs";

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
    ],
  },
];

export const router = createBrowserRouter(routes);
