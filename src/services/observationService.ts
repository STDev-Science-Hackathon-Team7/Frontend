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

// 밤 하늘 명소 API
export interface SpotData {
	_id: string;
	name: string;
	location: {
		latitude: number;
		longitude: number;
	};
	sky_quality: {
		sqm: number;
		brightness: number;
		artificial_brightness: number;
		ratio: number;
		bortle_scale: number;
		elevation: number;
		score: number;
		category: string;
		components: {
			bortle_score: number;
			sqm_score: number;
			brightness_score: number;
			artificial_score: number;
			ratio_score: number;
			elevation_score: number;
		};
	};
	description: string;
	created_at: string;
}

export interface SpotsResponse {
	spots: SpotData[];
	total: number;
	criteria: {
		bortle_max: number;
		category: string | null;
	};
}

export async function fetchBestSpots(): Promise<SpotsResponse> {
	const apiUrl = `${import.meta.env.VITE_API_URL}/observation-spots/best`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error(`밤 하늘 명소 데이터를 가져오는데 실패했습니다: ${response.status}`);
	}

	return await response.json();
}

// 명소 상세 정보 가져오기
export async function fetchSpotDetail(spotId: string): Promise<SpotData> {
	const apiUrl = `${import.meta.env.VITE_API_URL}/observation-spots/${spotId}`;
	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error(`명소 상세 데이터를 가져오는데 실패했습니다: ${response.status}`);
	}

	return await response.json();
}
