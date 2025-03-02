// pages/dat/overview.js

import * as echarts from '../../ec-canvas/echarts';

Page({

    /**
     * 页面的初始数据
     */
    data: {
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
  var normal_cnt = 18;
  var abnormal_cnt = 2;
  var offline_cnt = 1;

  return {
      backgroundColor: "#000000",
      series: [{
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        color:['#4080ff','#ff0000','#c0c0c0'],
        labelLine:{
          show:false
        },
        type: 'pie',
        center: ['40%', '50%'],
        radius: ['50%', '85%'],
        data: [{
            value: normal_cnt,
            name: '正常'
          }, {
            value: abnormal_cnt,
            name: '超期'
          }, {
            value: offline_cnt,
            name: '临期'
          }]
        }]
    }
};