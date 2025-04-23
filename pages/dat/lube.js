// pages/dat/bearing.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      motor_id:         0,
      positionNum:      "",
      location:         "",
      name:             "",
      amount:           0,
      deReferenceTime:  0,
      ndeReferenceTime: 0,
      operatorId:       0,
      url:              "",
      type:             0,
      accessoryList:    {},
      accessoryName:    {},

      isPopupVisible:   false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this
    
      that.setData({
        motor_id: options.motor_id,
        positionNum: options.positionNum,
        location: options.location,
        name: options.name,
        amount: options.amount,
        deReferenceTime: options.deReferenceTime,
        ndeReferenceTime: options.ndeReferenceTime,
        operatorId: wx.getStorageSync('u_operatorID'),
        url: app.myapp.myweb,
      })

      wx.request({
        url: app.myapp.myweb + '/api/accessory/listByType?type=0',
        header: {
          'Authorization': wx.getStorageSync('u_access_token')
        },
        success:function(res){
          var tmp_array = new Array()
          res.data.data.forEach(item=>{
            tmp_array.push(item.model)
          })
          that.setData({
            accessoryList: res.data.data,
            accessoryName: tmp_array,
          })
        }
      })
    },

    myEvent: function(e) {
      console.log(e.detail.date)
    },

    popupDeLube: function(){
      var that = this

      that.setData({
        isPopupVisible:true,
        type: 0,
      })
    },

    popupNdeLube: function(){
      var that = this

      that.setData({
        isPopupVisible:true,
        type: 1,
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