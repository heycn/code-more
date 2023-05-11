function bind(asThis, ...args) {
  // this 就是函数
  var fn = this
  if (typeof fn !== 'function') {
    throw new TypeError('bind 必须调用在函数上')
  }
  return function (...args2) {
    return fn.call(asThis, ...args, ...args2)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
