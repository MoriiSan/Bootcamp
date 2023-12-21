// function add(number1, number2){
//     const sum = number1 + number2;
//     // console.log('Sum1: ' + sum);
//     return sum;
// }
// const student1: Student = {
//     studentNumber: '1',
//     name: 'John Doe',
// }
// console.log("Student name: ", student1.name)
// let students: Array<Student> = [];
// students.push({
//     studentNumber: '1',
//     name: 'John Doe',
// })
// students.push({
//     studentNumber: '2',
//     name: 'Jane Doe',
// })
// for (let i = 0; i<students.length; i++){
//     let letterCount = students[i].name.length;
//     students[i].nameLength = letterCount;
//     console.log(students[i].name, 'has', students[i].nameLength, 'letters.')
// }
//////////////////////
function temp(celsius, inputUnit, unitConvert) {
    var toKelvin = celsius + 273.15;
    var toFahrenheit = ((celsius * (9 / 5)) + 32);
    console.log('Temperature: ', celsius);
    console.log('Input unit:', inputUnit);
    switch (unitConvert) {
        case 'k':
        case 'K':
            console.log('Unit of measure: k');
            console.log('Result: ', toKelvin);
            break;
        case 'f':
        case 'F':
            console.log('Unit of measure: f');
            console.log('Result: ', toFahrenheit);
            break;
        case 'c':
        case 'C':
            console.log('Unit of measure: c');
            console.log('Result: ', celsius);
            break;
        default:
            console.log("Invalid Keyword");
            break;
    }
}
temp(36.5, 'c', 'f');
