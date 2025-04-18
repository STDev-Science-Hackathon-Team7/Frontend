import { ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	type?: "button" | "submit"
};

export default function Button({ children, onClick, disabled = false, className = "", type = "button" }: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`py-2.5 rounded-4xl transition-colors text-white w-full font-semibold
				${disabled ? "bg-[#C4C4C4]" : "bg-[#1B45C9] cursor-pointer"}
				${className}`}
		>
			{children}
		</button>
	);
}