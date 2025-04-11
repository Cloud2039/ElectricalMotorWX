// pages/dat/overview.js
import * as echarts from '../../ec-canvas/echarts';

var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      normal_cnt: wx.getStorageSync('normal_cnt'),
      close_cnt: wx.getStorageSync('close_cnt'),
      over_cnt: wx.getStorageSync('over_cnt'),
      total_cnt: wx.getStorageSync('total_cnt'),

      ec: {
        onInit: function (canvas, width, height, dpr) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(chart);
          chart.setOption(getOption());
  
          return chart;
        }
      },

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
    onLoad() {
      
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
      this.setData({
        normal_cnt: wx.getStorageSync('normal_cnt'),
        close_cnt: wx.getStorageSync('close_cnt'),
        over_cnt: wx.getStorageSync('over_cnt'),
        total_cnt: wx.getStorageSync('total_cnt'),
      })
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
      wx.request({
        url: app.myapp.myweb + '/api/motorRunningData/selectCount',
        header: {
          'Authorization': wx.getStorageSync('u_access_token')
        },
        success:function(res){
          wx.setStorage({
            key: 'normal_cnt',
            data: res.data.data.normal,
          })
          wx.setStorage({
            key: 'close_cnt',
            data: res.data.data.maintenance,
          })
          wx.setStorage({
            key: 'over_cnt',
            data: res.data.data.overdue,
          })
          wx.setStorage({
            key: 'total_cnt',
            data: res.data.data.normal + res.data.data.maintenance + res.data.data.overdue,
          })
        }
      })

      wx.stopPullDownRefresh()
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

function getOption() {
  var normal_cnt = wx.getStorageSync('normal_cnt');
  var close_cnt = wx.getStorageSync('close_cnt');
  var over_cnt = wx.getStorageSync('over_cnt');

  return {
      backgroundColor: "#EFEFEF",
      series: [{
        label: {
          normal:{
            fontSize:20
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 25,
            fontWeight: 'bold'
          }
        },
        color:['#4582fc','#f9513f','#f49a32'],
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['65%', '85%'],
        data: [{
            value: normal_cnt,
            name: '正常'
          }, {
            value: close_cnt,
            name: '超期'
          }, {
            value: over_cnt,
            name: '临期'
          }]
        }]
    }
};