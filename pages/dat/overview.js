// pages/dat/overview.js
import * as echarts from '../../ec-canvas/echarts';
import {timestampToTime} from "../../utils/common"

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

      search_value:     '',

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

    bindKeyInput: function(e) {
      this.setData({
        search_value: e.detail.value
      })
    },

    searchTest: function() {
      wx.request({
        url: app.myapp.myweb + '/api/motorBasicData/seletById/' + this.data.search_value,
        header: {
          'Authorization': wx.getStorageSync('u_access_token')
        },
        success:function(res1){
          console.log("I came here again haha")
          console.log(res1)
          wx.navigateTo({
            url: '/pages/dat/detail?lube',
            success: function(res2) {
              // 通过eventChannel向被打开页面传送数据
              var tmp = JSON.stringify(that.data.lube_stats_all[that.data.all_lube_dict[res.result]])
              res2.eventChannel.emit('acceptDataFromOpenerPage', {data: tmp})
            }
          })
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
  var total_cnt = wx.getStorageSync('total_cnt')

  return {
      backgroundColor: "#FFFFFF",
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
        color:['#4582fc','#f49a32','#f9513f'],
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['58%', '75%'],
        data: [{
            value: normal_cnt,
            name: '正常'
          }, {
            value: close_cnt,
            name: '待维护'
          }, {
            value: over_cnt,
            name: '超期'
          }]
        }],
        graphic: { // 使用 graphic 组件添加自定义文本
          elements: [
              {
                  type: 'text', // 文本
                  left: 'center', // 水平居中
                  top: 'center', // 垂直居中
                  style: {
                      text: total_cnt+"个", // 显示的文字内容
                      font: '30px Microsoft YaHei', // 字体样式
                      fill: '#000000' // 字体颜色
                  }
              }
          ]
      }
    }
};

function transferSingleLubeTime(test) {
  test.runningData[0].deMaintenanceTime=timestampToTime(test.runningData[0].deMaintenanceTime)
  test.runningData[0].ndeMaintenanceTime=timestampToTime(test.runningData[0].ndeMaintenanceTime)
  test.runningData[0].bearingMaintenanceTime=timestampToTime(test.runningData[0].bearingMaintenanceTime)
};