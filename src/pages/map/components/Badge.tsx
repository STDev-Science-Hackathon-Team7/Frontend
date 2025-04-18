import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function Badge({ className, children, ...props }: BadgeProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center rounded-full h-[26px] !p-3 text-xs font-medium bg-[#F5F6F8] text-gray-800",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

// 배지 그룹
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function BadgeGroup({ className, children, ...props }: BadgeGroupProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)} {...props}>
			{children}
		</div>
	);
}
