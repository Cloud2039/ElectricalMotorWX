// components/popup.js
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
    value: [9999, date.getMonth(), date.getDate()-1, date.getHours()],
  },

  properties:{
    visible:{
      type: Boolean,
      value: false
    }
  },

  methods: {
      confirm: function() {
        this.triggerEvent('myEvent', {data: this.data.value})
        this.setData({ visible: false })
      },
      cancel: function() {
          this.setData({ visible: false }); // 用showPopup变量来控制弹窗显示与否
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