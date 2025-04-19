import { useState, useEffect } from "react";
import { fetchBestSpots, SpotData } from "@/services/observationService";
import { spotToMarkerData } from "@/utils/observationUtils";
import { MarkerData } from "@/types";

interface UseBestSpotsResult {
	spotMarkers: MarkerData[];
	loading: boolean;
	error: string | null;
}

export function useBestSpots(): UseBestSpotsResult {
	const [spotMarkers, setSpotMarkers] = useState<MarkerData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSpots = async () => {
			try {
				setLoading(true);
				const data = await fetchBestSpots();

				// 유효한 위치 정보를 가진 명소 데이터만 필터링
				const mappedMarkers: MarkerData[] = data.spots
					.filter((spot) => {
						return (
							spot.location.latitude !== null &&
							spot.location.longitude !== null &&
							!(spot.location.latitude === 0 && spot.location.longitude === 0)
						);
					})
					.map(spotToMarkerData);

				setSpotMarkers(mappedMarkers);
				setError(null);
			} catch (err) {
				console.error("밤 하늘 명소 데이터 불러오기 실패:", err);
				setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다");
				setSpotMarkers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchSpots();
	}, []);

	return { spotMarkers, loading, error };
}
