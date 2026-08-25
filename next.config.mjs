/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	images: {
		unoptimized: true,
		deviceSizes: [640, 960, 1280, 1600, 1920],
	},
};

export default nextConfig;
