import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

const Layout = lazy(() => import("@/layouts/Layout"));
const Home = lazy(() => import("@/pages/home/Home"));
const Map = lazy(() => import("@/pages/map/Map"));
const StarWrite = lazy(() => import("@/pages/starWrite/StarWrite"));

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {index: true, element: <Home/>},
        {path: "/map", element: <Map/>},
        {path: "/starWrite", element: <StarWrite/>}
      ],
    },
  ])
;