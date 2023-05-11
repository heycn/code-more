const bind = require('../src/index.js')

test1('fn.bind 能用')
test2('this.bind 能用')
test3('this, p1, p2 能用')
test4('this, p1 绑定成功后传 p2 成功')
test5('new 的时候，绑定了 p1, p2')
test6('new 的时候，绑定了 p1, p2, 并且 fn 有 prototype')
test7('不用 new 但是用类似的对象')

function test1(message) {
  Function.prototype.bind2 = bind
  console.assert(Function.prototype.bind2 !== undefined)
  console.log(message)
}

function test2(message) {
  Function.prototype.bind2 = bind
  const fn1 = function () {
    return this
  }
  const newFn1 = fn1.bind2({ name: 'Jack' })
  console.assert(newFn1().name === 'Jack')
  console.log(message)
}

function test3(message) {
  Function.prototype.bind2 = bind
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  const newFn2 = fn2.bind({ name: 'Jack' }, 123, 456)
  console.assert(newFn2()[0].name === 'Jack')
  console.assert(newFn2()[1] === 123)
  console.assert(newFn2()[2] === 456)
  console.log(message)
}

function test4(message) {
  Function.prototype.bind2 = bind
  const fn2 = function (p1, p2) {
    return [this, p1, p2]
  }
  const anotherFn2 = fn2.bind({ name: 'Jack' }, 123)
  console.assert(anotherFn2(456)[0].name === 'Jack')
  console.assert(anotherFn2(456)[1] === 123)
  console.assert(anotherFn2(456)[2] === 456)
  console.log(message)
}

function test5(message) {
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object.p1 === 'x', 'x')
  console.assert(object.p2 === 'y', 'y')
  console.log(message)
}

function test6(message) {
  Function.prototype.bind2 = bind
  const fn = function (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function () { }
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object.p1 === 'x', 'x')
  console.assert(object.p2 === 'y', 'y')
  console.assert(object.__proto__ === fn.prototype)
  console.assert(typeof object.sayHi === 'function')
  console.log(message)
}

function test7(message) {
  Function.prototype.bind2 = bind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function () { };
  const object1 = new fn("a", "b");
  const fn2 = fn.bind2(object1, "x", "y");
  const object = fn2(); // 没有new
  console.assert(object === undefined, "object 为空");
  console.assert(object1.p1 === "x", "x");
  console.assert(object1.p2 === "y", "y");
  console.log(message)
}
