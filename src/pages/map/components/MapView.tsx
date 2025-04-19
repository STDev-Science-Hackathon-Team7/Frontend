import { useRef, useState, useEffect } from "react";
import { UserMarker } from "./marker/UserMarker";
import { RealMarkers } from "./marker/RealMarkers";
import { SpotMarkers } from "./marker/SpotMarkers";
import { MarkerData } from "@/types";

interface MapProps {
	center: google.maps.LatLngLiteral;
	onMarkerSelect?: (marker: MarkerData) => void;
	showObservations?: boolean;
	showSpots?: boolean;
	spotData?: {
		spots: MarkerData[];
		loading: boolean;
		error: string | null;
	};
	onMapInit?: (map: google.maps.Map) => void;
}

export const MapView = ({
	center,
	onMarkerSelect,
	showObservations = true,
	showSpots = false,
	spotData,
	onMapInit
}: MapProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	useEffect(() => {
		if (ref.current && !map) {
			const newMap = new google.maps.Map(ref.current, {
				center,
				zoom: 15,
				disableDefaultUI: true,
				clickableIcons: false,
				minZoom: 10,
				maxZoom: 20,
				gestureHandling: "greedy",
				styles: [
					{
						featureType: "poi",
						stylers: [{ visibility: "off" }]
					}
				]
			});
			setMap(newMap);

			// 지도 인스턴스를 상위 컴포넌트로 전달
			if (onMapInit) {
				onMapInit(newMap);
			}
		}
	}, [center, map, onMapInit]);

	useEffect(() => {
		if (map) {
			map.setCenter(center);
		}
	}, [map, center]);

	return (
		<>
			<div ref={ref} className="w-full h-full" />
			{map && <UserMarker map={map} position={center} />}
			{map && showObservations && <RealMarkers map={map} userLocation={center} onMarkerSelect={onMarkerSelect} />}
			{map && showSpots && spotData && (
				<SpotMarkers
					map={map}
					userLocation={center}
					onMarkerSelect={onMarkerSelect}
					spots={spotData.spots}
					loading={spotData.loading}
					error={spotData.error}
				/>
			)}
		</>
	);
};
