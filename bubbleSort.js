const arr = [1,8,6,4,8,5,4,7,4,3,8,2,4,5,5,3]
for(let i = 0;i < arr.length - 1;++i){
   for(let j = 0;j < arr.length - i - 1;++j){
    if(arr[j] > arr[j+1]){
        let tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
    }
   }
}
console.log(arr)
