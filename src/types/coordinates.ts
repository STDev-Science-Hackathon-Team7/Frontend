//지도 좌표 타입
export interface Coordinates {
	lat: number;
	lng: number;
}

export interface GeolocationState {
	userLocation: Coordinates | null;
	loading: boolean;
	error: string | null;
}
