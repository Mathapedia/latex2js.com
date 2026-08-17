import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['var(--font-arbutus-slab)', 'Georgia', 'serif'],
			},
		},
	},
	plugins: [],
};

export default config;
