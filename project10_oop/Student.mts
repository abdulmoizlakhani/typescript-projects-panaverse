import Person from "./Person.mjs";

class Student extends Person {
  public _name: string;

  constructor() {
    super();

    this._name = "";
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

export default Student;
