import Lottie from "lottie-react";
import LoadingAnimation from "@/assets/icons/LoadingAnimation.json";

export default function Loading() {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center gap-2.5 px-11">
			<h1 className="font-bold text-lg">분석중이에요</h1>
			<span className="text-sm text-gray-sub">하늘 밝기(SQM), 전체 밝기, 인공 광원 밝기 등을 종합적으로 고려하여 빛공해 레벨을 측정하고 있습니다</span>
			<Lottie animationData={LoadingAnimation} loop className="w-1/2 h-1/2"/>
		</div>
	);
}