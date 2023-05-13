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
})
