#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
// import { createSpinner } from "nanospinner";

let playerName;
let rainbowTitle: chalkAnimation.Animation;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `Cal-Cool`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Cal-Cool! (A CLI based calculator developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Choose Operator (+, -, *, /)")}
    ${chalk.white("2. Insert count of operands (e.g. 2, 3, 4, ...)")}
    ${chalk.white("3. Provide operands")}
    ${chalk.white("4. You will see the result of Calculation")}
  `);
}

async function askForOperation() {
  const answer = await inquirer.prompt({
    name: "operator",
    type: "list",
    message: "Choose the Operator from below list",
    choices: ["Plus (+)", "Minus (-)", "Multiply (*)", "Divide (/)"],
  });

  return answer;
}

async function askForOperandsCount() {
  const { count } = await inquirer.prompt({
    name: "count",
    type: "number",
    message: "Provide count of operands. E.g. (2, 3, ...). Must be > 1",
    default() {
      return 2;
    },
  });

  if (count <= 0) {
    console.log(
      chalk.white.bgRed("Count can't be 0 or negative. Please insert again")
    );
    askForOperandsCount();
  }

  return { count };
}

async function askForOperands(count: number) {
  let operands: number[] = [];

  for (let i = 0; i < count; i++) {
    const { operand } = await inquirer.prompt({
      name: "operand",
      type: "number",
      message: `Provide Operand ${i + 1}`,
      default() {
        return 0;
      },
    });

    operands.push(operand);
  }

  return { operands };
}

async function generateResult(operator: string, operands: number[]) {
  let result = 0;

  switch (operator) {
    case "Plus (+)":
      result = operands.reduce((sum, acc) => sum + acc, 0);
      break;
    case "Minus (-)":
      result = operands.reduce((sum, acc) => acc - sum, 0);
      break;
    case "Multiply (*)":
      result = operands.reduce((sum, acc) => sum * acc, 1);
      break;
    case "Divide (/)":
      result = operands.reduce((sum, acc) => sum / acc, 1);
      break;
    default:
      break;
  }

  return { result };
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await howToGuide();
  const { operator } = await askForOperation();
  const { count } = await askForOperandsCount();
  const { operands } = await askForOperands(count);
  const { result } = await generateResult(operator, operands);
  console.log(chalk.whiteBright.bgGreen(`RESULT: ${result}`));
} catch (error) {
  console.log("ERROR: ", error);
}
