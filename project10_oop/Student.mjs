import Person from "./Person.mjs";
class Student extends Person {
    _name;
    constructor() {
        super();
        this._name = "";
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
}
export default Student;
//# sourceMappingURL=Student.mjs.map