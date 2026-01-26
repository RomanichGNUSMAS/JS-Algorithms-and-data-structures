function countingSort(arr){
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const res = new Array(max - min + 1).fill(0)

    for(let i = 0;i < arr.length;++i){
        res[arr[i] - min]++;
    }

    const output = [];
    for(let i = 0;i < res.length;++i){
        if(res[i] == 0) continue;
        while(res[i]-- > 0){         
            output.push(i+1);
        }
    }
    return output;
}

console.log(countingSort([2,5,21,3,42,1,2,2,2,3,3]))