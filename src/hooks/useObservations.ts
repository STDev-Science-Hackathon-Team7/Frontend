import { useState, useEffect } from "react";
import { MarkerData } from "@/types";
import { ObservationListParams } from "@/types/observation";
import { fetchObservations } from "@/services/observationService";
import { observationToMarkerData } from "@/utils/observationUtils";

export function useObservations(params: ObservationListParams) {
	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchObservationData = async () => {
			if (!params.latitude || !params.longitude) return;

			try {
				setLoading(true);

				const data = await fetchObservations(params);

				// 유효한 위치 정보를 가진 관측 데이터만 필터링(0,0제외)
				const mappedMarkers: MarkerData[] = data.observations
					.filter((obs) => {
						return (
							obs.latitude !== null &&
							obs.longitude !== null &&
							!(obs.latitude === 0 && obs.longitude === 0)
						);
					})
					.map(observationToMarkerData);

				setMarkers(mappedMarkers);
				setError(null);
			} catch (err) {
				console.error("별 관측 데이터 불러오기 실패:", err);
				setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다");
				setMarkers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchObservationData();
	}, [
		params.latitude,
		params.longitude,
		params.distance,
		params.limit,
		params.min_stars,
		params.max_stars,
		params.category,
		params.days
	]);

	return { markers, loading, error };
}
