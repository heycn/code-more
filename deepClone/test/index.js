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
  describe('对象', () => {
    it('能够复制普通对象', () => {
      const obj = { name: 'heycn', child: { name: 'small-heycn' } }
      const obj2 = deepClone(obj)
      assert(obj !== obj2)
      assert(obj.name === obj2.name)
      assert(obj.child !== obj2.child)
      assert(obj.child.name === obj2.child.name)
    })
    it('能够复制数组对象', () => {
      const arr = [[11, 12], [21, 22], [31, 32]]
      const arr2 = deepClone(arr)
      assert(arr !== arr2)
      assert(arr[0] !== arr2[0])
      assert(arr[1] !== arr2[1])
      assert(arr[2] !== arr2[2])
      assert.deepEqual(arr, arr2)
    })
    it('能够复制函数', () => {
      const fn = (x, y) => x + y
      fn.xxx = { yyy: { zzz: 1 } }
      const fn2 = deepClone(fn)
      assert(fn !== fn2)
      assert(fn.xxx.yyy.zzz === fn2.xxx.yyy.zzz)
      assert(fn.xxx.yyy !== fn2.xxx.yyy)
      assert(fn.xxx !== fn2.xxx)
      assert(fn(1, 2) === fn2(1, 2))
    })
    it('能够复制环', () => {
      const cycle = { name: 'heycn' }
      cycle.self = cycle
      const cycle2 = deepClone(cycle)
      assert(cycle.name === cycle2.name)
      assert(cycle.self !== cycle2.self)
    })
    xit('不会爆栈', () => {
      const a = { child: null }
      let b = a
      for (let i = 0; i < 100000; i++) {
        b.child = {
          child: null
        }
        b = b.child
      }
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.child !== a2.child)
    })
    it('可以复制正则表达式', () => {
      const reg = new RegExp('hi\\d+', 'gi')
      reg.xxx = { yyy: { zzz: 1 } }
      const reg2 = deepClone(reg)
      assert(reg.source === reg2.source)
      assert(reg.flags === reg2.flags)
      assert(reg !== reg2)
      assert(reg.xxx.yyy.zzz === reg2.xxx.yyy.zzz)
      assert(reg.xxx.yyy !== reg2.xxx.yyy)
      assert(reg.xxx !== reg2.xxx)
    })
    it('可以复制日期', () => {
      const date = new Date()
      date.xxx = { yyy: { zzz: 1 } }
      const date2 = deepClone(date)
      assert(date !== date2)
      assert(date.getTime() === date2.getTime())
      assert(date.xxx.yyy.zzz === date2.xxx.yyy.zzz)
      assert(date.xxx.yyy !== date2.xxx.yyy)
      assert(date.xxx !== date2.xxx)
    })
  })
})
