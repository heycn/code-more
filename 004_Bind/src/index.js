var slice = Array.prototype.slice
function bind(asThis) {
  // this 就是函数
  var args1 = slice.call(arguments, 1)
  var fn = this
  if (typeof fn !== 'function') {
    throw new TypeError('bind 必须调用在函数上')
  }
  return function () {
    var args2 = slice.call(arguments, 0)
    return fn.apply(asThis, args1.concat(args2))
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
