import { ImageAnalysis, UserInput } from "@/types/observation";
import { MarkerData } from "@/types";

/**
 * 별 개수 텍스트 가져오기
 */
export function getStarCountText(imageAnalysis?: ImageAnalysis, fallbackCount: number = 0): string {
	const count = imageAnalysis?.star_count || fallbackCount;
	return `별 ${count}개`;
}

/**
 * 빛 공해 레벨 텍스트 가져오기
 */
export function getLightPollutionText(imageAnalysis?: ImageAnalysis, fallbackCategory?: string | number): string {
	let level = imageAnalysis?.light_pollution || "";

	if (!level || level === "string") {
		// 레벨 정보가 없으면 star_category로 추정
		const category = imageAnalysis?.star_category || fallbackCategory;

		if (typeof category === "string") {
			if (category.includes("1") || category === "나쁨") level = "4";
			else if (category.includes("2") || category === "보통") level = "3";
			else if (category.includes("3") || category === "좋음") level = "2";
			else if (category.includes("4") || category === "매우 좋음") level = "1";
			else level = "3";
		} else if (typeof category === "number") {
			level = String(5 - category); // 레벨 반전 (4->1, 1->4)
		}
	}

	return `빛 공해 ${level}레벨`;
}

/**
 * 관측 데이터 제목 가져오기
 */
export function getObservationTitle(userInput?: UserInput, fallbackTitle: string = "밤 하늘 기록!"): string {
	if (userInput?.title && userInput.title !== "string") {
		return userInput.title;
	}
	return fallbackTitle;
}

/**
 * 관측 데이터 내용 가져오기
 */
export function getObservationContent(userInput?: UserInput, imageAnalysis?: ImageAnalysis): string {
	if (userInput?.content && userInput.content !== "string") {
		return userInput.content;
	}
	return imageAnalysis?.ui_message || "별을 관측했습니다.";
}

/**
 * star_category에 따른 마커 이미지 번호 가져오기
 */
export function getMarkerImageNumber(category: string | number): number {
	if (typeof category === "string") {
		if (category.includes("4") || category === "매우 좋음") return 4;
		if (category.includes("3") || category === "좋음") return 3;
		if (category.includes("2") || category === "보통") return 2;
		if (category.includes("1") || category === "나쁨") return 1;
	} else if (typeof category === "number") {
		return Math.min(Math.max(category, 1), 4);
	}
	return 2; // 기본값은 보통
}

/**
 * API로부터 받은 관측 데이터를 마커 데이터로 변환
 */
export function observationToMarkerData(observation: {
	_id: string;
	image_analysis?: ImageAnalysis;
	user_input?: UserInput;
	latitude: number;
	longitude: number;
	uploaded_at: string;
}): MarkerData {
	const starCount = observation.image_analysis?.star_count || 0;

	// 품질 결정
	let skyQuality = "보통";
	const starCategory = observation.image_analysis?.star_category || "2";

	if (typeof starCategory === "string") {
		if (starCategory.includes("1") || starCategory === "나쁨") skyQuality = "나쁨";
		else if (starCategory.includes("2") || starCategory === "보통") skyQuality = "보통";
		else if (starCategory.includes("3") || starCategory === "좋음") skyQuality = "좋음";
		else if (starCategory.includes("4") || starCategory === "매우 좋음") skyQuality = "매우 좋음";
	} else if (typeof starCategory === "number") {
		if (starCategory === 1) skyQuality = "나쁨";
		else if (starCategory === 2) skyQuality = "보통";
		else if (starCategory === 3) skyQuality = "좋음";
		else if (starCategory === 4) skyQuality = "매우 좋음";
	}

	// 마커 이미지 번호 결정 (star_category만 사용)
	const markerImageNumber = getMarkerImageNumber(starCategory);

	// 날짜 포맷팅
	const uploadDate = new Date(observation.uploaded_at);
	const formattedDate = uploadDate.toISOString().split("T")[0];

	return {
		id: observation._id,
		position: {
			lat: observation.latitude,
			lng: observation.longitude
		},
		title: getObservationTitle(observation.user_input),
		skyQuality,
		imageUrl: `/assets/map/icn_place${markerImageNumber}.svg`,
		starCount,
		date: formattedDate
	};
}
