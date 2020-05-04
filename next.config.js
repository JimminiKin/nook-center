const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
		// Note: we provide webpack above so you should not `require` it
		// Perform customizations to webpack config
		// Important: return the modified config
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			loader: 'graphql-tag/loader',
			exclude: /node_modules/,
		});
		return config;
	},
};

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				// these are the default values so you don't have to provide them if they are good enough for your use-case.
				// but you can overwrite them here with any valid value you want.
				inlineImageLimit: 8192,
				imagesFolder: 'images',
				imagesName: '[name]-[hash].[ext]',
				handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
				optimizeImages: true,
				optimizeImagesInDev: false,
				mozjpeg: {
					quality: 80,
				},
				optipng: {
					optimizationLevel: 3,
				},
				pngquant: false,
				gifsicle: {
					interlaced: true,
					optimizationLevel: 3,
				},
				svgo: {
					// enable/disable svgo plugins here
				},
				webp: {
					preset: 'default',
					quality: 75,
				},
			},
		],
	],
	withBundleAnalyzer(nextConfig),
);
