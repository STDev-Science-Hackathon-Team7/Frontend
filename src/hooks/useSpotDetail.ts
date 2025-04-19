import { useState, useEffect } from "react";
import { fetchSpotDetail, SpotData } from "@/services/observationService";

interface UseSpotDetailResult {
	spot: SpotData | null;
	loading: boolean;
	error: string | null;
}

export function useSpotDetail(spotId: string | null): UseSpotDetailResult {
	const [spot, setSpot] = useState<SpotData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// spotId가 없거나 유효하지 않은 경우 요청하지 않음
		if (!spotId) {
			setSpot(null);
			setLoading(false);
			setError(null);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await fetchSpotDetail(spotId);
				setSpot(data);
			} catch (err) {
				console.error("명소 데이터 불러오기 실패:", err);
				setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다");
				setSpot(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [spotId]);

	return { spot, loading, error };
}
