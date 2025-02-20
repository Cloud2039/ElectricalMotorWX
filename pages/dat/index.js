
import * as echarts from '../../ec-canvas/echarts';

//获取应用实例
var app = getApp()

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

    ecChargeBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getChargeBarOption());

        return barChart;
      }
    },

    currentTableTab:        0,
    currentTab:             0,

    charge:                 500,
    discharge:              700,

    today_revenue:          5000,
    yesterday_revenue:      4700,

    total_revenue:          1000000.00,

    today_charge:           50,
    today_discharge:        100,
    accumulated_charge:     150,
    accumulated_discharge:  200,
    rt_p:                   250,
    rt_var:                 300,
    today_chandis_cnt:      350,
    month_chandis_cnt:      400,
    station_stat:           "正常",
    SOC:                    19,
    chargeable:             450,
    dischargeable:          500,

    poc_cnt:                2,
    poc_warning:            50,
    firehydrant_cnt:        100,
    firehydrant_warning:    200,
    bms_cnt:                5,
    bms_warning:            10,
    pcs_cnt:                20,
    pcs_warning:            40,

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

  slideTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  swichTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.request({
    //   url: app.myapp.myweb+ '/pcs/faultCounts',
    //   success:function(res){
    //     console.log("Cuiby, this is what you came for")
    //     console.log(res.data)
    //     // wx.setStorage({
    //     //   key: 'charge',
    //     //   data: res.data
    //     // }) 
    //     // wx.setStorage({
    //     //   key: 'discharge',
    //     //   data: res.data
    //     // })  
    //     // that.setData({

    //     // })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setStorage({
      key: 'charge',
      data: 500,
    }) 
    wx.setStorage({
      key: 'discharge',
      data: 700,
    })  
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

function getOption() {
  var charge = wx.getStorageSync('charge');
  var discharge = wx.getStorageSync('discharge');

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
          color:['#00c0a0','#4080ff'],
          labelLine:{
            show:false
          },
          type: 'pie',
          center: ['40%', '50%'],
          radius: ['50%', '85%'],
          data: [{
            value: charge,
            name: '今日充电量'
          }, {
            value: discharge,
            name: '今日放电量'
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
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
        }
      ]
    }
};

function getChargeBarOption() {
  return {
    title:{
      text: '充放电量',
      color: '#333',
      fontStyle: 'italic',
      fontSize: '18'
    },
    legend:{
      data:['充电量','放电量']
    },
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5','6','7','8','9','10',
      '11', '12', '13', '14', '15','16','17','18','19','20',
      '21', '22', '23', '24', '25','26','27','28','29','30']
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
        data:     [1200, 2000, 1500, 800, 900, 1200, 2000, 1500, 800, 900,
          1200, 2000, 1500, 800, 900, 1100, 2100, 1600, 850, 970,
          1200, 2000, 1500, 800, 900, 1200, 2000, 1500, 700, 1000],
        type:     'bar',
      },
      {
        name:     '放电量',
        bargap:    0,
        emphasis:{
          focus: 'series'
        },
        data:     [1500, 2500, 1750, 100, 200, 1500, 2500, 1750, 100, 200,
          1500, 2500, 1750, 100, 200, 1500, 2500, 1750, 100, 200,
          1500, 2500, 1750, 100, 200, 1500, 2500, 1750, 100, 200],
        type:     'bar',
      }
    ]
  }
};