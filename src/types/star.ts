//별 관측 및 하늘 품질 관련 타입 정의
export type SkyQualityLevel = 1 | 2 | 3 | 4;

export interface SkyQualityData {
	level: SkyQualityLevel;
	message: string;
}

export interface StarSpot {
	id: string;
	latitude: number;
	longitude: number;
	skyQualityLevel: number;
	imageUrl: string;
	title: string;
	description: string;
	createdAt: string;
}
