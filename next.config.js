const withFonts = require('next-fonts');

module.exports = withFonts({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false,
            }
          }
        }
      }],
    });

    return config;
  },
  images: {
    domains: ['lars.tf', 'cdn.lars.tf', 'cdn.discordapp.com'],
  },
  async redirects() {
    return [
      {
        source: '/bots/:name/invite',
        destination: 'https://lars.tf/api/bots/:name/invite',
        permanent: true,
      },
    ]
  },
}); 