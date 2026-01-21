const arr = [2, 4, 21, 5, 3, 21, 23, 3, 123, 421]

for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let key = arr[i];
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        --j;
    }
    arr[j + 1] = key;
}
console.log(arr);