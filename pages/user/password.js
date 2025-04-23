// pages/user/password.js
var app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        error:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var that = this;
        wx.getStorage({
            key: 'u_id',
            success: function (res) {
                that.setData({
                    uid : res.data
                })
            }    
        })
    },

    //修改用户信息
    modify:function(e){
      var that = this;
      //console.log("用户提交了表单信息")
      console.log(e.detail.value)
      console.log("pwd1=" + e.detail.value.pwd1)
      console.log("pwd2=" + e.detail.value.pwd2)
      console.log(that.data.uid)

      var upwd1 = e.detail.value.pwd1;
      var upwd2 = e.detail.value.pwd2;
      if (upwd1.length > 0 && upwd2.length > 0)
      {
        that.setData({error:""})
        wx.request({
          url: app.myapp.myweb + '/wx_huiyuan_mima_act', 
          success: function (res2) {
            console.log(res2.data)
            if(res2.data.zt=="yes"){
              wx.showToast({
                title: '密码修改成功',
              })
      
              wx.redirectTo({
                url: '/pages/user/index',
              })
            }
            if(res2.data.zt=="no"){
              wx.showToast({
                title: '原始密码错误',
              })                        
            }

          }
        })   
        }else{
          that.setData({ error: "请填写完整的密码信息！"})
        }
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
})