import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router.tsx";
import { LocationProvider } from "@/contexts/LocationContext";

function App() {
	return (
		<LocationProvider>
			<RouterProvider router={router} />
		</LocationProvider>
	);
}

export default App;
