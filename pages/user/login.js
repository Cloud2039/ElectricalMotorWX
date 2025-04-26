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
  var constant = "IAC_USR_WEB"
  if (e.detail.value.uname == "" || e.detail.value.upwd ==""){
    that.setData({
      info:"☒请填写用户名和密码！"
    })
  }else{
    //发起登录请求
    console.log("用户名：" + e.detail.value.uname + "  密码：" + e.detail.value.upwd + 
    " " + constant)
    wx.request({
      url: app.myapp.myweb + '/login?username='+e.detail.value.uname+'&password='+e.detail.value.upwd+'&loginType=IAC_USR_WEB',  
      method: 'POST',
      dataType: "json",
      success:function(res){
        console.log("登录返回值：" + res.data + "|status code:" + res.data.code + " message:" + res.data.msg + " " + res.data.access_token)
        if(res.data.code=="200"){
          console.log("✔登录成功")
          that.setData({
            info: "✔登录成功",
            openID: res.data.openId
          })            
              //返回信息写入缓存
              wx.setStorage({
                key: 'u_login',
                data: 'yes',
                success: function () {
                  console.log("写入缓存成功")
                }
              })          
              wx.setStorage({
                key: 'u_name',
                data: res.data.username
              })  
              wx.setStorage({
                key: 'u_operatorID',
                data: res.data.userId
              })
              wx.setStorage({
                key: 'u_keyname',
                data: res.data.phone
              })
              wx.setStorage({
                key: 'u_access_token',
                data: 'Bearer ' + res.data.access_token,
                success:function(){
                  wx.request({
                    url: app.myapp.myweb + '/api/motorRunningData/selectCount',
                    header: {
                      'Authorization': 'Bearer ' + res.data.access_token
                    },
                    success:function(res3){
                      wx.setStorage({
                        key: 'normal_cnt',
                        data: res3.data.data.normal,
                      })
                      wx.setStorage({
                        key: 'close_cnt',
                        data: res3.data.data.maintenance,
                      })
                      wx.setStorage({
                        key: 'over_cnt',
                        data: res3.data.data.overdue,
                      })
                      wx.setStorage({
                        key: 'total_cnt',
                        data: res3.data.data.normal + res3.data.data.maintenance + res3.data.data.overdue,
                      })
                    }
                  })
                  wx.request({
                    url: app.myapp.myweb + '/api/substation/selectByUserId?userId=' + res.data.userId,
                    header: {
                      'Authorization': 'Bearer ' + res.data.access_token
                    },
                    success:function(res2){
                      var tmp_stations = new Array();
                      var tmp_stationIDs = new Array();

                      res2.data.data.forEach(item=>{
                        tmp_stations.push(item.name)
                        tmp_stationIDs.push(item.id)
                      })

                      wx.setStorage({
                        key: 'subStations',
                        data: tmp_stations
                      })
                      wx.setStorage({
                        key: 'subStationIDs',
                        data: tmp_stationIDs
                      })
                    }
                  })
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '/pages/dat/overview',
                    })
                  }, 500)
                }
              })
        }else{
          console.log(res.data.msg)
          that.setData({
            info: "☒" + res.data.msg
          })
        }
      }
    })
  }
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
      // wx.login({
      //   success(res) {
      //     var code = res.code
      //     wx.request({
      //       url: app.myapp.myweb + '/api/wx/getUserInfo',
      //       data: {
      //         code: code
      //       },
      //       method: 'post',
      //       dataType: 'json',
      //       success: function (res) {
      //         console.log(res.data);
      //         if(res.data.openId){
      //           that.setData({
      //             openId: res.data.openId,
      //           });
      //         }
      //         if(res.data.data){
      //           console.log("test");
      //           let data = JSON.parse(res.data.data);
      //           app.globalData.access_token = data.token.access_token;
      //           wx.reLaunch({
      //             url: '/pages/dat/index',
      //           })
      //         }
      //       }
      //     })
      //   }
      // })

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