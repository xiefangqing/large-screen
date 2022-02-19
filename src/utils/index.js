// 防抖
export function debounce (delay, callback) {
  let lastTime
  return function () {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments]
    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
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
