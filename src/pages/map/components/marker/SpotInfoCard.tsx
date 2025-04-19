import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { Badge, BadgeGroup } from "../Badge";
import { MarkerData } from "@/types";
import { useSpotDetail } from "@/hooks/useSpotDetail";
import defaultImage from "@/assets/map/sample.png";

interface SpotInfoCardProps {
	markerData: MarkerData;
	onClose: () => void;
	isOpen: boolean;
}

export const SpotInfoCard = memo(function SpotInfoCard({ markerData, onClose, isOpen }: SpotInfoCardProps) {
	const { spot, loading, error } = useSpotDetail(isOpen ? markerData.id : null);
	const [isIOS, setIsIOS] = useState(false);

	// iOS 환경 감지
	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		setIsIOS(/iphone|ipad|ipod/.test(userAgent));
	}, []);

	// 클릭 핸들러 메모이제이션
	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	// 카드 컨테이너 클래스 메모이제이션
	const cardContainerClassName = useMemo(
		() =>
			`absolute bottom-0 left-0 right-0 flex justify-center transition-transform duration-300 ease-in-out ${
				isOpen ? "translate-y-0" : "translate-y-full"
			}`,
		[isOpen]
	);

	const paddingBottomClass = isIOS ? "pb-16" : "pb-5";

	// Bortle 척도를 한글로 표시
	const getBortleScaleText = (bortleScale: number) => {
		if (bortleScale <= 3) return "매우 좋음";
		if (bortleScale <= 4) return "좋음";
		if (bortleScale <= 6) return "보통";
		return "나쁨";
	};

	return (
		<div className="fixed inset-0 z-40">
			<div className="absolute inset-0" onClick={handleClose} />

			<div className={cardContainerClassName}>
				<div className="w-full max-w-[500px]">
					<div className={`bg-white rounded-t-2xl shadow-lg !px-8 !py-5 ${paddingBottomClass}`}>
						{loading ? (
							<div className="flex items-center justify-center h-[150px]">
								<p className="text-gray-500">명소 정보를 불러오는 중...</p>
							</div>
						) : error ? (
							<div className="flex items-center justify-center h-[150px]">
								<p className="text-red-500">정보를 불러오지 못했습니다.</p>
							</div>
						) : (
							<div className="flex flex-col !mb-10">
								<div className="flex-1">
									<BadgeGroup>
										<Badge>별 품질: {markerData.skyQuality}</Badge>
										{spot && <Badge>Bortle: {spot.sky_quality.bortle_scale}</Badge>}
									</BadgeGroup>
									<div className="!mt-4 !ml-1">
										<p className="text-lg font-bold mb-2">{markerData.title}</p>
										{spot && (
											<>
												<p className="text-gray-700 text-sm mb-1">
													점수: {spot.sky_quality.score.toFixed(1)}점
												</p>
												<p className="text-gray-600 text-xs mt-2">{spot.description}</p>
											</>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
