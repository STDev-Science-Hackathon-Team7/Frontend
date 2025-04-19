import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
	return (
		<header className="h-14 flex items-center justify-center font-medium">{children}</header>
	);
}

