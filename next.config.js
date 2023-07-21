/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['openweathermap.org', 'firebasestorage.googleapis.com']
	},
	reactStrictMode: true
};

module.exports = nextConfig;
