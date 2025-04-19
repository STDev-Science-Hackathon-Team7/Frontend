import { ChangeEvent, FormEvent, useRef, useState } from "react";
import PlusIcon from "@/assets/starWrite/PlusIcon.svg?react";
import Loading from "@/pages/starWrite/components/Loading.tsx";
import Header from "@/pages/starWrite/ui/Header.tsx";
import RadioGroup from "@/pages/starWrite/components/RadioGroup.tsx";
import Footer from "@/pages/starWrite/ui/Footer.tsx";
import Button from "@/pages/starWrite/components/Button.tsx";
import TextInput from "@/pages/starWrite/components/TextInput.tsx";
import Divider from "@/pages/starWrite/components/Divider.tsx";
import TextArea from "@/pages/starWrite/components/TextArea.tsx";

const options = [
	{ label: "0", value: "0" },
	{ label: "1 ~ 4", value: "1" },
	{ label: "5 ~ 8", value: "2" },
	{ label: "9 +", value: "3" }
];

type FormState = {
	title: string;
	content: string;
	starCount: string;
	imagePreview: string | null;
	imageFile: File | null;
};

export default function StarWrite() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [form, setForm] = useState<FormState>({
		title: "",
		content: "",
		starCount: "0",
		imagePreview: null,
		imageFile: null
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setForm((prev) => ({
				...prev,
				imagePreview: reader.result as string,
				imageFile: file
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!form.imageFile) {
			alert("이미지를 업로드해주세요.");
			return;
		}
		if (!form.title.trim()) {
			alert("제목을 입력해주세요.");
			return;
		}
		if (!form.content.trim()) {
			alert("내용을 입력해주세요.");
			return;
		}

		setIsLoading(true);

		const formData = new FormData();
		formData.append("title", form.title);
		formData.append("content", form.content);
		formData.append("starCount", form.starCount);
		formData.append("image", form.imageFile);

		try {
			await fetch("/api/star-write", {
				method: "POST",
				body: formData
			});
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <Loading />;

	return (
		<div className="px-[22px] pb-20">
			<Header>밤 하늘 기록</Header>
			<main>
				<form onSubmit={handleSubmit}>
					<section className="flex flex-col gap-3 my-4">
						<div>
							<h3 className="text-sm font-semibold">사진을 등록해주세요</h3>
							<h4 className="text-xs text-gray-sub">
								정확한 빛공해 측정을 위해 가로등이나 간판 등 인공 조명을 직접 촬영하는 것은 피해 주세요.
							</h4>
						</div>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={handleClick}
								className="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded-xl border-[2px] border-border"
							>
								<PlusIcon />
								<span className="text-primary text-[10px]">사진등록</span>
							</button>
							<input
								type="file"
								accept="image/*"
								ref={inputRef}
								onChange={handleChangeImage}
								className="hidden"
							/>
							{form.imagePreview && (
								<div className="flex w-16 h-16">
									<img src={form.imagePreview} alt="preview" className="rounded-xl w-full h-full" />
								</div>
							)}
						</div>
					</section>
					<Divider />
					<section className="flex flex-col gap-7.5 mt-7.5">
						<div>
							<h3 className="text-sm font-semibold mb-2">글 어쩌구 저쩌구</h3>
							<div className="mb-4">
								<h4 className="text-xs text-gray-sub font-medium mb-1">글 제목</h4>
								<TextInput
									value={form.title}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, title: e.target.value }))
									}
								/>
							</div>
							<div>
								<h4 className="text-xs text-gray-sub font-medium mb-1">글 내용</h4>
								<TextArea
									value={form.content}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, content: e.target.value }))
									}
								/>
							</div>
						</div>
						<div>
							<h3 className="text-sm font-semibold">
								별 개수를 선택해주세요<span className="text-primary">(필수)</span>
							</h3>
							<h4 className="text-xs text-gray-sub mb-2">가시적으로 보이는 별의 개수를 선택해주세요.</h4>
							<RadioGroup
								name="starCount"
								options={options}
								selectedValue={form.starCount}
								onChange={(value) =>
									setForm((prev) => ({ ...prev, starCount: value }))
								}
							/>
						</div>
					</section>
					<Footer>
						<Button type="submit">분석하기</Button>
					</Footer>
				</form>
			</main>
		</div>
	);
}
