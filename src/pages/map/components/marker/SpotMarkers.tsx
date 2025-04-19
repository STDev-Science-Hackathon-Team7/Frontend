import { MarkerData } from "@/types";
import { useEffect, useState } from "react";
import { LoadingMessage } from "../MapStatus";

interface SpotMarkersProps {
	map: google.maps.Map;
	userLocation: google.maps.LatLngLiteral;
	onMarkerSelect?: (marker: MarkerData) => void;
	spots: MarkerData[];
	loading: boolean;
	error: string | null;
}

export const SpotMarkers = ({ map, userLocation, onMarkerSelect, spots, loading, error }: SpotMarkersProps) => {
	const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);

	useEffect(() => {
		if (!map || !userLocation || loading || spots.length === 0) return;

		// 기존 마커 제거
		mapMarkers.forEach((marker) => marker.setMap(null));

		// 관측지 목록 전체를 화면에 담을 수 있도록 맵 중심 및 줌 레벨 조정
		const bounds = new google.maps.LatLngBounds();
		spots.forEach((spot) => {
			bounds.extend(spot.position);
		});
		map.fitBounds(bounds);

		// 마커 생성 및 이벤트 연결
		const newMapMarkers = spots.map((markerData) => {
			const marker = new google.maps.Marker({
				position: markerData.position,
				map,
				title: markerData.title,
				icon: {
					url: markerData.imageUrl,
					scaledSize: new google.maps.Size(36, 36),
					anchor: new google.maps.Point(18, 18)
				}
			});

			marker.addListener("click", () => {
				if (onMarkerSelect) {
					onMarkerSelect(markerData);
				}
			});

			return marker;
		});

		setMapMarkers(newMapMarkers);

		// 컴포넌트 언마운트 시 마커 제거
		return () => {
			newMapMarkers.forEach((marker) => marker.setMap(null));
		};
	}, [map, userLocation, spots, onMarkerSelect, loading]);

	if (loading && mapMarkers.length === 0) {
		return <LoadingMessage message="밤 하늘 명소 데이터를 불러오는 중..." />;
	}

	if (error && mapMarkers.length === 0) {
		return <LoadingMessage message="데이터를 불러오는 중 오류가 발생했습니다." />;
	}

	return null;
};
