import Lottie from "lottie-react";
import LoadingIcon from "@/assets/icons/LoadingIcon.json";

export default function Loading() {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center gap-2.5">
			<h1 className="font-bold text-lg">분석중이에요</h1>
			<span className="text-sm text-gray-sub">뭐를 바탕으로 분석중입니다</span>
			<Lottie animationData={LoadingIcon} loop className="w-1/2 h-1/2"/>
		</div>
	);
}