import { Coordinates } from "@/types";
import { useEffect, useRef } from "react";

interface UserMarkerProps {
	map: google.maps.Map;
	position: Coordinates;
}

export const UserMarker = ({ map, position }: UserMarkerProps) => {
	const markerRef = useRef<google.maps.Marker | null>(null);

	useEffect(() => {
		// 이전 마커 제거
		if (markerRef.current) {
			markerRef.current.setMap(null);
		}

		// 새 마커 생성
		const userMarker = new google.maps.Marker({
			position,
			map,
			title: "내 위치",
			icon: {
				url: "/assets/map/icn_nowplace.svg",
				scaledSize: new google.maps.Size(30, 30),
				anchor: new google.maps.Point(15, 15)
			}
		});

		// 마커 참조 저장
		markerRef.current = userMarker;

		// 컴포넌트 언마운트 시 마커 제거
		return () => {
			if (markerRef.current) {
				markerRef.current.setMap(null);
			}
		};
	}, [map, position]);

	return null;
};
