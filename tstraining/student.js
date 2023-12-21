"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentData = require("./student.json");
var PersonEntity = /** @class */ (function () {
    function PersonEntity(person) {
        this.person = person;
    }
    PersonEntity.prototype.getFatherEntity = function () {
        if (this.person.father) {
            return new PersonEntity(this.person.father);
        }
        throw new Error("Contact administrator?");
    };
    PersonEntity.prototype.getAge = function () {
        if (this.person.birthDate) {
            var age = Date.now() - new Date(this.person.birthDate).getTime();
            age = age / 31536000000;
            age = Math.floor(age);
            console.log("age", age / 31536000000);
            return age;
        }
        throw new Error("Cannot compute age");
    };
    return PersonEntity;
}());
var student = StudentData;
var entity = new PersonEntity(student);
console.log("student:", entity.getFatherEntity().getAge());
