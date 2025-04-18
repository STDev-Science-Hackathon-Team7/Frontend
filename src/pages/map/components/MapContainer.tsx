import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LocationButton } from "./button/LocationButton";
import { RecordButton } from "./button/RecordButton";
import { MarkerInfoCard } from "./marker/MarkerInfoCard";
import { MarkerData } from "@/types";
import { MapWrapper } from "./MapWrapper";

export function MapContainer() {
	const navigate = useNavigate();
	const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

	const handleCurrentLocation = () => {
		window.location.reload();
	};

	const handleRecordClick = () => {
		navigate("/starWrite");
	};

	const handleMarkerSelect = (marker: MarkerData) => {
		console.log("마커 선택됨:", marker);
		setSelectedMarker(marker);
	};

	const handleCloseCard = () => {
		setSelectedMarker(null);
	};

	return (
		<div className="relative h-full w-full">
			<MapWrapper onMarkerSelect={handleMarkerSelect} />

			<div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
				<LocationButton onClick={handleCurrentLocation} />
			</div>
			<div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
				<RecordButton onClick={handleRecordClick} />
			</div>

			{selectedMarker && <MarkerInfoCard markerData={selectedMarker} onClose={handleCloseCard} />}
		</div>
	);
}
