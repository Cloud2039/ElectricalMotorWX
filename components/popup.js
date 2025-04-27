// components/popup.js
import {timeToTimestamp} from "../utils/common"

const date = new Date()
const years = []
const months = []
const days = []
const hours = []

const reasons = ['到期更换','故障处理','其他']

for (let i = 2020; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = 0; i < 24; i++){
  hours.push(i)
}

Component({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    hours: hours,
    hour: date.getHours(),
    reasons: reasons,
    reason: "",
    myUrl: "",
    index: 0,

    value: [date.getMonth(), date.getDate()-1, date.getHours()],
  },

  properties:{
    visible:{
      type: Boolean,
      value: false
    },
    type: {
      type: Number,
      value: 0,
    },
    motor_id: {
      type: Number,
      value: 0,
    },
    operatorId: {
      type: Number,
      value: 0,
    },
    bearingReferenceTime: {
      type: Number,
      value: 0,
    },
    myUrl: {
      type: String,
      value: "",
    }
  },

  methods: {
      confirm: function() {

        this.triggerEvent('myEvent', {data: this.data.value})
        this.setData({ 
          visible: false,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          timeStamp: transferLubeTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours())
        })

        if(this.data.reason == null || this.data.reason=="") {
          this.setData({
            reason: this.data.reasons[0]
          })
        }

        wx.request({
          url: this.data.myUrl +'/api/motorRepairRecords/addOne?motorId='+this.data.motor_id+'&type='+this.data.type+'&time='+this.data.timeStamp+'&amount='+0+'&referenceTime='+this.data.bearingReferenceTime+'&remark='+this.data.reason + '&operatorId='+wx.getStorageSync('u_operatorID'),
          header: {
            'Authorization': wx.getStorageSync('u_access_token')
          },
          method: "POST",
          success(){
            wx.navigateBack(),
            wx.showToast({
              title: '添加成功',
              icon: 'success'
            })
          },
          fail(res){
            wx.showToast({
              title: '添加失败',
              icon: 'error'
            })
          }
        })
      },
      cancel: function() {
          this.setData({ 
            visible: false,
          }); // 用showPopup变量来控制弹窗显示与否
      },
      
      bindChange: function (e) {
        const val = e.detail.value
        this.setData({
          month: this.data.months[val[0]],
          day: this.data.days[val[1]],
          hour: this.data.hours[val[2]]
        })
      }
  },
})

function transferLubeTime(year, month, day, hour) {
  var timeStamp = timeToTimestamp(year, month, day, hour);
  return timeStamp
};