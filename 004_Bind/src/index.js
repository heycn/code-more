function bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function (...args2) {
    return fn.call(asThis, ...args, ...args2)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
