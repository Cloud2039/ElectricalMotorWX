//获取应用实例
var app = getApp()


Page({

  /**
    * 页面的初始数据
  */
  data: {
    str_u_login:"",
    str_u_id:"",
    str_u_flid:"",
    str_u_name:"",
    lianjie_xianshi:false, //是否显示跳转到用户中心的链接
    info:"请准确填写账号信息，有问题联系客服",
    openID: "",
  },

//普通登录
formSubmit:function(e){
  var that = this
  if (e.detail.value.uname == "" || e.detail.value.upwd ==""){
    that.setData({
      info:"☒请填写用户名和密码！"
    })
  }else{
    //发起登录请求
    console.log("用户名：" + e.detail.value.uname + " | 密码：" + e.detail.value.upwd)
    wx.request({
      url: app.myapp.myweb + '/login',  
      data:{
        username: e.detail.value.uname,
        password: e.detail.value.upwd,
        loginType: 'IAC_USR_WEB',
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'dataType': 'json',
      },
      method:"POST",
      success:function(res){
        console.log("登录返回值：" + res.data + "|zt=" + res.data.code + "status" + res.data.message)
        if(res.data.code=="200"){
          console.log("✔登录成功")
          that.setData({
            info: "✔登录成功",
            openID: res.data.openId
          })            
              //返回信息写入缓存
              console.log(res.data.name);
              wx.setStorage({
                key: 'u_login',
                data: 'yes',
                success: function () {
                  console.log("写入缓存成功")
                }
              })          
              wx.setStorage({
                key: 'u_name',
                data: res.data.name
              })  
              wx.setStorage({
                key: 'u_keyname',
                data: res.data.phone
              })
              wx.setStorage({
                key: 'u_role_id',
                data: res.data.role_id
              })
              wx.setStorage({
                key: 'u_id',
                data: res.data.uid,
                success:function(){
                  wx.reLaunch({
                    url: '/pages/dat/index',
                  })
                }
              })
        }else{
          console.log("WTF")
          console.log(res.data.message)
          that.setData({
            info: "☒" + res.data.xinxi
          })
        }
      }
    })
  }
},

    toHuiyuan:function() {
        wx.navigateTo({
          url: '/pages/user/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log("onload")
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
      console.log("onShow")
      wx.login({
        success(res) {
          var code = res.code
          wx.request({
            url: app.myapp.myweb + '/api/wx/getUserInfo',
            data: {
              code: code
            },
            method: 'post',
            dataType: 'json',
            success: function (res) {
              console.log(res.data);
              if(res.data.openId){
                that.setData({
                  openId: res.data.openId,
                });
              }
              if(res.data.data){
                console.log("test");
                let data = JSON.parse(res.data.data);
                app.globalData.access_token = "Bearer " + data.token.access_token;
                wx.reLaunch({
                  url: '/pages/dat/index',
                })
              }
            }
          })
        }
      })

      wx.getStorage({
        key: 'u_login',
        success:function(res){
          if(res.data == "yes"){
            wx.redirectTo({
              url: '/pages/user/index',
            })
          }
        }
      })
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