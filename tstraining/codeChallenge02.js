// let array = [1, 2, 0, 10, 25]
// let array = [100, 200, 10, -10, 1000, 50] // -10
// let array = [-25, -10, -1, -10000] // -10000
// let min = Math.min(...array)
// console.log(min)
// lowest value
// let array1 = [100, 200, 10, -10, 1000, 50]
// let array2 = [-25, -10, -1, -10000]
// let min = 0;
// let i;
// for (i = 0; i < array1.length; i++){
//     if (array1[i]< min){
//         min = array1[i];
//     }
// }
// console.log(min);
// for (i = 0; i < array2.length; i++){
//     if (array2[i]< min){
//         min = array2[i];
//     }
// }
// console.log(min);
function getLowest(c) {
    var min = 0;
    var i;
    for (i = 0; i < c.length; i++) {
        if (c[i] < min) {
            min = c[i];
        }
    }
    console.log('The lowest value from the array is: ' + min);
}
var a = [100, 200, 10, -10, 1000, 50];
var b = [-25, -10, -1, -10000];
getLowest(a);
getLowest(b);
