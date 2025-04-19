import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
	return (
		<footer
			className="flex items-center fixed h-20 translate-x-[-50%] left-1/2  bottom-0 w-full max-w-[500px] px-[22px] bg-white"
		>
			{children}
		</footer>
	);
}

