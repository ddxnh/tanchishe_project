const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // 指定路口文件
  entry: "./src/index.ts",
  // 指定打包环境
  mode: 'development',
  // 指定打包文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    // 告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      'chrome': '88',
                      "ie": "11",
                    },
                    "corejs": "3",
                    // 使用corejs的方式按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'],
        exclude: /node_modules/,
      },
      // 设置less文件处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: '自定义的标题'
      template: './src/index.html'
    }),
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}