import { useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { LocationButton } from "./button/LocationButton";
import { RecordButton } from "./button/RecordButton";
import { NextSpotButton } from "./button/NextSpotButton";
import { MarkerInfoCard } from "./marker/MarkerInfoCard";
import { SpotInfoCard } from "./marker/SpotInfoCard";
import { MarkerData } from "@/types";
import { MapWrapper } from "./MapWrapper";
import { useBestSpots } from "@/hooks/useBestSpots";

export function MapContainer({ initialShowSpots = false }: { initialShowSpots?: boolean }) {
	const navigate = useNavigate();
	const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
	const [isCardOpen, setIsCardOpen] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [isIOS, setIsIOS] = useState(false);
	const [showObservations, setShowObservations] = useState(!initialShowSpots);
	const [showSpots, setShowSpots] = useState(initialShowSpots);
	// 선택된 마커가 명소인지 여부를 저장
	const [isSpotMarker, setIsSpotMarker] = useState(false);
	// 현재 선택된 명소의 인덱스를 저장
	const [currentSpotIndex, setCurrentSpotIndex] = useState(0);
	// 지도 인스턴스 참조 저장
	const mapRef = useRef<google.maps.Map | null>(null);

	const { spotMarkers, loading, error } = useBestSpots();

	// iOS 환경 감지
	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		setIsIOS(/iphone|ipad|ipod/.test(userAgent));
	}, []);

	// 지도 인스턴스 설정 콜백
	const handleMapInit = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);

	// 특정 마커 위치로 지도 이동
	const moveMapToMarker = useCallback((marker: MarkerData) => {
		if (mapRef.current) {
			// 현재 줌 레벨 유지
			const currentZoom = mapRef.current.getZoom();
			// 지도 중심만 마커 위치로 설정하고 줌 레벨은 변경하지 않음
			mapRef.current.setCenter(marker.position);
		}
	}, []);

	// 다음 명소로 이동하는 함수
	const goToNextSpot = useCallback(() => {
		if (!showSpots || spotMarkers.length === 0) return;

		// 다음 인덱스 계산 (마지막 명소이면 첫 번째로 순환)
		const nextIndex = (currentSpotIndex + 1) % spotMarkers.length;
		const nextSpot = spotMarkers[nextIndex];

		// 다음 명소 선택
		setCurrentSpotIndex(nextIndex);
		setIsSpotMarker(true);
		setSelectedMarker(nextSpot);

		// 카드가 닫혀있었다면 열기
		if (!isCardOpen) {
			setIsCardOpen(true);
		}

		// 다음 명소로 지도 이동
		moveMapToMarker(nextSpot);
	}, [showSpots, spotMarkers, currentSpotIndex, isCardOpen, moveMapToMarker]);

	// 명소 모드일 때 데이터 로딩 완료 후 랜덤 마커 선택
	useEffect(() => {
		if (initialShowSpots && spotMarkers.length > 0 && !loading) {
			// 랜덤 인덱스 생성
			const randomIndex = Math.floor(Math.random() * spotMarkers.length);
			const randomMarker = spotMarkers[randomIndex];

			// 랜덤 마커 선택
			setCurrentSpotIndex(randomIndex);
			setIsSpotMarker(true);
			setSelectedMarker(randomMarker);

			// 약간의 지연 후 카드 표시 및 지도 이동
			setTimeout(() => {
				setIsCardOpen(true);

				// 초기 선택 시에만 적절한 줌 레벨 설정 (15)
				if (mapRef.current) {
					mapRef.current.setCenter(randomMarker.position);
					mapRef.current.setZoom(15);
				}
			}, 500); // 지도가 로드된 후 카드 표시를 위해 약간의 지연 추가
		}
	}, [initialShowSpots, spotMarkers, loading, moveMapToMarker]);

	const handleCurrentLocation = useCallback(() => {
		setRefreshKey((prev) => prev + 1);
	}, []);

	const handleRecordClick = useCallback(() => {
		navigate("/starWrite");
	}, [navigate]);

	const handleMarkerSelect = useCallback(
		(marker: MarkerData) => {
			console.log("마커 선택됨:", marker);

			// 명소 마커인지 확인 (description이 있으면 명소 마커로 판단)
			const isSpot = marker.description !== undefined;
			setIsSpotMarker(isSpot);

			// 선택된 명소의 인덱스 찾기
			if (isSpot && spotMarkers.length > 0) {
				const index = spotMarkers.findIndex((spot) => spot.id === marker.id);
				if (index !== -1) {
					setCurrentSpotIndex(index);
				}
			}

			setSelectedMarker(marker);
			setTimeout(() => setIsCardOpen(true), 10);

			// 선택된 마커로 지도 이동
			moveMapToMarker(marker);
		},
		[moveMapToMarker, spotMarkers]
	);

	const handleCloseCard = useCallback(() => {
		setIsCardOpen(false);
		setTimeout(() => {
			setSelectedMarker(null);
			setIsSpotMarker(false);
		}, 300);
	}, []);

	const recordButtonClassName = useMemo(
		() =>
			`absolute bottom-6 left-0 right-0 flex justify-center z-20 transition-transform duration-300 ease-in-out ${
				isCardOpen ? (isIOS ? "translate-y-[-280px]" : "translate-y-[-210px]") : "translate-y-0"
			}`,
		[isCardOpen, isIOS]
	);

	const spotData = useMemo(() => {
		return {
			spots: spotMarkers,
			loading,
			error
		};
	}, [spotMarkers, loading, error]);

	// 명소 모드일 때만 다음 버튼 표시
	const showNextButton = showSpots && spotMarkers.length > 1;

	// 명소 모드일 때는 RecordButton 숨기기
	const showRecordButton = !showSpots;

	return (
		<>
			<div key={refreshKey} className="w-full h-full">
				<MapWrapper
					onMarkerSelect={handleMarkerSelect}
					showObservations={showObservations}
					showSpots={showSpots}
					spotData={spotData}
					onMapInit={handleMapInit}
				/>
			</div>

			<div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
				<LocationButton onClick={handleCurrentLocation} />
				{showNextButton && <NextSpotButton onClick={goToNextSpot} />}
			</div>

			{showRecordButton && (
				<div className={recordButtonClassName}>
					<RecordButton onClick={handleRecordClick} />
				</div>
			)}

			{selectedMarker && !isSpotMarker && (
				<MarkerInfoCard markerData={selectedMarker} isOpen={isCardOpen} onClose={handleCloseCard} />
			)}

			{selectedMarker && isSpotMarker && (
				<SpotInfoCard markerData={selectedMarker} isOpen={isCardOpen} onClose={handleCloseCard} />
			)}
		</>
	);
}
