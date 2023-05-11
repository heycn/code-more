const bind = require('../src/index.js')

Function.prototype.bind = bind
console.assert(Function.prototype.bind === bind)

const fn1 = function () {
  return this
}
const newFn1 = fn1.bind({ name: 'Jack' })
console.assert(newFn1().name === 'Jack')

const fn2 = function (p1, p2) {
  return [this, p1, p2]
}
const newFn2 = fn2.bind({ name: 'Jack' }, 123, 456)
console.assert(newFn2()[0].name === 'Jack')
console.assert(newFn2()[1] === 123)
console.assert(newFn2()[2] === 456)