// function add(number1, number2){
//     const sum = number1 + number2;
//     // console.log('Sum1: ' + sum);
//     return sum;
// }

// const addNew = (number1, number2) => {
//     const sum = number1 + number2;
//     // console.log('Sum2: ' + sum);
//     return sum;
// }

// let sum = add(1,2) + addNew(1,2);

// console.log(sum)

/////////////////

// let studentNumber: String | number;
// studentNumber = 201910802;

// console.log("Student Number: ", studentNumber);

/////////////////////

// let studentIDs: string[] | Array<String> | [string];

///////////////////////////

// interface Student {
//     studentNumber: string;
//     name: string;
//     age?: Number;
//     nameLength?: Number;
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

function temp(celsius, inputUnit, unitConvert){
    let toKelvin = celsius + 273.15;
    let toFahrenheit = ((celsius * (9/5)) + 32);
    console.log('Temperature: ', celsius);
    console.log('Input unit:', inputUnit);

    switch(unitConvert) {
        case 'k': case 'K':
            console.log('Unit of measure: k');
            console.log('Result: ', toKelvin)
          break;
        case 'f': case 'F':
            console.log('Unit of measure: f');
            console.log('Result: ', toFahrenheit)
          break;
        case 'c': case 'C':
            console.log('Unit of measure: c');
            console.log('Result: ', celsius)
          break;
        default:
            console.log("Invalid Keyword")
          break;
      }
}
temp(36.5, 'c', 'f');