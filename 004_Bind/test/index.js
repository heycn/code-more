const bind = require('../src/index.js')

Function.prototype.bind = bind
console.assert(Function.prototype.bind === bind)

const fn1 = function () {
  return this
}

const newFn1 = fn1.bind({ name: 'Jack' })
console.assert(newFn1().name === 'Jack')
