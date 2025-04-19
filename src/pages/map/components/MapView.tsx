import { useRef, useState, useEffect } from "react";
import { UserMarker } from "./marker/UserMarker";
import { RealMarkers } from "./marker/RealMarkers";
import { MarkerData } from "@/types";

interface MapProps {
	center: google.maps.LatLngLiteral;
	onMarkerSelect?: (marker: MarkerData) => void;
}

export const MapView = ({ center, onMarkerSelect }: MapProps) => {
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
		}
	}, [center, map]);

	useEffect(() => {
		if (map) {
			map.setCenter(center);
		}
	}, [map, center]);

	return (
		<>
			<div ref={ref} className="w-full h-full" />
			{map && <UserMarker map={map} position={center} />}
			{map && <RealMarkers map={map} userLocation={center} onMarkerSelect={onMarkerSelect} />}
		</>
	);
};
