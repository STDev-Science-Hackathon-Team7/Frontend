// 이미지 분석 결과 정보
export interface ImageAnalysis {
	star_count?: number;
	star_category?: string | number;
	light_pollution?: string | number;
	ui_message?: string;
	[key: string]: any;
}

// 사용자 입력 정보
export interface UserInput {
	title?: string;
	content?: string;
	manual_star_count_range?: string;
	manual_star_count?: number;
	[key: string]: any;
}

// 기본 관측 데이터 (목록 조회용)
export interface BaseObservation {
	_id: string;
	image_analysis: ImageAnalysis;
	user_input: UserInput;
	latitude: number;
	longitude: number;
	filename: string;
	image_url?: string;
	uploaded_at: string;
}

// 관측 목록 API 응답
export interface ObservationListResponse {
	observations: BaseObservation[];
	total: number;
}

// 관측 상세 데이터 (상세 조회용)
export interface ObservationDetail extends BaseObservation {
	// 추후 상세 조회에만 있는 필드가 생기면 여기에 추가
}

// 관측 데이터 목록 조회 매개변수
export interface ObservationListParams {
	latitude: number;
	longitude: number;
	distance?: number;
	limit?: number;
	min_stars?: number;
	max_stars?: number;
	category?: number;
	days?: number;
}
