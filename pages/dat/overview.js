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

      ecDailyBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);
          barChart.setOption(getDailyBarOption());
  
          return barChart;
        }
      },
  
      ecMonthlyBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);
          barChart.setOption(getMonthlyBarOption());
  
          return barChart;
        }
      },

      ecYearlyBar: {
        onInit: function (canvas, width, height, dpr) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(barChart);
          barChart.setOption(getYearlyBarOption());
  
          return barChart;
        }
      },

      ecMonthlyLine: {
        onInit: function (canvas, width, height, dpr) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(chart);
          chart.setOption(getMonthlyLineOption());
  
          return chart;
        }
      },

      ecYearlyLine: {
        onInit: function (canvas, width, height, dpr) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(chart);
          chart.setOption(getYearlyLineOption());
  
          return chart;
        }
      },

      currentTableTab:           2,
      currentTableTab2:          0,

      markers: [
        {
          id: 1,
          latitude: '39.177759', 
          longitude: '117.363767'
        },
        {
          id: 2,
          latitude: '30.51667',
          longitude: '114.31667'
        },
        {
          id: 3,
          latitude: '29.995051',
          longitude: '112.574526'
        }
      ],
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

    slideTable2: function(e) {
      var that = this;
      that.setData({
        currentTableTab2: e.detail.current
      })
    },
  
    swichTable2: function(e) {
      var that = this;
      if (this.data.currentTableTab2 === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTableTab2: e.target.dataset.current
        })
      }
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

function getOption() {
  var normal_cnt = 18;
  var abnormal_cnt = 2;
  var offline_cnt = 1;
  var wait_cnt = 1;

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
        color:['#4080ff','#ff0000','#c0c0c0','#ffff00'],
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
            name: '异常'
          }, {
            value: offline_cnt,
            name: '离线'
          }, {
            value: wait_cnt,
            name: '待建'
          }]
        }]
    }
};

function getDailyBarOption() {
    return {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14',
        '15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 500, 80, 70, 110, 130,
            120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        }
      ]
    }
};

function getMonthlyBarOption() {
    return {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1200, 2000, 1500, 800, 710, 1101, 1301, 1200, 2000, 5000, 800, 700],
          type: 'bar',
        }
      ]
    }
};

function getYearlyBarOption() {
    return {
      legend:{
        data:['充电量','放电量']
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:     '充电量',
          bargap:    0,
          emphasis: {
            focus: 'series'
          },
          data:     [12000, 20000, 15000, 8000, 9000],
          type:     'bar',
        },
        {
          name:     '放电量',
          bargap:    0,
          emphasis:{
            focus: 'series'
          },
          data:     [15000, 25000, 17500, 1000, 2000],
          type:     'bar',
        }
      ]
    }
};

function getMonthlyLineOption() {
  return {
    grid:{
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12']
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [
      {
        data: [1200, 2000, 1500, 800, 710, 1101, 1301, 1200, 2000, 5000, 800, 700],
        type: 'line',
        smooth: true,
        name: '收益',
      }
    ]
  }
};

function getYearlyLineOption() {
  return {
    grid:{
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2020', '2021', '2022', '2023', '2024']
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [
      {
        data: [1200, 2000, 1500, 800, 710],
        smooth: true,
        name: '收益',
        type: 'line',
      }
    ]
  }
};