import { Button } from "@/components/ui/button";
import { useEffect, useState, memo, useCallback } from "react";

interface SkyCondition {
	status: string;
	quality: "좋음" | "보통" | "나쁨";
}

interface RecordButtonProps {
	onClick: () => void;
}

// memo
export const RecordButton = memo(function RecordButton({ onClick }: RecordButtonProps) {
	const [skyCondition, setSkyCondition] = useState<SkyCondition | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSkyCondition = async () => {
			try {
				setIsLoading(true);

				// api 엔드포인트 나중에 바꾸기!!!
				const response = await fetch("/api/sky-condition");
				const data = await response.json();
				setSkyCondition(data);
			} catch (error) {
				console.error("날씨 상태를 불러오는데 실패했습니다:", error);

				setSkyCondition({ status: "오늘의 밤 하늘 ", quality: "보통" });
			} finally {
				setIsLoading(false);
			}
		};

		fetchSkyCondition();
	}, []);

	// 버튼 클릭 핸들러 메모이제이션
	const handleClick = useCallback(() => {
		onClick();
	}, [onClick]);

	return (
		//홈, 맵에서 다른 규격 고려해서 컴포넌트 리팩토링---왤케 안되지 진짜
		<div className="w-full h-[52px] flex items-center justify-between bg-white rounded-full shadow-md">
			<div className="flex items-center justify-center h-[38px] w-[152px] !ml-2">
				{isLoading ? (
					"로딩 중..."
				) : (
					<>
						{skyCondition?.status}
						<span className="text-blue-600 font-medium"> "{skyCondition?.quality}"</span>
					</>
				)}
			</div>

			<Button className="!bg-[#1B45C9] text-white rounded-full h-[38px] w-[152px] !mr-2" onClick={handleClick}>
				밤 하늘 기록하기
			</Button>
		</div>
	);
});
