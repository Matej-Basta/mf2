const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;


module.exports = function override(config, env) {
    // Set the public path based on the environment
    const isProduction = process.env.NODE_ENV === 'production';
    const isPreview = process.env.VERCEL_ENV === 'preview';
    const publicPath = isPreview ? 'https://mf2-staging.vercel.app/' : ( isProduction ? 'https://mf2.vercel.app/' : 'http://localhost:3008/' );

    // Ensure the public path is set in the output configuration
    config.output = {
        ...config.output,
        publicPath: publicPath,
    };

  config.plugins = [
    new ModuleFederationPlugin({
      name: 'payment',
      filename: 'remoteEntry.js',
      exposes: {
        './Payment': './src/components/Payment.tsx', // Adjust the path to your component
      },
      shared: {
        // Shared dependencies
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
      },
    },
    }),
    ...config.plugins,
  ];

  // Ensure HtmlWebpackPlugin is correctly configured if you're customizing the HTML output
  const htmlWebpackPlugin = config.plugins.find(
    plugin => plugin instanceof HtmlWebpackPlugin,
  );
  if (htmlWebpackPlugin) {
    htmlWebpackPlugin.options.inject = true;
  }

  return config;
};
