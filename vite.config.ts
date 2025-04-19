import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr(),
		//vitePWA 설정
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
			devOptions: {
				enabled: true
			},
			manifest: {
				name: "별 볼일 있는 지도",
				short_name: "별있지",
				description:
					"우리 동네에서는 왜 별이 안보일까? 호기심 해결을 위한 우리동네 빛공해 지도, 별 볼일 있는 지도",
				theme_color: "#ffffff",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",

				icons: [
					{
						src: "/icons/16x16.png",
						sizes: "16x16",
						type: "image/png"
					},
					{
						src: "/icons/32x32.png",
						sizes: "32x32",
						type: "image/png"
					},
					{
						src: "/icons/96x96.png",
						sizes: "96x96",
						type: "image/png"
					},
					{
						src: "/icons/144x144.png",
						sizes: "144x144",
						type: "image/png"
					},
					{
						src: "/icons/180x180.png",
						sizes: "180x180",
						type: "image/png"
					},
					{
						src: "/icons/192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/icons/512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable"
					}
				]
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1년
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "images-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30일
							}
						}
					},
					{
						urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "cdn-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 7 // 1주일
							}
						}
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
});
