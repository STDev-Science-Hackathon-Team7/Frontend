import { MapContainer } from "@/pages/map/components/MapContainer";
import { TopNav } from "@/layouts/TopNav";

export default function Map() {
	return (
		<div className="flex flex-col h-screen">
			<TopNav title="우리동네 별 지도" backPath="/" />
			<div className="flex-1 relative">
				<MapContainer />
			</div>
		</div>
	);
}
