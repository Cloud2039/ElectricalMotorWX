// components/popupLube.js
import {timeToTimestamp} from "../utils/common"

const date = new Date()
const years = []
const months = []
const days = []
const hours = []

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

var app = getApp()

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
    timeStamp: "",
    amount: 0,
    value: [9999, date.getMonth(), date.getDate()-1, date.getHours()],
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
        // wx.request({
        //   url: app.myapp.web +'/wx_test_z',
        //   data: {
        //     motor_id: this.data.motor_id,
        //     type: this.data.type,
        //     time: this.data.timeStamp,
        //     amount: this.data.amount,
        //   }
        // })
      },
      cancel: function() {
          this.setData({ 
            visible: false,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(), 
          }); // 用showPopup变量来控制弹窗显示与否
      },

      bindKeyInput: function (e) {
        this.setData({
          amount: e.detail.value
        })
      },
      
      bindChange: function (e) {
        const val = e.detail.value
        this.setData({
          year: this.data.years[val[0]],
          month: this.data.months[val[1]],
          day: this.data.days[val[2]],
          hour: this.data.hours[val[3]]
        })
      }
  },
})

function transferLubeTime(year, month, day, hour) {
  var timeStamp = timeToTimestamp(year, month, day, hour);
  return timeStamp
};