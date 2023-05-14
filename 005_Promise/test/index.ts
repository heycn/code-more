// @ts-nocheck
import chai from 'chai'
import { assert } from 'chai'
import { describe } from 'mocha'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Promise from '../src'

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it("new Promise() 如果接受的不是一个函数就报错", () => {
    assert.throw(() => new Promise())
    assert.throw(() => new Promise(1))
    assert.throw(() => new Promise('1'))
    assert.throw(() => new Promise(false))
  })
  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })
  it("new Promise(fn) 中的 fn 是立即执行的", () => {
    const fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })
  it("new Promise(fn) 中的 fn 接受两个函数作为参数", done => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })
  it("promise.then 中的 success 会在 resolve 被调用的时候执行", done => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })
    promise.then(success)
  })
  it("promise.then 中的 fail 会在 reject 被调用的时候执行", done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject()
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      })
    })
    promise.then(null, fail)
  })
  it("2.2.1.1 如果 onFulfilled 不是函数，则必须忽略它", () => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(false, null)
    assert(1 === 1)
  })
  it("2.2.1.2 如果 onRejected 不是函数，则必须忽略它", () => {
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    promise.then(null, false)
    assert(1 === 1)
  })
  it("2.2.2 中的 3 个规范", done => {
    const succeed = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(succeed.called)
      resolve(233)
      resolve(2333)
      setTimeout(() => {
        assert(promise.state === 'fulfilled')
        assert.isTrue(succeed.calledOnce)
        assert(succeed.calledWith(233))
        done()
      }, 0)
    })
    promise.then(succeed)
  })
  it("2.2.3 在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 或 onRejected", done => {
    const succeed = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(succeed)
    assert.isFalse(succeed.called)
    setTimeout(() => {
      assert.isTrue(succeed.called)
      done()
    }, 0)
  })
  it("2.2.4 在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 或 onRejected", done => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    promise.then(null, fail)
    assert.isFalse(fail.called)
    setTimeout(() => {
      assert.isTrue(fail.called)
      done()
    }, 0)
  })
  it("2.2.5 onFulfilled 和 onRejected 必须作为函数调用（即没有 this 值）", done => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    promise.then(function() {
      "use strict"
      assert(this === undefined)
      done()
    }
    )
  })
  it("2.2.6.1 then 可能会在同一个 promise 上被多次调用，当 fulfilled 时，onFulfilled 的所有回调必须按照原始的调用顺序执行", done => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
  it("2.2.6.2 then 可能会在同一个 promise 上被多次调用，当 rejected 时，onFulfilled 的所有回调必须按照原始的调用顺序执行", done => {
    const promise = new Promise((resolve, reject) => {
      reject()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
  it("2.2.7 then 必须返回一个 Promise", () => {
    const promise = new Promise((resolve, reject) => {
      resolve()
    })
    const promise2 = promise.then(() => {}, () => {})
    assert(promise2 instanceof Promise)
  })
  it("2.2.7.1 如果 onFulfilled 或 onRejected 返回值 x ，运行 [[Resolve]](promise2, x)", done => {
    const promise1 = new Promise((resolve, reject) => {
      resolve()
    })
    promise1.then(() => "成功", () => {}).then(result => {
      assert.equal(result, "成功")
      done()
    })
  })
  it("2.2.7.1.2 x 是一个 Promise 实例", done => {
    const promise1 = new Promise((resolve, reject) => {
      resolve()
    })
    const fn = sinon.fake()
    const promise2 = promise1.then(() => new Promise(resolve => resolve()))
    promise2.then(fn)
    setTimeout(() => {
      assert(fn.called)
      done()
    })
  })
  it("2.2.7.1.2 x 是一个 Promise 实例，且失败了", done => {
    const promise1 = new Promise((resolve, reject) => {
      resolve()
    })
    const fn = sinon.fake()
    const promise2 = promise1.then(() => new Promise((resolve, reject) => reject()))
    promise2.then(null, fn)
    setTimeout(() => {
      assert(fn.called)
      done()
    })
  })
})
