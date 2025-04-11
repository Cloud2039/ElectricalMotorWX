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

    lube_stats_all:         [],
    lube_stats_normal:      [],
    lube_stats_close:       [],
    lube_stats_over:        [],
    current_lube_stats:     [],
    current_lube_dict:      {},

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
    }

    if (e.target.dataset.current == 0) {
      that.setData({
        current_lube_stats: that.data.lube_stats_normal
      })
    }
    else if (e.target.dataset.current == 1) {
      that.setData({
        current_lube_stats: that.data.lube_stats_close
      })
    }
    else if (e.target.dataset.current == 2) {
      that.setData({
        current_lube_stats: that.data.lube_stats_over
      })
    }

    // 对每一个motor_id进行数组编号
    var order=0
    var tmp_dict = {}
    that.data.current_lube_stats.forEach(item=>{
      tmp_dict[item.motor_id]=order
      order=order+1
    })

    that.setData({
      current_lube_dict: tmp_dict
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
      wx.request({
        url: app.myapp.myweb + 'url',
        data:{
          running_stat: e.target.dataset.current
        },
        success:function(res){
          that.setData({bearing_stats:res.data})
        }
      })
    }
  },

  toSpecific: function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/dat/detail?lube',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        var tmp = JSON.stringify(that.data.current_lube_stats[that.data.current_lube_dict[e.currentTarget.dataset.query]])
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: tmp})
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
  onLoad: function () {
    var that = this

    var tmp_lube_stat_normal = new Array();
    var tmp_lube_stat_close = new Array();
    var tmp_lube_stat_over = new Array();

    wx.request({
      url: app.myapp.myweb + '/api/motorBasicData/selectAll/1?page=1&limit=20',
      header: {
        'Authorization': wx.getStorageSync('u_access_token')
      },
      success:function(res){

        if(JSON.stringify(res.data.data) != '{}'){
          transferLubeTime(res.data.data)
          res.data.data.forEach(item=>{
            if(item.runningData[0].motorStatus == 0){
              tmp_lube_stat_normal.push(item);
            }
            else if (item.runningData[0].motorStatus == 1) {
              tmp_lube_stat_close.push(item);
            }
            else if (item.runningData[0].motorStatus == 2) {
              tmp_lube_stat_over.push(item);
            }
          })
        }
        
        // 对每一个motor_id进行数组编号
        var order=0
        var tmp_dict = {}
        tmp_lube_stat_normal.forEach(item=>{
          tmp_dict[item.runningData[0].motorId]=order
          order=order+1
        })

        that.setData(
          {
            lube_stats_all:       res.data.data,
            lube_stats_normal:    tmp_lube_stat_normal,
            lube_stats_close:     tmp_lube_stat_close,
            lube_stats_over:      tmp_lube_stat_over,
            current_lube_stats:   tmp_lube_stat_normal,
            current_lube_dict:    tmp_dict,
          }
        )
      }
    })
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
    var that = this
    var order=0
    var tmp_dict = {}

    if(typeof that.data.currentLubeTab === 'undefined'){
      that.setData({
          currentLubeTab: 0
        }
      )
    }

    if(that.data.currentLubeTab == 0){
      that.data.lube_stats_normal.forEach(item=>{
        tmp_dict[item.runningData[0].motorId]=order
        order=order+1
      })
    }
    else if(that.data.currentLubeTab == 1){
      that.data.lube_stats_close.forEach(item=>{
        tmp_dict[item.runningData[0].motorId]=order
        order=order+1
      })
    }
    else if(that.data.currentLubeTab == 2){
      that.data.lube_stats_over.forEach(item=>{
        tmp_dict[item.runningData[0].motorId]=order
        order=order+1
      })
    }
    
    that.setData(
      {
        current_lube_dict:    tmp_dict,
      }
    )
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
    var that = this

    var tmp_lube_stat_normal = new Array();
    var tmp_lube_stat_close = new Array();
    var tmp_lube_stat_over = new Array();
    console.log(wx.getStorageSync('u_access_token'))

    wx.request({
      url: app.myapp.myweb + '/api/motorBasicData/selectAll/1?page=1&limit=20',
      header: {
        'Authorization': wx.getStorageSync('u_access_token')
      },
      success:function(res){

        if(JSON.stringify(res.data.data) != '{}'){
          transferLubeTime(res.data.data)
          res.data.data.forEach(item=>{
            if(item.runningData[0].motorStatus == 0){
              tmp_lube_stat_normal.push(item);
            }
            else if (item.runningData[0].motorStatus == 1) {
              tmp_lube_stat_close.push(item);
            }
            else if (item.runningData[0].motorStatus == 2) {
              tmp_lube_stat_over.push(item);
            }
          })
        }
        
        // 对每一个motor_id进行数组编号
        var order=0
        var tmp_dict = {}
        tmp_lube_stat_normal.forEach(item=>{
          tmp_dict[item.runningData[0].motorId]=order
          order=order+1
        })

        that.setData(
          {
            lube_stats_all:       res.data.data,
            lube_stats_normal:    tmp_lube_stat_normal,
            lube_stats_close:     tmp_lube_stat_close,
            lube_stats_over:      tmp_lube_stat_over,
            current_lube_stats:   tmp_lube_stat_normal,
            current_lube_dict:    tmp_dict,
          }
        )
      }
    })
    
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
    item.runningData[0].deMaintenanceTime=timestampToTime(item.runningData[0].deMaintenanceTime, 1)
    item.runningData[0].ndeMaintenanceTime=timestampToTime(item.runningData[0].ndeMaintenanceTime, 1)
  })
};