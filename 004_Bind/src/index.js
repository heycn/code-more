function bind(asThis, p1, p2) {
  // this 就是函数
  return function () { }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
