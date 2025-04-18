import { GeolocationState } from "@/types";
import { useState, useEffect } from "react";

export function useGeolocation(): GeolocationState {
	const [state, setState] = useState<GeolocationState>({
		userLocation: null,
		loading: true,
		error: null
	});

	useEffect(() => {
		// console.log("위치 정보 요청 시작");

		if ("geolocation" in navigator) {
			//이전 위치 캐시 삭제 시도
			navigator.geolocation.clearWatch = navigator.geolocation.clearWatch || function () {};

			const options = {
				enableHighAccuracy: true,
				timeout: 30000,
				maximumAge: 0
			};

			const watchId = navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					// console.log("위치 정보 성공:", latitude, longitude;

					setState({
						userLocation: { lat: latitude, lng: longitude },
						loading: false,
						error: null
					});
				},
				(error) => {
					console.error("위치 정보 오류:", error.message);
					let errorMessage = error.message;

					switch (error.code) {
						case 1:
							errorMessage = "사용자가 위치 정보 제공을 거부했습니다.";
							break;
						case 2:
							errorMessage = "위치 정보를 사용할 수 없습니다.";
							break;
						case 3:
							errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
							break;
					}

					setState({
						userLocation: null,
						loading: false,
						error: errorMessage
					});
				},
				options
			);

			return () => {
				if (watchId !== undefined) {
					navigator.geolocation.clearWatch(watchId);
				}
			};
		} else {
			const errorMessage = "이 브라우저는 위치 정보를 지원하지 않습니다. ";
			console.warn(errorMessage);
			setState({
				userLocation: null,
				loading: false,
				error: errorMessage
			});
		}
	}, []);

	return state;
}
