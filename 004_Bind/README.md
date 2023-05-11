# 来！和我一起手写 `bin`

## 确定 API

特殊性

- `bind` 位于 `Function.prototype` 上
- 需要做 `polyfill`

API

- `fn.bind(asThis)`
- `fn.bind(asThis, param1, param2)`
- `fn.bind(asThis)()`
- `fn.bind(asThis, param1, param2)()`
- `fn.bind(asThis)(param1)`
- `fn.bind(asThis, param1, param2)(p3, p4)`

## 步骤

commit 记录

- [初始化](https://github.com/heycn/code-more/commit/3aad1346105bc401647e6b09bd6eb7716a96745a)
- [支持 this](https://github.com/heycn/code-more/commit/de0b71a130608a4d8539264387707b6d80dd8ed8)
- [支持接受参数](https://github.com/heycn/code-more/commit/367c728a7f0147ad239478fa33bbf77013c0f6d7)
- [支持 bind 之后还可以接受参数](https://github.com/heycn/code-more/commit/c20e67b61fe34d2c919991fb4ffd14a4d3185a64)
- [把 const 改为 var，连 bind 都不支持，怎么可能支持 const？](https://github.com/heycn/code-more/commit/2415692e249181cdbd3f3ca351f5a7bac0d35211)
- [加一句错误提示](https://github.com/heycn/code-more/commit/b698794c19e54b207a764a62631c2d6831a9bd4b)
- [不用 ...操作符，使用 slice 代替处理](https://github.com/heycn/code-more/commit/39326cc3c5b845421344b5c0e57664a8bf240f19)
- [整理测试用例](https://github.com/heycn/code-more/commit/d324559a0164ee8826e2f1b1fde7f60815e2c43d)
- [支持 new 的时候，绑定了 p1, p2](https://github.com/heycn/code-more/commit/acba6facae5df1653f529808fb3e52e1002c101a)
- [支持 new 的时候，绑定了 p1, p2, 并且 fn 有 prototype](https://github.com/heycn/code-more/commit/30df9f7501d1b131ee842772bf974b3c94ebfe28)
