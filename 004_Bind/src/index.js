function bind(asThis, p1, p2) {
  // this 就是函数
  const fn = this
  return function () {
    return fn.call(asThis)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
