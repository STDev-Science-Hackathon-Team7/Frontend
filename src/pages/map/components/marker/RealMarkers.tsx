import { MarkerData } from "@/types";
import { useEffect, useState } from "react";
import { useObservations } from "@/hooks/useObservations";
import { LoadingMessage } from "../MapStatus";

interface RealMarkersProps {
	map: google.maps.Map;
	userLocation: google.maps.LatLngLiteral;
	onMarkerSelect?: (marker: MarkerData) => void;
}

export const RealMarkers = ({ map, userLocation, onMarkerSelect }: RealMarkersProps) => {
	const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);

	const { markers, loading, error } = useObservations({
		latitude: userLocation.lat,
		longitude: userLocation.lng
	});

	useEffect(() => {
		if (!map || !userLocation || loading) return;

		// 기존 마커 제거
		mapMarkers.forEach((marker) => marker.setMap(null));

		// 새 마커 생성 및 이벤트 연결
		if (markers.length === 0) return;

		// 현재 위치를 중심으로 설정
		map.setCenter(userLocation);

		const newMapMarkers = markers.map((markerData) => {
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
	}, [map, userLocation, markers, onMarkerSelect, loading]);

	if (loading && mapMarkers.length === 0) {
		return <LoadingMessage message="별 관측 데이터를 불러오는 중..." />;
	}

	if (error && mapMarkers.length === 0) {
		return <LoadingMessage message="데이터를 불러오는 중 오류가 발생했습니다." />;
	}

	return null;
};
