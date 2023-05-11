const bind = require('../src/index.js')

Function.prototype.bind = bind
console.assert(Function.prototype.bind === bind)
