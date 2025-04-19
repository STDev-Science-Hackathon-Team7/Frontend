import { ChangeEvent } from "react";

type TextAreaProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({ value, onChange }: TextAreaProps) {
	return (
		<textarea
			value={value}
			onChange={onChange}
			className="font-medium px-4 py-3 text-xs/5 border-border flex w-full min-h-22 rounded-xl border-[2px] outline-none disabled:pointer-events-none focus-visible:border-primary resize-none"
		>

		</textarea>
	);
}

