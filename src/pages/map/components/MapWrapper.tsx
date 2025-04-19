import { Wrapper } from "@googlemaps/react-wrapper";
import { MapView } from "./MapView";
import { renderStatus, LoadingMessage } from "./MapStatus";
import { useLocation } from "@/contexts/LocationContext";
import { MarkerData } from "@/types";

interface MapWrapperProps {
	onMarkerSelect?: (marker: MarkerData) => void;
}

export function MapWrapper({ onMarkerSelect }: MapWrapperProps) {
	const { userLocation, loading, error } = useLocation();
	console.log("userLocation", userLocation);
	// 위치 정보 가져오는 중 표시
	if (loading) {
		return <LoadingMessage message="현재 위치를 가져오는 중..." />;
	}

	// 위치 오류 표시
	if (error) {
		console.log("위치 오류 발생:", error);
		return <LoadingMessage message={error} />;
	}

	// 위치 정보가 없는 경우 표시
	if (!userLocation) {
		return <LoadingMessage message="위치 정보를 가져올 수 없습니다." />;
	}

	return (
		<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} render={renderStatus}>
			<MapView center={userLocation} onMarkerSelect={onMarkerSelect} />
		</Wrapper>
	);
}
