// 选择排序

/*****************************************************************************************************
 *
 * 递归写法
 * 1. 从数组中找出最小的一项，拿出来存到单独的数组，然后在原数组删掉最小的那一项，得到一个新的数组
 * 2. 在新的数组重复以上操作：从新数组中找出最小的一项，拿出来并且删掉最小的一项，再次的得到一个新数组
 * 3. 当数组只有 2 项时，进行大小对比，决定是否需要进行反转数组的操作
 * 3. 最终，会得到若干个数组，此时将以上数组连接起来，就可以得到一个从小到大排好序的数组
 * 
 * 要点：
 * 1. 求最小值
 * 2. 排序
 * 3. 使用到：数组、递归
 ******************************************************************************************************/

const min = numbers =>
  numbers.length > 2
    ? min([numbers[0], min(numbers.slice(1))])
    : Math.min(...numbers)

const minIndex = numbers =>
  numbers.indexOf(min(numbers))

// 以下是循环的写法
// const minIndex = numbers => {
//   let index = 0
//   for(let i = 1; i < numbers.length; i++){
//     if(numbers[i] < numbers[index]){
//       index = i
//     }
//   }
//   return index
// }

const sort = numbers => {
  if (numbers.length > 2) {
    let index = minIndex(numbers)
    let min = numbers[index]
    numbers.splice(index, 1)
    return [min].concat(sort(numbers))
  } else {
    return numbers[0] < numbers[1] ? numbers : numbers.reverse()
  }
}
console.log(sort([3, 5, 7, 2, 1]))


/*****************************************************************************************************
 *
 * 循环写法
 * 
 * 要点：
 * 每次找到最小的数放前面，然后对后面的数做同样的事情
 ******************************************************************************************************/
