import CheckIcon from "@/assests/starWrite/CheckIcon.svg?react";

type Option = {
	label: string;
	value: string;
};

type RadioGroupProps = {
	options: Option[];
	name: string;
	selectedValue: string;
	onChange: (value: string) => void;
};

export default function RadioGroup({ options, name, selectedValue, onChange }: RadioGroupProps) {
	return (
		<div className="flex gap-4">
			{options.map((option) => {
				const isSelected = selectedValue === option.value;

				return (
					<label key={option.value}
						   className={`flex items-center gap-1 text-sm font-medium ${isSelected ? "text-primary" : "text-[#C4C4C4]"}`}>
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={selectedValue === option.value}
							onChange={() => onChange(option.value)}
							className="hidden"
						/>
						<CheckIcon color={isSelected ? "#4A7AF6" : "#C4C4C4"} />
						{option.label}
					</label>
				);
			})}
		</div>
	);
}