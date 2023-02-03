const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const DeepCloner = require('../src/index')

describe('deepClone', () => {
  it('是一个类', () => {
    assert.isFunction(DeepCloner)
  })
  it('能够复制基本类型', () => {
    const num = 123
    assert(num === new DeepCloner().clone(num))
    const str = 'string'
    assert(str === new DeepCloner().clone(str))
    const bool = true
    assert(bool === new DeepCloner().clone(bool))
    const und = undefined
    assert(und === new DeepCloner().clone(und))
    const nul = null
    assert(nul === new DeepCloner().clone(nul))
    const sym = Symbol()
    assert(sym === new DeepCloner().clone(sym))
  })
  describe('对象', () => {
    it('能够复制普通对象', () => {
      const obj = { name: 'heycn', child: { name: 'small-heycn' } }
      const obj2 = new DeepCloner().clone(obj)
      assert(obj !== obj2)
      assert(obj.name === obj2.name)
      assert(obj.child !== obj2.child)
      assert(obj.child.name === obj2.child.name)
    })
    it('能够复制数组对象', () => {
      const arr = [[11, 12], [21, 22], [31, 32]]
      const arr2 = new DeepCloner().clone(arr)
      assert(arr !== arr2)
      assert(arr[0] !== arr2[0])
      assert(arr[1] !== arr2[1])
      assert(arr[2] !== arr2[2])
      assert.deepEqual(arr, arr2)
    })
    it('能够复制函数', () => {
      const fn = (x, y) => x + y
      fn.xxx = { yyy: { zzz: 1 } }
      const fn2 = new DeepCloner().clone(fn)
      assert(fn !== fn2)
      assert(fn.xxx.yyy.zzz === fn2.xxx.yyy.zzz)
      assert(fn.xxx.yyy !== fn2.xxx.yyy)
      assert(fn.xxx !== fn2.xxx)
      assert(fn(1, 2) === fn2(1, 2))
    })
    it('能够复制环', () => {
      const cycle = { name: 'heycn' }
      cycle.self = cycle
      const cycle2 = new DeepCloner().clone(cycle)
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
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a.child !== a2.child)
    })
    it('可以复制正则表达式', () => {
      const reg = new RegExp('hi\\d+', 'gi')
      reg.xxx = { yyy: { zzz: 1 } }
      const reg2 = new DeepCloner().clone(reg)
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
      const date2 = new DeepCloner().clone(date)
      assert(date !== date2)
      assert(date.getTime() === date2.getTime())
      assert(date.xxx.yyy.zzz === date2.xxx.yyy.zzz)
      assert(date.xxx.yyy !== date2.xxx.yyy)
      assert(date.xxx !== date2.xxx)
    })
    it('自动跳过原型属性', () => {
      const obj = Object.create({ name: 'heycn' })
      obj.xxx = { yyy: { zzz: 1 } }
      const obj2 = new DeepCloner().clone(obj)
      assert(obj !== obj2)
      assert.isFalse('name' in obj2)
      assert(obj.xxx.yyy.zzz === obj2.xxx.yyy.zzz)
      assert(obj.xxx.yyy !== obj2.xxx.yyy)
      assert(obj.xxx !== obj2.xxx)
    })
    it('可以复制很复杂的对象', () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: '',
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: '',
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: '',
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ]
      }
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert.isNaN(a2.n)
      assert(a.n2 === a2.n2)
      assert(a.s === a2.s)
      assert(a.bool === a2.bool)
      assert(a.null === a2.null)
      assert(a.u === a2.u)
      assert(a.sym === a2.sym)
      assert(a.o !== a2.o)
      assert.isNaN(a2.o.n)
      assert(a.o.n2 === a2.o.n2)
      assert(a.o.s === a2.o.s)
      assert(a.o.bool === a2.o.bool)
      assert(a.o.null === a2.o.null)
      assert(a.o.u === a2.o.u)
      assert(a.o.sym === a2.o.sym)
      assert(a.array !== a2.array)
      assert(a.array[0] !== a2.array[0])
      assert.isNaN(a2.array[0].n)
      assert(a.array[0].n2 === a2.array[0].n2)
      assert(a.array[0].s === a2.array[0].s)
      assert(a.array[0].bool === a2.array[0].bool)
      assert(a.array[0].null === a2.array[0].null)
      assert(a.array[0].u === a2.array[0].u)
      assert(a.array[0].sym === a2.array[0].sym)
    })
  })
})
