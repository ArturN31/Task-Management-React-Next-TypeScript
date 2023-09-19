import type { Config } from 'tailwindcss';

const config: Config = {
	important: true,
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [],
};
export default config;
