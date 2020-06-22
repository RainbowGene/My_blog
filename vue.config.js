
const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // webpack ProvidePlugin的含义是创建一个全局的变量，使这个变量在webpack各个模块内都可以使用。这里的配置含义是创建'$'、'jQuery'、'window.jQuery'三个变量指向jQuery依赖，创建'Popper'变量指向popper.js依赖。
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }
}
