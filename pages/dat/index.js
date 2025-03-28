
import * as echarts from '../../ec-canvas/echarts';
import {timestampToTime} from "../../utils/common"

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

    lube_stats:             [],
    bearing_stats:          [],

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

  switchLubeTab: function(e) {
    var that = this;
    if (this.data.currentLubeTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentLubeTab: e.target.dataset.current
      })
      wx.request({
        url: app.myapp.myweb + '/wx_test_x',
        data:{
          running_stat: e.target.dataset.current
        },
        success:function(res){
          console.log(res.data)
          transferLubeTime(res.data)
          that.setData({lube_stats:res.data})
        }
      })
    }
  },

  switchBearingTab: function(e) {
    var that = this;
    if (this.data.currentBearingTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentBearingTab: e.target.dataset.current
      })
      wx.request({
        url: app.myapp.myweb + 'url',
        data:{
          running_stat: e.target.dataset.current
        },
        success:function(res){
          console.log(res.data)
          that.setData({bearing_stats:res.data})
        }
      })
    }
  },

  toSpecific: function(){
    wx.navigateTo({
      url: '/pages/dat/detail',
      success:function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: this.data.lube_stats[0]})
        // http://diginfo.cn/element/article/539
      }
    })
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

function transferLubeTime(test) {
  test.forEach(item=>{
    item.de_maintenance_time=timestampToTime(item.de_maintenance_time, 1)
    item.nde_maintenance_time=timestampToTime(item.nde_maintenance_time, 1)
  })
};