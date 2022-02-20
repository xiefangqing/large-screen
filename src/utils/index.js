// 防抖
export function debounce (callback, delay) {
  let lastTimer
  return function () {
    clearTimeout(lastTimer)
    lastTimer = setTimeout(_ => {
      callback.apply(this, arguments)
    }, delay)
  }
}
// 节流
export function throttle(callback, delay){
  let lastTimer,
      startTime = Date.now()
  return function () {
    clearTimeout(lastTimer)
    const [curTime, args] = [Date.now(), arguments]
    if(curTime - startTime >= delay){
      callback.apply(this, args)
      startTime = curTime
    } else {
      lastTimer = setTimeout(_ => {
        callback.apply(this, args)
      }, delay)
    }
  }
}
// 获取格式化后的时间（y-m-d h:i:s）或星期
export function getFormatTime (isWeek = false) {
  const date = new Date
  if (isWeek) {
    return '星期' + '日一二三四五六'.charAt(date.getDay())
  } else {
    return [
      [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ].join('-'),
      [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      ].join(':')
    ].join(' ').replace(/\b\d\b/g, '0$&')
  }
}
