// 分享几个编程技巧：for of、reduce、链式编程

// 需求
// 输入 ['avatar.jpg ', '.gitignore', '    ', 'index.js']
// 输出 ['~/app/avatar.jpg', '~/app/.gitignore', '~/app/index.js']

const files = ['avatar.jpg ', '.gitignore', '    ', 'index.js']

// 1. 使用 for of
const forLoops = files => {
  const result = []
  for (const file of files) file.trim() && result.push(file.trim())
  return result
}

console.log(forLoops(files))

// 2. 使用 reduce
const reduceWay = files => {
  return files.reduce((result, file) => {
    const fileName = file.trim()
    if (fileName) {
      const filePath = `~/app/${fileName}`
      result.push(filePath)
    }
    return result
  }, [])
}

console.log(reduceWay(files))
