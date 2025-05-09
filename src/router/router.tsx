import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("@/layouts/Layout"));
const Home = lazy(() => import("@/pages/home/Home"));
const Map = lazy(() => import("@/pages/map/Map"));
const StarWrite = lazy(() => import("@/pages/starWrite/StarWrite"));
const StarWriteUpload = lazy(() => import("@/pages/starWrite/StarWriteUpload"));
const Description = lazy(() => import("@/pages/description/Description"));

export const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "/map", element: <Map /> },
				{ path: "/starWrite", element: <StarWrite /> },
				{ path: "/starWriteUpload", element: <StarWriteUpload /> },
				{ path: "/description", element: <Description /> }
			]
		}
	])
;