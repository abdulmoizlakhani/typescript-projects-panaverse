class Person {
    personality;
    constructor() {
        this.personality = "Mystery";
    }
    askQuestion(answer) {
        if (answer === 1) {
            this.personality = "Extravert";
        }
        else if (answer === 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "You are still a Mystery!";
        }
    }
    getPersonality() {
        return this.personality;
    }
}
export default Person;
//# sourceMappingURL=Person.mjs.map