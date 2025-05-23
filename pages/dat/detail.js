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
      detailHidden:           true,

      lube_repair_history:    [],
      bearing_repair_history: [],
      current_repair_history: [],
      today:                  "",

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
      wx.navigateTo({
        url: '/pages/dat/lube?motor_id='+ that.data.stat.runningData[0].motorId + "&positionNum=" + that.data.stat.positionNum + "&location=" + that.data.stat.location + "&name=" + that.data.stat.name + "&amount=" + that.data.stat.oilInjectionAmount + "&deReferenceTime=" + that.data.stat.runningData[0].deReferenceTime + "&ndeReferenceTime=" + that.data.stat.runningData[0].ndeReferenceTime + "&deMaintenanceTime=" + that.data.stat.runningData[0].deMaintenanceTime + "&ndeMaintenanceTime=" + that.data.stat.runningData[0].ndeMaintenanceTime,
      })
    },

    toggleDetail: function() {
      this.setData({
        detailHidden: !this.data.detailHidden
      })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this;
      const eventChannel = this.getOpenerEventChannel()
      var date = new Date()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      var today = date.getFullYear()+'-'+month+'-'+day
      that.setData({
        today: today
      })
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        var temp = JSON.parse(data.data)
        var tmp_lube_repair_history = []
        var tmp_bearing_repair_history = []

        wx.request({
          url: app.myapp.myweb + '/api/motorRepairRecords/selectByMotorId/' + temp.runningData[0].motorId + '?page=1&limit=20',
          header: {
            'Authorization': wx.getStorageSync('u_access_token')
          },
          success:function(res){
            transferLubeTime(res.data.data)
            res.data.data.forEach(item=>{
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

    scanQRCode: function() {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
  
          wx.request({
            url: app.myapp.myweb + '/api/motorBasicData/selectAll/1?page=1&limit=10&positionNum='  + res.result,
            header: {
              'Authorization': wx.getStorageSync('u_access_token')
            },
            success:function(res1){
              transferSingleLubeTime(res1.data.data[0])
              wx.navigateTo({
                url: '/pages/dat/detail?lube',
                success: function(res2) {
                  // 通过eventChannel向被打开页面传送数据
                  var tmp = JSON.stringify(res1.data.data[0])
                  res2.eventChannel.emit('acceptDataFromOpenerPage', {data: tmp})
                }
              })
            },
            fail:function(){
              wx.showToast({
                title: '没有搜索到该装置',
                icon: fail,
              })
            }
          })
        },
        fail:(err) => {
          console.error(err);
          wx.showToast({
            title: err,
            icon: fail,
          })
        }
      })
    },

    popupBearing: function(){
      var that = this

      if(that.data.today == that.data.deMaintenanceTime){
        console.log('weird')
        wx.showModal({
          title: '提示',
          content: '您今日已换过轴，请问仍然换轴吗？',
          complete: (res) => {
            if (res.cancel) {             
              return
            }
            if (res.confirm) {
              that.setData({
                isPopupVisible:true,
                type: 1,
              })
            }
          }
        })
      }
      else {
        that.setData({
          isPopupVisible:true,
          type: 1,
        })
      }
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
    item.time=timestampToTime(item.time, 0)
  })
};

function transferSingleLubeTime(test) {
  test.runningData[0].deMaintenanceTime=timestampToTime(test.runningData[0].deMaintenanceTime)
  test.runningData[0].ndeMaintenanceTime=timestampToTime(test.runningData[0].ndeMaintenanceTime)
  test.runningData[0].bearingMaintenanceTime=timestampToTime(test.runningData[0].bearingMaintenanceTime)
};