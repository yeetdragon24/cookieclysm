const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isTesting = env && env.testing;

  return {
    entry: "./src/main.js",
    
    output: {
      filename: 'cookieclysm.bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      library: {
        type: 'umd',
        umdNamedDefine: true
      }
    },
    
    mode: isProduction ? 'production' : 'development',
    
    devtool: isProduction ? false : 'source-map',
    
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/inline'
        },
        {
          test: /\.json$/i,
          type: 'asset/source'
        }
      ]
    },
    
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false,
              drop_debugger: isProduction
            },
            mangle: {
              keep_fnames: true
            },
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    
    plugins: [],
    
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    
    resolve: {
      extensions: ['.js', '.json']
    }
  };
};