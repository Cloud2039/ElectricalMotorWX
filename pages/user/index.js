//获取应用实例
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        u_name:"", //微信用户或者普通用户
        lx:1 //1微信用户，2普通用户
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showTabBar()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this
        wx.getStorage({
          key: 'u_login',
          success: function () {
              wx.getStorage({
                key: 'u_name',
                success: function (res) {
                  that.setData({ u_name: res.data })
                  if(res.data=="微信用户"){
                    that.setData({ lx: 1 })
                  }else{
                    that.setData({ lx:2 })
                  }
                },
              })

          },
        })
    },
    
  //退出登录：清除缓存
  logout:function(){
    wx.clearStorage()
    wx.reLaunch({
      url: '/pages/user/login',
    })
  },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      wx.navigateTo({
        url: '/pages/user/overview',
      })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})