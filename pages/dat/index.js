
import * as echarts from '../../ec-canvas/echarts';

//获取应用实例
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTableTab:        0,
    currentLubeTab:         0,
    currentBearingTab:      0,

    api_url : app.myapp.myweb
  },

  slideTable: function(e) {
    var that = this;
    that.setData({
      currentTableTab: e.detail.current
    })
  },

  switchTable: function(e) {
    var that = this;
    if (this.data.currentTableTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTableTab: e.target.dataset.current
      })
    }
  },

  slideLubeTab: function(e) {
    var that = this;
    that.setData({
      currentLubeTab: e.detail.current
    })
  },

  switchLubeTab: function(e) {
    var that = this;
    if (this.data.currentLubeTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentLubeTab: e.target.dataset.current
      })
    }
  },

  slideBearingTab: function(e) {
    var that = this;
    that.setData({
      currentBearingTab: e.detail.current
    })
  },

  switchBearingTab: function(e) {
    var that = this;
    if (this.data.currentBearingTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentBearingTab: e.target.dataset.current
      })
    }
  },

  scanQRCode: function() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log(res);
        this.setData({
          result:res.result
        });
      },
      fail:(err) => {
        console.error(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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
});