// pages/dat/detail.js
//获取应用实例
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      current_tab:            0,
      stat:                   [],

      lube_repair_history:    [],
      bearing_repair_history: [],

      api_url : app.myapp.myweb
    },

    switchTab: function(e) {
      console.log("FML")
      var that = this;
      if (this.data.current_tab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          current_tab: e.target.dataset.current
        })
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        var temp = JSON.parse(data.data)
        console.log(temp)
        that.setData({
          stat: temp
        })
      })

      wx.request({
        url: app.myapp.myweb + '/wx_test',
        success:function(res){
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})