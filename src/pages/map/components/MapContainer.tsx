import { useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import { LocationButton } from "./button/LocationButton";
import { RecordButton } from "./button/RecordButton";
import { MarkerInfoCard } from "./marker/MarkerInfoCard";
import { MarkerData } from "@/types";
import { MapWrapper } from "./MapWrapper";

export function MapContainer() {
	const navigate = useNavigate();
	const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
	const [isCardOpen, setIsCardOpen] = useState(false);

	const handleCurrentLocation = useCallback(() => {
		window.location.reload();
	}, []);

	const handleRecordClick = useCallback(() => {
		navigate("/starWrite");
	}, [navigate]);

	const handleMarkerSelect = useCallback((marker: MarkerData) => {
		console.log("마커 선택됨:", marker);
		setSelectedMarker(marker);
		setTimeout(() => setIsCardOpen(true), 10);
	}, []);

	const handleCloseCard = useCallback(() => {
		setIsCardOpen(false);
		setTimeout(() => {
			setSelectedMarker(null);
		}, 300);
	}, []);

	const recordButtonClassName = useMemo(
		() =>
			`absolute bottom-6 left-0 right-0 flex justify-center z-50 transition-transform duration-300 ease-in-out ${
				isCardOpen ? "translate-y-[-160px]" : "translate-y-0"
			}`,
		[isCardOpen]
	);

	return (
		<div className="relative h-full w-full">
			<MapWrapper onMarkerSelect={handleMarkerSelect} />

			<div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
				<LocationButton onClick={handleCurrentLocation} />
			</div>
			<div className={recordButtonClassName}>
				<RecordButton onClick={handleRecordClick} />
			</div>

			{selectedMarker && (
				<MarkerInfoCard markerData={selectedMarker} onClose={handleCloseCard} isOpen={isCardOpen} />
			)}
		</div>
	);
}
