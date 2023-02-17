#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import Person from "./Person.mjs";
import Student from "./Student.mjs";
let rainbowTitle;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    const msg = `OOP EXAMPLE`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
        rainbowTitle = chalkAnimation.rainbow("Welcome to OOP Example! (A CLI based oop example developed by amlakhani)");
    });
}
async function startProgram() {
    const { answer } = await inquirer.prompt({
        name: "answer",
        type: "input",
        message: chalk.blue("Type 1 if you like to talk to others and type 2 if you would rather keep to yourself: "),
    });
    if (isNaN(parseInt(answer))) {
        console.log(chalk.whiteBright.bgRed("Please enter valid number!\n"));
    }
    else {
        const person = new Person();
        person.askQuestion(parseInt(answer));
        console.log(chalk.green(`You are: ${person.getPersonality()}`));
        const { name } = await inquirer.prompt({
            name: "name",
            type: "input",
            message: chalk.blue("What is your name: "),
        });
        const student = new Student();
        student.name = name;
        console.log(chalk.green(`You name is: ${student._name} and you personality is ${student.getPersonality()}.`));
    }
}
try {
    console.clear();
    welcome();
    await sleep();
    rainbowTitle.stop();
    await startProgram();
}
catch (error) {
    console.log("ERROR: ", error);
}
//# sourceMappingURL=app.mjs.map