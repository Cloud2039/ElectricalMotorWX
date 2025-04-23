// components/popupLube.js
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
    timeStamp: "",
    reasons: reasons,
    reason: "",
    myUrl: "",
    index: 0,
    accessoryList: {},
    accessoryName: {},
    accessoryId: -1,
    index1: 0,

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
    },
    operatorId: {
      type: Number,
      value: 0,
    },
    deReferenceTime: {
      type: Number,
      value: 0,
    },
    ndeReferenceTime: {
      type: Number,
      value: 0,
    },
    amount: {
      type: Number,
      value: 0,
    },
    accessoryList: {
      type: Array,
      value: {}, 
    },
    accessoryName: {
      type: Array,
      value: {},
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

        //如果不选的话作为默认选项直接上传，不然会传空值
        if(this.data.accessoryId == null || this.data.accessoryId==-1) {
          this.setData({
            accessoryId: this.data.accessoryList[0].id
          })
        }

        if(this.data.reason == null || this.data.reason=="") {
          this.setData({
            reason: this.data.reasons[0]
          })
        }

        if(this.data.type == 0) {
          wx.request({
            url: this.data.myUrl +'/api/motorRepairRecords/addOne?motorId='+this.data.motor_id+'&type='+this.data.type+'&time='+this.data.timeStamp+'&amount='+this.data.amount+'&referenceTime='+this.data.deReferenceTime+'&accessoryId='+this.data.accessoryId+'&remark='+this.data.reason+'&operatorId='+wx.getStorageSync('u_operatorID'),
            header: {
              'Authorization': wx.getStorageSync('u_access_token')
            },
            method: "POST",
            success(res){
              console.log("hell yea")
              console.log(res.data)
            }
          })
        }
        else if (this.data.type == 1) {
          wx.request({
            url: this.data.myUrl +'/api/motorRepairRecords/addOne?motorId='+this.data.motor_id+'&type='+this.data.type+'&time='+this.data.timeStamp+'&amount='+this.data.amount+'&referenceTime='+this.data.ndeReferenceTime+'&accessoryId='+this.data.accessoryId+'&remark='+this.data.reason+'&operatorId='+wx.getStorageSync('u_operatorID'),
            header: {
              'Authorization': wx.getStorageSync('u_access_token')
            },
            method: "POST",
            success(res){
              console.log("hell yea")
              console.log(res.data)
            }
          })
        }  
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

      bindPickerChange: function(e) {
        this.setData({
          index: e.detail.value,
          reason: reasons[e.detail.value],
        })
      },

      bindPickerChange1: function(e) {
        this.setData({
          index1: e.detail.value,
          accessoryId: this.data.accessoryList[e.detail.value].id,
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