import { ReactNode } from "react";
import BackIcon from "@/assets/icons/BackIcon.svg?react";
import { useNavigate } from "react-router-dom";

export default function Header({ children, backTo }: { children: ReactNode, backTo?: string }) {
	const navigate = useNavigate();

	return (
		<header className="relative h-14 flex items-center justify-center font-medium">
			<button
				className="absolute left-0"
				onClick={() => backTo ? navigate(`/${backTo}`) : navigate(-1)}
			>
				<BackIcon />
			</button>
			{children}
		</header>
	);
}

