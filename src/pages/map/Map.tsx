import { MapContainer } from "@/pages/map/components/MapContainer";
import { TopNav } from "@/layouts/TopNav";
import { useLocation } from "react-router-dom";

export default function Map() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const showSpots = searchParams.get("showSpots") === "true";

	return (
		<div className="flex flex-col h-screen">
			<TopNav title={showSpots ? "밤 하늘 명소" : "밤 하늘 지도"} backPath="/" />
			<div className="flex-1 relative">
				<MapContainer initialShowSpots={showSpots} />
			</div>
		</div>
	);
}
