console.log('put your code inside this file', process.argv)
const stringArr = process.argv[2]
const arr = JSON.parse(stringArr)

console.log(arr, typeof arr)
// let max = arr[0]

// arr.forEach((num) => {
//   if (max < num) {
//     max = num
//   }
// })

console.log('max number is:', Math.max(...arr))

// console.log('Max number is:', max)
