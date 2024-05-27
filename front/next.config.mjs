/** @type {import('next').NextConfig} */

const IMAGE_API_URL = process.env.NEXT_PUBLIC_FLAGCDN_BASE_URL;

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: IMAGE_API_URL.slice('https://'.length),
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
