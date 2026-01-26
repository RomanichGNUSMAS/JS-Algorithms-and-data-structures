function cumulativeCountingSort(arr){
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const res = new Array(range).fill(0)
    for(let i = 0;i < arr.length;++i){
        res[arr[i] - min]++;
    }

    const output = [];
    for(let i = 1;i < res.length;++i){
        res[i] += res[i-1];
    }
    for(let i = arr.length - 1;i >= 0; --i){
        let value = arr[i];
        let id = res[value - min] - 1;
        output[id] = value;
        res[value - min]--;
    }
    return output
}

console.log(cumulativeCountingSort([2,5,4,3,1,5,6,1]))