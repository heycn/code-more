# EventHub

## 一、`EventHub` 是什么

- `EventHub` 又叫 `发布/ 订阅模式`，是用于多个模块之间进行通信的
- 比如我们有两个文件，分别是：`1.js` 和 `2.js`
- `1.js` 里有一个函数 `fn1`，`2.js` 里有个函数 `fn2`
- `fn1` 想要调佣 `fn2`，怎么才能做到呢？
- 如果不用全局变量，那我们就可以使用 `EventHub`
- 那么就可以这么写：
  ```js
  // 1.js
  // 发布
  fn1 = () => {
    eventhub.emit('轮到fn2') // 调用 '轮到fn2' 事件，eventhub 会通知注册 '轮到fn2' 事件的模块
  }

  // 2.js
  // 订阅
  eventhub.on('轮到fn2', () => {
    // 注册/监听 '轮到fn2' 事件
    fn2()
  })
  ```

## 二、确定 API

> 先确认各个 API 的功能，再去实现，再去写代码

### API 列表

> 为什么我用井号？因为 `EventHub` 是一个类，井号表示是一个对象的属性

- EventHub#on

  > 注册/监听事件

- EventHub#off
  > 取消事件
- EventHub#emit
  > 触发事件

## 三、源码书写过程

> 采用测试驱动开发：添加测试用例，想办法让测试通过\
> 不使用库，而是用非常简单的 `console` 方式\
> 需要全局安装 `ts-node@8.3.0`

### 1. 在根目录下创建 `test/index.ts` 和 `src/index.ts`

```ts
// src/index.ts
export class EventHub {}
```

```ts
// test/index.ts
import { EventHub } from '../src/index'
const eventhub = new EventHub()
console.assert(eventHub instanceof Object === true, 'eventHub 是一个对象')
```

然后在当前目录下执行 `ts-node test/index.ts`，如果没有报错，则测试通过

### 2. `on` 和 `emit`

#### 添加测试用例 `on` 和 `emit`

```ts
// test/index.ts
import { EventHub } from '../src/index'
const eventhub = new EventHub()

let called = false
eventhub.on('xxx', () => {
  called = true
  console.log('called:' + called)
})
eventhub.emit('xxx')
```

#### 实现 `on` 和 `emit`

1. `on` 接受两个参数，第一个是 `事件名`、第二个是一个 `回调事件`
2. `emit` 接受一个参数，为 `事件名`
3. `on`：当有人订阅了事件之后，我们需要把 `事件名` 和 `事件回调` 存在一个 `map` 里，这里我放在 `cache` 这个对象
   ```ts
   // cache 的数据结构
   cache = {
     事件1: [fn1, fn2, fn3],
     事件2: [fn1, fn2, fn3]
   }
   ```
4. `emit`：触发 `事件回调`，读取事件名相对应的函数，并且依次调用这些函数

```ts
// src/index.ts
export class EventHub {
  cache = {}
  on(eventName, fn) {
    // cache 可能为空，所以需要对这个 cache 初始化：如果 eventName 没有出现过，就初始化成一个数组
    if (this.cache[eventName] === undefined) {
      this.cache[eventName] = []
    }
    // 然后把函数放进数组里
    const array = this.cache[eventName]
    array.push(fn)
  }
  emit(eventName) {
    // 读取 eventName 相对应的函数，但可能 cache 里不存在 eventName，就把他变成一个空数组，所以不管怎么样都是个数组，我们就可以去遍历它
    let array = this.cache[eventName]
    if (array === undefined) {
      array = []
    }
    array.forEach(fn => {
      fn()
    })
  }
}
```

运行 `ts-node test/index.ts`，如果控制台输出 `called:true` 那么就测试通过

### 3. 优化代码

```diff
export class EventHub {
  cache = {}
  on(eventName, fn) {
-   if (this.cache[eventName] === undefined) {
-     this.cache[eventName] = []
-   }
+   this.cache[eventName] = this.cache[eventName] || []
-   const array = this.cache[eventName]
-   array.push(fn)
+   this.cache[eventName].push
  }
  emit(eventName) {
-   let array = this.cache[eventName]
-   if (array === undefined) {
-     array = []
-   }
-   let array = this.cache[eventName] || []
-   array.forEach(fn => {
-     fn()
-   })
+   (this.cache[eventName] || []).forEach(fn => fn())
  }
}
```

运行 `ts-node test/index.ts`，如果不报任何错误，则测试通过

### 4. 实现 `emit` 的第二个参数

#### 添加测试用例

```ts
// test/index.ts
import { EventHub } from '../src/index'
const eventhub = new EventHub()

let called = false
eventhub.on('xxx', data => {
  called = true
  console.log('called:' + called)
  console.assert(data === '接受的数据') // 断言 data 和函数接受的数据相等
})
eventhub.emit('xxx', '接受的数据') // 第二个参数接受数据
```

#### 实现功能

很简单，把 `接受的数据` 传给每一个函数即可

```ts
// src/index.ts
export class EventHub {
  cache = {}
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push
  }
  emit(eventName, data?) {
    // 把接收的数据传给每一个函数就可以了
    (this.cache[eventName] || []).forEach(fn => fn(data))
  }
```

运行 `ts-node test/index.ts`，如果不报任何错误，则测试通过

### 5. 实现 `off`

#### 测试用例

想象在淘宝买东西：我下单后，在发货前，马上取消订单，这样子货就不会送到家里

```ts
// test/index.ts
import { EventHub } from '../src/index'
const eventhub = new EventHub()

let called = false
eventhub.on('xxx', data => {
  called = true
  console.log('called:' + called)
  console.assert(data === '接受的数据')
})
eventhub.emit('xxx', '接受的数据')

const eventHub2 = new EventHub()
let called2 = false
const fn1 = () => {
  called2 = true
}
eventHub.on('yyy', fn1)
eventHub.off('yyy', fn1) // 顺序非常重要，要在订阅之后(发布之前)马上取消
eventHub.emit('yyy')
setTimeout(() => {
  console.log(called2) // 如果值为 false，则测试通过
}, 1000)
```

#### 实现功能

把 `map` 里相对应的函数删掉

```ts
// src/index.ts
export class EventHub {
  cache = {}
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push
  }
  emit(eventName, data?) {
    ;(this.cache[eventName] || []).forEach(fn => fn(data))
  }
  off(eventName, fn) {
    // 把 fn 从 this.cache[eventName] 里删掉
    this.cache[eventName] = this.cache[eventName] || []
    let index = undefined
    for (let i = 0; i < this.cache[eventName].length; i++) {
      if (this.cache[eventName][i] === fn) {
        index = i
        break
      }
    }
    if ((index = undefined)) {
      return
    } else {
      this.cache[eventName].splice(index, 1)
    }
  }
}
```

运行 `ts-node test/index.ts`，输出 `false` 则测试成功

### 6. 优化代码

```diff
export class EventHub {
  cache = {}
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push
  }
  emit(eventName, data?) {
    (this.cache[eventName] || []).forEach(fn => fn(data))
  }
  off(eventName, fn) {
-   this.cache[eventName] = this.cache[eventName] || []
-   let index = undefined
-   for(let i = 0; i < this.cache[eventName].length; i++) {
-     if(this.cache[eventName][i] === fn) {
-       index = i
-       break
-     }
-   }
+   let index = indexOf(this.cache[eventName], fn)
-   if(index = undefined) {
-     return
-   } else {
-     this.cache[eventName].splice(index, 1)
-   }
+   if(index = -1) return
+   this.cache[eventName].splice(index, 1)
  }
}

+function indexOf(array, item) {
+ if (array === undefined) return -1
+ let index = -1
+ for (let i = 0; i < array.length; i++) {
+   if (array[i] === item) {
+     index = i
+   }
+ }
+ return index
+}
```

## 五、重构代码

> 重构！优化！

### 1. 重构优化测试代码

```ts
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
```

### 2. 重构优化 `EventHub`

```ts
export class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {}
  on(eventName: string, fn: (data: any) => void) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  emit(eventName: string, data?: unknown) {
    (this.cache[eventName] || []).forEach(fn => fn(data))
  }
  off(eventName: string, fn: (data: unknown) => void) {
    let index = indexOf(this.cache[eventName], fn)
    if (index === -1) return
    this.cache[eventName].splice(index, 1)
  }
}

/**
 * 帮助函数 indexOf
 */
function indexOf(array, item) {
  if (array === undefined) return -1
  let index = -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i
    }
  }
  return index
}
```
