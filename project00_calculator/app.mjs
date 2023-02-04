#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
let rainbowTitle;
let operator = "";
let result = null;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    const msg = `Cal-Coolator`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
        rainbowTitle = chalkAnimation.rainbow("Welcome to Cal-Coolator! (A CLI based calculator developed by amlakhani)");
    });
}
async function howToGuide() {
    console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Insert Number")}
    ${chalk.white("2. Choose Operator (+, -, *, /)")}
    ${chalk.white("3. Repeat above steps again (optional)")}
    ${chalk.white("4. Calculate Result")}
  `);
}
async function askForOperation() {
    const answer = await inquirer.prompt({
        name: "operator",
        type: "list",
        message: "Choose the Operator from below list",
        choices: [
            "Plus (+)",
            "Minus (-)",
            "Multiply (*)",
            "Divide (/)",
            "Calculate Result",
            "Exit",
        ],
    });
    if (answer.operator === "Calculate Result") {
        generateResult();
    }
    else if (answer.operator === "Exit") {
        process.exit();
    }
    else {
        operator = answer.operator;
        askForOperand();
    }
}
async function askForOperand() {
    const answer = await inquirer.prompt({
        name: "operand",
        type: "number",
        message: `Enter Number`,
        default() {
            return 0;
        },
    });
    calculate(answer.operand, operator);
}
function calculate(operand, oper) {
    switch (oper) {
        case "Plus (+)":
            if (result) {
                result = result + operand;
                operator = "";
            }
            else {
                result = operand;
                operator = "";
            }
            askForOperation();
            break;
        case "Minus (-)":
            if (result) {
                result = result - operand;
                operator = "";
            }
            else {
                result = operand;
                operator = "";
            }
            askForOperation();
            break;
        case "Multiply (*)":
            if (result) {
                result = result * operand;
                operator = "";
            }
            else {
                result = operand;
                operator = "";
            }
            askForOperation();
            break;
        case "Divide (/)":
            if (result) {
                result = result / operand;
                operator = "";
            }
            else {
                result = operand;
                operator = "";
            }
            askForOperation();
            break;
        default:
            result = operand;
            askForOperation();
            break;
    }
}
function generateResult() {
    console.log(chalk.whiteBright.bgGreen(`RESULT: ${result}`));
}
try {
    console.clear();
    welcome();
    await sleep();
    rainbowTitle.stop();
    await howToGuide();
    await askForOperand();
}
catch (error) {
    console.log("ERROR: ", error);
}
//# sourceMappingURL=app.mjs.map