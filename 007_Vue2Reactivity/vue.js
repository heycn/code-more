function observe(obj) {
  for (const key in obj) {
    let value = obj[key]
    const fnList = []
    Object.defineProperty(obj, key, {
      get: function () {
        if (window.__fn && !fnList.includes(__fn)) {
          fnList.push(__fn)
        }
        return value
      },
      set: function (val) {
        value = val
        fnList.map(fn => fn())
      }
    })
  }
}

function call(fn) {
  window.__fn = fn
  window.__fn()
  window.__fn = null
}
