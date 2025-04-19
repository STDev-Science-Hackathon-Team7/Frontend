//지오코딩 역지오코딩!!!
import { useState, useEffect, useRef } from "react";
import { Coordinates } from "@/types";

interface AddressResult {
	address: string;
	isLoading: boolean;
	error: string | null;
}

// Google Maps API 스크립트를 동적으로 로드하는 함수
const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		// 이미 로드된 경우
		if (window.google && window.google.maps && window.google.maps.Geocoder) {
			resolve();
			return;
		}

		// 로드 중인 경우
		if (document.getElementById("google-maps-script")) {
			const checkIfLoaded = () => {
				if (window.google && window.google.maps && window.google.maps.Geocoder) {
					resolve();
				} else {
					setTimeout(checkIfLoaded, 100);
				}
			};
			checkIfLoaded();
			return;
		}

		// 새로 로드
		const script = document.createElement("script");
		script.id = "google-maps-script";
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geocoding&v=weekly`;
		script.async = true;
		script.defer = true;

		script.onload = () => {
			if (window.google && window.google.maps && window.google.maps.Geocoder) {
				resolve();
			} else {
				reject(new Error("Google Maps API 로드 실패"));
			}
		};
		script.onerror = () => reject(new Error("Google Maps API 로드 실패"));

		document.head.appendChild(script);
	});
};

export function useGoogleReverseGeocoding(coordinates: Coordinates | null): AddressResult {
	const [address, setAddress] = useState<string>("대전 유성구 엑스포로 107"); // 기본값으로 실제 주소 설정
	const [isLoading, setIsLoading] = useState<boolean>(true); // 초기에는 로딩 중
	const [error, setError] = useState<string | null>(null);

	// 진행 중인 요청을 추적하기 위한 ref
	const geocodingRequestRef = useRef<boolean>(false);

	useEffect(() => {
		// 좌표가 없으면 기본 주소를 유지하고 로딩 상태 해제
		if (!coordinates) {
			setIsLoading(false);
			return;
		}

		// 이미 요청이 진행 중이면 중복 요청 방지
		if (geocodingRequestRef.current) {
			return;
		}

		// 타임아웃 ID를 저장할 변수
		let timeoutId: number;

		const fetchAddress = async () => {
			// 요청 시작 표시
			geocodingRequestRef.current = true;
			setIsLoading(true);
			setError(null);

			// 타임아웃 설정 - 10초 후에도 응답이 없으면 로딩 상태 해제
			timeoutId = window.setTimeout(() => {
				console.warn("지오코딩 타임아웃: 응답이 너무 오래 걸립니다.");
				setIsLoading(false);
				geocodingRequestRef.current = false;
			}, 10000);

			try {
				// Google Maps API 로드
				const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
				await loadGoogleMapsApi(apiKey);

				// 지오코더 초기화
				const geocoder = new google.maps.Geocoder();

				// 역지오코딩 요청
				geocoder.geocode({ location: { lat: coordinates.lat, lng: coordinates.lng } }, (results, status) => {
					// 타임아웃 제거
					clearTimeout(timeoutId);

					if (status === "OK" && results && results.length > 0) {
						// 다양한 주소 포맷 중에서 선택
						let formattedAddress = "";

						// 상세 주소 (가장 상세한 정보를 포함)
						const detailedAddress = results.find(
							(result) => result.types.includes("street_address") || result.types.includes("premise")
						);

						// 행정 구역 주소 (보통 더 읽기 쉬운 형식)
						const administrativeArea = results.find(
							(result) =>
								result.types.includes("administrative_area_level_1") ||
								result.types.includes("administrative_area_level_2") ||
								result.types.includes("sublocality_level_1")
						);

						// 가장 상세한 주소 정보 (기본)
						const mostDetailed = results[0];

						if (detailedAddress) {
							formattedAddress = detailedAddress.formatted_address;
						} else if (administrativeArea) {
							formattedAddress = administrativeArea.formatted_address;
						} else if (mostDetailed) {
							formattedAddress = mostDetailed.formatted_address;
						}

						// 한국어 주소에서 "대한민국" 및 우편번호 제거하고 간소화
						formattedAddress = formattedAddress
							.replace("대한민국 ", "")
							.replace(", 대한민국", "")
							.replace(/\d{5,}\s/, ""); // 우편번호 패턴 제거

						setAddress(formattedAddress);
					} else {
						console.error("Geocoding 실패:", status);
						// 오류 시 기본 주소 유지
					}

					// 로딩 상태 해제 및 요청 완료 표시
					setIsLoading(false);
					geocodingRequestRef.current = false;
				});
			} catch (err) {
				console.error("주소 조회 오류:", err);
				setError("주소를 가져오는데 실패했습니다");

				// 로딩 상태 해제 및 요청 완료 표시
				setIsLoading(false);
				geocodingRequestRef.current = false;

				// 타임아웃 제거
				clearTimeout(timeoutId);
			}
		};

		// API 호출 실행
		fetchAddress();

		// 클린업 함수 - 컴포넌트 언마운트 시 실행
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			geocodingRequestRef.current = false;
		};
	}, [coordinates]); // isLoading 의존성 제거

	return { address, isLoading, error };
}
