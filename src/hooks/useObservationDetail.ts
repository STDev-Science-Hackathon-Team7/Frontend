import { useState, useEffect } from "react";
import { ObservationDetail } from "@/types/observation";
import { fetchObservationDetail } from "@/services/observationService";

export function useObservationDetail(observationId: string | null) {
	const [observation, setObservation] = useState<ObservationDetail | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!observationId) {
			setObservation(null);
			setLoading(false);
			setError(null);
			return;
		}

		const getObservationDetail = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await fetchObservationDetail(observationId);
				setObservation(data);
			} catch (err) {
				console.error("관측 상세 정보 불러오기 실패:", err);
				setError(err instanceof Error ? err.message : "관측 정보를 불러오는 중 오류가 발생했습니다");
				setObservation(null);
			} finally {
				setLoading(false);
			}
		};

		getObservationDetail();
	}, [observationId]);

	return { observation, loading, error };
}
