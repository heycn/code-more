function bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function () {
    return fn.call(asThis, ...args)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
