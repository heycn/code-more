function deepClone(source) {
  if (source instanceof Object) {
    const dist = new Object()
    for (let key in source) {
      dist[key] = deepClone(source[key])
    }
    return dist
  }
  return source
}

module.exports = deepClone
