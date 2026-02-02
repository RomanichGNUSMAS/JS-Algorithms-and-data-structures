function partition(arr,l,r){
    const pivot = arr[l];
    
    let [i,j] = [l + 1,r];
    while(i <= j){
        while(arr[i] <= pivot) i++;
        while(arr[j] > pivot) j--;
        if(i < j) {
            [arr[i],arr[j]] = [arr[j],arr[i]];
            i++;
            j--;
        }
    }
    [arr[l],arr[j]] = [arr[j],arr[l]];
    return j;
}

function quickSort(arr,l = 0, r = arr.length - 1){
    if(l >= r) return;
    const index = partition(arr,l,r);
    quickSort(arr,l,index - 1);
    quickSort(arr,index + 1,r);
}

const arr = [1,4,2,3,6,5,3];
quickSort(arr);
console.log(arr);
