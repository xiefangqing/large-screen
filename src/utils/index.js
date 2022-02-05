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
