App({
  onLaunch: function () {
    const { statusBarHeight, platform, windowHeight }=wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()
    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 屏幕高度
    wx.setStorageSync('windowHeight', windowHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
      const navigationBarHeight = (top - statusBarHeight) * 2 + height
      // 导航栏高度
      wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
      wx.setStorageSync('navigationBarHeight', platform === 'android' ? 48 : 40)
    }

    wx.cloud.init({
      env: 'cloud1-3gead6xn1cfe2f2d',
      traceUser:true
    })
  },
  myapp:{
    //myweb: "http://ems.cloud.ruishan.cn", 
    myweb:"http://192.168.0.53:8001",
  },
})