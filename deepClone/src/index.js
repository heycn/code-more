function deepClone(source) {
  if (source instanceof Object) {
    if (source instanceof Array) {
      const dist = new Array()
      for (let key in source) {
        dist[key] = deepClone(source[key])
      }
      return dist
    } else if (source instanceof Function) {
      const dist = function () {
        return source.apply(this, arguments)
      }
      for (let key in source) {
        dist[key] = deepClone(source[key])
      }
      return dist
    } else {
      const dist = new Object()
      for (let key in source) {
        dist[key] = deepClone(source[key])
      }
      return dist
    }
  }
  return source
}

module.exports = deepClone
