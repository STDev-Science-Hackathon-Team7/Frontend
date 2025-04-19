import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
	title: string;
	description?: string | React.ReactNode;
	image?: React.ReactNode;
	width?: string;
	height?: string;
	className?: string;
	onClick?: () => void;
}

export function Card({ title, description, image, width, height, className = "", onClick }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-2xl border-2 border-gray-200 p-0 flex flex-col",
				onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : "",
				className
			)}
			style={{ width, height }}
			onClick={onClick}
		>
			<div className="w-full h-full flex justify-between">
				<div className="flex-1 p-6">
					<div className="text-sm font-medium">{title}</div>
					<div className="text-sm mt-2">{description}</div>
				</div>
				{image && <div className="flex items-center p-2">{image}</div>}
			</div>
		</div>
	);
}
