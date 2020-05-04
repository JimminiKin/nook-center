const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const bundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withPlugins([
	[
		bundleAnalyzer,
		{
			enabled: process.env.ANALYZE === 'true',
		},
	],
	[optimizedImages],
]);
