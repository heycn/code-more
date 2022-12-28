import { EventHub } from '../src/index'

type TestCase = (message: string) => void

const test1: TestCase = message => {
  const eventHub = new EventHub()
  console.assert(eventHub instanceof Object === true, 'eventHub 是一个对象')
  console.log(message)
}

const test2: TestCase = message => {
  // on emit
  const eventHub = new EventHub()
  let called = false
  eventHub.on('xxx', data => {
    called = true
    console.assert(data[0] === '接受的数据1')
    console.assert(data[1] === '接受的数据2')
  })
  eventHub.emit('xxx', ['接受的数据1', '接受的数据2'])
  console.assert(called)
  console.log(message)
}

const test3: TestCase = message => {
  const eventHub = new EventHub()
  let called = false
  const fn1 = () => {
    called = true
  }

  eventHub.on('yyy', fn1)
  eventHub.off('yyy', fn1)
  eventHub.emit('yyy')
  console.assert(called === false)
  console.log(message)
}

test1('EventHub 可以创建对象')
test2('.on 之后 .emit 会触发 .on 的函数')
test3('.off 是有用的')
