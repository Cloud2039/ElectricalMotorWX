// pages/dat/detail.js
import {timestampToTime} from "../../utils/common"

//获取应用实例
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      current_tab:            0,
      stat:                   {},

      lube_repair_history:    [],
      bearing_repair_history: [],
      current_repair_history: [],

      api_url : app.myapp.myweb
    },

    switchTab: function(e) {
      var that = this;
      if (this.data.current_tab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          current_tab: e.target.dataset.current
        })
      }

      if (e.target.dataset.current == 0) {
        that.setData({
          current_repair_history: that.data.lube_repair_history
        })
      }
      else if (e.target.dataset.current == 1) {
        that.setData({
          current_repair_history: that.data.bearing_repair_history
        })
      }
    },

    navigateToLube: function(){
      var that = this;
      wx.navigateTo({
        url: '/pages/dat/lube?motor_id='+ that.data.stat.motor_id + "&location=" + that.data.stat.location + "&name=" + that.data.stat.name,
        success: function(res){

        }
      })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        var temp = JSON.parse(data.data)
        var tmp_lube_repair_history = []
        var tmp_bearing_repair_history = []

        wx.request({
          url: app.myapp.myweb + '/wx_test_y',
          data:{
            motor_id: temp.motor_id,
          },
          success:function(res){
            transferLubeTime(res.data)
            res.data.forEach(item=>{
              console.log(item)
              if(item.type == 0){
                tmp_lube_repair_history.push(item)
              }  
              else if(item.type == 1) {
                tmp_bearing_repair_history.push(item)
              }
            })
            that.setData({
              lube_repair_history:      tmp_lube_repair_history,
              bearing_repair_history:   tmp_bearing_repair_history,
              current_repair_history:   tmp_lube_repair_history,
              stat:                     temp,
            })
          }
        })
      })
    },

    myEvent: function(e) {
      console.log(e.detail.date)
    },

    popupBearing: function(){
      var that = this

      that.setData({
        isPopupVisible:true,
        type: 0,
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

function transferLubeTime(test) {
  test.forEach(item=>{
    item.time=timestampToTime(item.time, 1)
  })
};