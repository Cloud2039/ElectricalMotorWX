// pages/dat/bms.js
import * as echarts from '../../ec-canvas/echarts';

var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      ecSingleBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);
          barChart.setOption(getSingleBarOption());
  
          return barChart;
        }
      },
  
      ecAcumBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);
          barChart.setOption(getAcumBarOption());
  
          return barChart;
        }
      },

      currentTableTab:        0,
      windowHeight : wx.getStorageSync('windowHeight')+'px',

      multiArray: [['并网点1', '并网点2'], ['BMS1', 'BMS2']],
      multiIndex: [0, 0],

      SOH:          79,
      run_stat:       0,
      lock:           1,
      no_charge:      0,
      no_discharge:   0,
      api_url : app.myapp.myweb
    },

    slideTable: function(e) {
      var that = this;
      that.setData({
        currentTableTab: e.detail.current
      })
    },
  
    swichTable: function(e) {
      var that = this;
      if (this.data.currentTableTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTableTab: e.target.dataset.current
        })
      }
    },

    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    },

    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      this.setData(data);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

function getSingleBarOption() {
  return {
    xAxis: {
      type: 'category',
      data: ['充电', '放电']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          {
            value:1200,
            itemStyle:{
              color: '#00c0a0'
            }
          },
          {
            value:200,
            itemStyle:{
              color: '#4080ff'
            }
          }
        ],
        type: 'bar'
      }
    ]
  }
};

function getAcumBarOption() {
  return {
    xAxis: {
      type: 'category',
      data: ['充电', '放电']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [{
          value:240000,
          itemStyle:{
            color: '#00c0a0'
          }
        },
        {
          value:12000,
          itemStyle:{
            color: '#4080ff'
          }
        }],
        type: 'bar'
      },
    ]
  }
};