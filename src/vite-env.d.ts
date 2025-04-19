/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
declare module "*.svg?react" {
	import * as React from 'react';
	const Component: React.FC<React.SVGProps<SVGSVGElement>>;
	export default Component;
}

