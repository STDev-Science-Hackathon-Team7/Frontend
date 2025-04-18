// 마커 테스트를 위한 임시 마커
import { MarkerData } from "@/types";
import { useEffect, useState } from "react";

interface SpotMarkersProps {
	map: google.maps.Map;
	userLocation: { lat: number; lng: number };
	onMarkerSelect?: (marker: MarkerData) => void;
}

export const SpotMarkers = ({ map, userLocation, onMarkerSelect }: SpotMarkersProps) => {
	const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

	useEffect(() => {
		if (!map || !userLocation) return;

		// 기존 마커 제거
		markers.forEach((marker) => marker.setMap(null));

		// 임시 마커 데이터
		const sampleMarkers: MarkerData[] = [
			{
				id: "marker1",
				position: {
					lat: userLocation.lat + 0.001,
					lng: userLocation.lng + 0.001
				},
				title: "한강 야경",
				skyQuality: "좋음",
				imageUrl: "/assets/map/icn_place1.svg",
				starCount: 8,
				date: "2023-06-15"
			},
			{
				id: "marker2",
				position: {
					lat: userLocation.lat - 0.0015,
					lng: userLocation.lng - 0.001
				},
				title: "남산 전망대",
				skyQuality: "보통",
				imageUrl: "/assets/map/icn_place2.svg",
				starCount: 5,
				date: "2023-06-10"
			},
			{
				id: "marker3",
				position: {
					lat: userLocation.lat + 0.0008,
					lng: userLocation.lng - 0.0018
				},
				title: "북한산 정상",
				skyQuality: "매우 좋음",
				imageUrl: "/assets/map/icn_place3.svg",
				starCount: 12,
				date: "2023-06-05"
			}
		];

		// 마커 생성 및 이벤트 연결
		const newMarkers = sampleMarkers.map((markerData) => {
			const marker = new google.maps.Marker({
				position: markerData.position,
				map,
				title: markerData.title,
				icon: {
					url: `/assets/map/icn_place${Math.min(Math.ceil(markerData.starCount / 3), 4)}.svg`,
					scaledSize: new google.maps.Size(36, 36),
					anchor: new google.maps.Point(18, 18)
				}
			});

			marker.addListener("click", () => {
				// MapContainer로 선택된 마커 정보 전달
				if (onMarkerSelect) {
					onMarkerSelect(markerData);
				}
			});

			return marker;
		});

		setMarkers(newMarkers);

		// 컴포넌트 언마운트 시 마커 제거
		return () => {
			newMarkers.forEach((marker) => marker.setMap(null));
		};
	}, [map, userLocation, onMarkerSelect]);

	return null;
};
