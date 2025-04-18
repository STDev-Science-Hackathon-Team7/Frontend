import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

// 서비스 워커 등록
const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm("새 버전이 있습니다. 업데이트하시겠습니까?")) {
			updateSW();
		}
	},
	onOfflineReady() {
		console.log("앱이 오프라인 모드에서 실행될 준비가 되었습니다.");
	}
});

createRoot(document.getElementById("root")!).render(<App />);
