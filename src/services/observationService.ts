import { ObservationDetail, ObservationListParams, ObservationListResponse } from "@/types/observation";

export async function fetchObservations(params: ObservationListParams): Promise<ObservationListResponse> {
	const urlParams = new URLSearchParams();

	// 필수 파라미터
	urlParams.append("lat", params.latitude.toString());
	urlParams.append("lon", params.longitude.toString());

	// 선택 파라미터
	if (params.distance) urlParams.append("distance", params.distance.toString());
	if (params.limit) urlParams.append("limit", params.limit.toString());
	if (params.min_stars) urlParams.append("min_stars", params.min_stars.toString());
	if (params.max_stars) urlParams.append("max_stars", params.max_stars.toString());
	if (params.category) urlParams.append("category", params.category.toString());
	if (params.days) urlParams.append("days", params.days.toString());

	const apiUrl = `${import.meta.env.VITE_API_URL}/observations?${urlParams.toString()}`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error(`관측 데이터를 가져오는데 실패했습니다: ${response.status}`);
	}

	return await response.json();
}

//상세 조회
export async function fetchObservationDetail(observationId: string): Promise<ObservationDetail> {
	const apiUrl = `${import.meta.env.VITE_API_URL}/observations/${observationId}`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error(`관측 상세 데이터를 가져오는데 실패했습니다: ${response.status}`);
	}

	return await response.json();
}

//이미지
export function getObservationImageUrl(filename: string): string {
	if (!filename || filename === "string") {
		return "";
	}
	return `${import.meta.env.VITE_API_URL}/images/${filename}`;
}

export async function fetchObservationWithImage(
	observationId: string
): Promise<{ observation: ObservationDetail; imageUrl: string }> {
	const observation = await fetchObservationDetail(observationId);
	const imageUrl = getObservationImageUrl(observation.filename);

	return { observation, imageUrl };
}
