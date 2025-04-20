import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { Badge, BadgeGroup } from "../Badge";
import { MarkerData } from "@/types";
import { useObservationDetail } from "@/hooks/useObservationDetail";
import defaultImage from "@/assets/map/sample.png";
import {
	getStarCountText,
	getLightPollutionText,
	getObservationTitle,
	getObservationContent
} from "@/utils/observationUtils";
import { getObservationImageUrl } from "@/services/observationService";

interface MarkerInfoCardProps {
	markerData: MarkerData;
	onClose: () => void;
	isOpen: boolean;
}

export const MarkerInfoCard = memo(function MarkerInfoCard({ markerData, onClose, isOpen }: MarkerInfoCardProps) {
	const { observation, loading, error } = useObservationDetail(isOpen ? markerData.id : null);
	const [imageUrl, setImageUrl] = useState<string>(defaultImage);
	const [isIOS, setIsIOS] = useState(false);

	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		setIsIOS(/iphone|ipad|ipod/.test(userAgent));
	}, []);

	useEffect(() => {
		if (observation?.image_url) {
			setImageUrl(observation.image_url);
		} else if (observation?.filename) {
			const url = getObservationImageUrl(observation.filename);
			if (url) {
				setImageUrl(url);
			}
		}
	}, [observation]);

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

	return (
		<div className="fixed inset-0 z-40">
			<div className="absolute inset-0" onClick={handleClose} />

			<div className={cardContainerClassName}>
				<div className="w-full max-w-[500px]">
					<div className={`bg-white rounded-t-2xl shadow-lg !px-8 !py-5 ${paddingBottomClass}`}>
						{loading ? (
							<div className="flex items-center justify-center h-[150px]">
								<p className="text-gray-500">관측 정보를 불러오는 중...</p>
							</div>
						) : error ? (
							<div className="flex items-center justify-center h-[150px]">
								<p className="text-red-500">정보를 불러오지 못했습니다.</p>
							</div>
						) : (
							<div className="flex !mb-10">
								<div className="flex-1">
									<BadgeGroup>
										<Badge>
											{getStarCountText(observation?.image_analysis, markerData.starCount)}
										</Badge>
										<Badge>
											{getLightPollutionText(observation?.image_analysis, markerData.skyQuality)}
										</Badge>
									</BadgeGroup>
									<div className="!mt-4 !ml-1">
										<p className="text-sm font-bold">
											{getObservationTitle(observation?.user_input, markerData.title)}
										</p>
										<p className="text-gray-500 text-xs">
											{getObservationContent(
												observation?.user_input,
												observation?.image_analysis
											)}
										</p>
									</div>
								</div>

								<div>
									<img
										src={imageUrl}
										alt="밤하늘 사진"
										className="w-[140px] h-[140px] rounded-2xl object-cover"
										onError={(e) => {
											(e.target as HTMLImageElement).src = defaultImage;
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
