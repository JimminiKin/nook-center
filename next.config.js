const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: "graphql-tag/loader",
      exclude: /node_modules/,
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
