import { ChangeEvent } from "react";

type TextInputProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({ value, onChange }: TextInputProps) {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			className="font-medium px-4 py-3 text-xs/5 border-border flex w-full min-w-0 rounded-xl border-[2px] outline-none disabled:pointer-events-none focus-visible:border-primary"
		/>
	);
}

