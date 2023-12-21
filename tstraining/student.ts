import * as StudentData from './student.json';
interface Person{
    name: string;
    age: number;
    birthDate?: string;
    father?: Person;
    mother?: Person;
}
class PersonEntity{
    public person: Person;

    constructor(person: Person){
        this.person = person;
    }

    public getFatherEntity(): PersonEntity {
        if (this.person.father) {
            return new PersonEntity(this.person.father);
        }
        throw new Error("Contact administrator?");
    }

    public getAge(): number {
        if (this.person.birthDate) {
            let age = Date.now() - new Date(this.person.birthDate).getTime();
            age = age / 31536000000;
            age = Math.floor(age);
            console.log("age", age/ 31536000000);
            return age;
        } 
        throw new Error("Cannot compute age")
    }
}

interface Student extends Person{
    trainings: Array<String>;
}

const student: Student = StudentData;
const entity = new PersonEntity(student);
console.log("student:", entity.getFatherEntity().getAge())