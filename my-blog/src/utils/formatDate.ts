export default function formatDate(timestamp: any) {
  var arrTimestamp: any = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0'
    }
  }
  timestamp = arrTimestamp.join('') * 1
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - timestamp

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
      return '不久前';
  }
  // 计算差异时间的量级
  var monthC: number = diffValue / month
  var weekC: number = diffValue / (7 * day)
  var dayC: number = diffValue / day
  var hourC: number = diffValue / hour
  var minC: number = diffValue / minute

  // 数值补0方法
  var zero = function (value: number) {
    if (value < 10) {
      return '0' + value
    }
    return value
  };

  // 使用
  if (monthC > 4) {
    // 超过1年，直接显示年月日
    return (function () {
      var date = new Date(timestamp);
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC.toString()) + "月前"
  } else if (weekC >= 1) {
    return parseInt(weekC.toString()) + "周前"
  } else if (dayC >= 1) {
    return parseInt(dayC.toString()) + "天前"
  } else if (hourC >= 1) {
    return parseInt(hourC.toString()) + "小时前"
  } else if (minC >= 1) {
    return parseInt(minC.toString()) + "分钟前"
  }
  return '刚刚';
}

export function formatTime(timestamp: any) {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  let month = time.getMonth() + 1 < 10 ? '0' + time.getMonth() + 1 : time.getMonth() + 1
  let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()

  return year + '年' + month + '月' + date + ' '
}