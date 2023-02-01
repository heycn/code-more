const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const deepClone = require('../src/index')

describe('deepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(deepClone)
  })
  it('能够复制基本类型', () => {
    const num = 123
    assert(num === deepClone(num))
    const str = 'string'
    assert(str === deepClone(str))
    const bool = true
    assert(bool === deepClone(bool))
    const und = undefined
    assert(und === deepClone(und))
    const nul = null
    assert(nul === deepClone(nul))
    const sym = Symbol()
    assert(sym === deepClone(sym))
  })
})
