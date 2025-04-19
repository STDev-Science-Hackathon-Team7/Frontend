import React, { useContext, ReactNode, useEffect } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Coordinates } from "@/types";

// Context 타입 정의
interface LocationContextType {
	userLocation: Coordinates | null;
	loading: boolean;
	error: string | null;
}

// 기본값으로 Context 생성
const LocationContext = React.createContext<LocationContextType>({
	userLocation: null,
	loading: true,
	error: null
});

// Provider 프롭스 타입
interface LocationProviderProps {
	children: ReactNode;
}

// Provider 컴포넌트 구현
export function LocationProvider({ children }: LocationProviderProps) {
	const { userLocation, loading, error } = useGeolocation();

	// 추가 로깅 (디버깅 목적)
	useEffect(() => {
		if (error) {
			console.error("위치 정보 오류:", error);
		}
	}, [error]);

	return (
		<LocationContext.Provider
			value={{
				userLocation,
				loading,
				error
			}}
		>
			{children}
		</LocationContext.Provider>
	);
}

export function useLocation() {
	const context = useContext(LocationContext);

	if (!context) {
		throw new Error("useLocation은 LocationProvider 내부에서만 사용할 수 있습니다");
	}

	return context;
}
