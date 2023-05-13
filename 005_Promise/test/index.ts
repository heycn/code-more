import { assert } from 'chai'
import { describe } from 'mocha'
import Promise from '../src'

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
})
