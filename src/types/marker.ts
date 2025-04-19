// 지도 마커 관련 타입 정의
import { Coordinates } from "./coordinates";

export interface MarkerData {
	id: string;
	position: Coordinates;
	title: string;
	skyQuality: string;
	imageUrl: string;
	starCount: number;
	date: string;
	description?: string;
}
