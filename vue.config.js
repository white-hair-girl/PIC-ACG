module.exports = {
  transpileDependencies: true,

  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 'tabbar-item-active-background-color': '#da557d',
            'tabbar-item-active-background-color': '#ec97b6',
            '@nav-bar-text-color': '#ec97b6',
            '@nav-bar-icon-color': '#ec97b6',
            '@sidebar-selected-text-color': '#ec97b6',
            '@sidebar-selected-border-color': '#ec97b6',
            
          },
        },
      },
    },
  },

  devServer: {
    proxy: 'http://1.12.73.162'
    // proxy: 'https://apis.netstart.cn/bcomic'
  }
};
