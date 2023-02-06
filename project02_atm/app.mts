#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

interface User {
  userName: string;
  currentBalance: number;
}

let rainbowTitle: chalkAnimation.Animation;
const users: User[] = [
  {
    userName: "Ramzan",
    currentBalance: 20000,
  },
  {
    userName: "Jamal",
    currentBalance: 0,
  },
  {
    userName: "Kamal",
    currentBalance: 1000,
  },
  {
    userName: "Faheem",
    currentBalance: 2000,
  },
  {
    userName: "Noman",
    currentBalance: 1500,
  },
];

let currentUser: User = users[Math.floor(Math.random() * 5)];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `ATM MACHINE`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to ATM Machine! (A CLI based ATM simulation developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Insert User ID")}
    ${chalk.white("2. Insert User Pin")}
    ${chalk.white("3. Select Option")}

    ${chalk.black.bgYellow("TEST DATA")}
    ${chalk.white("User Id: user_1")}
    ${chalk.white("User Pin: pin1")}
  `);
}

async function startGame() {
  const { userId } = await inquirer.prompt({
    name: "userId",
    type: "input",
    message: `Enter User ID`,
  });
  const { userPin } = await inquirer.prompt({
    name: "userPin",
    type: "input",
    message: `Enter User Pin`,
  });

  const spinner = createSpinner("authenticating, please wait...").start();
  await sleep();

  if (userId !== "user_1" || userPin !== "pin1") {
    spinner.error({ text: "Invalid Credentials!" });
    startGame();
  } else {
    spinner.success({ text: "Authentication Successful!\n" });
    console.log(chalk.white.bgGreen(`Welcome, ${currentUser.userName}!\n`));
    askForOperation();
  }
}

async function askForOperation() {
  console.log(`\n`);

  const answer = await inquirer.prompt({
    name: "operation",
    type: "list",
    message: "Choose the Option from below list",
    choices: [
      "See Current Balance",
      "Deposit Amount",
      "Withdraw Amount",
      "Exit",
    ],
  });
  if (answer.operation === "Exit") {
    process.exit();
  } else if (answer.operation === "See Current Balance") {
    console.log(chalk.white.bgGreen("Current Balance:\n"));
    console.log(
      chalk.white(
        `Your current balance is ${chalk.blueBright.bgCyanBright(
          `PKR ${currentUser.currentBalance}`
        )}`
      )
    );
    askForOperation();
  } else if (answer.operation === "Deposit Amount") {
    console.log(chalk.white.bgGreen("Deposit Amount:\n"));
    const { deposit } = await inquirer.prompt({
      name: "deposit",
      type: "number",
      message: `Enter amount to deposit`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner("depositing amount, please wait...").start();
    await sleep();

    if (deposit <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Deposit amount can't be 0 or less!"),
      });
    } else {
      currentUser.currentBalance += deposit;

      spinner.success({
        text: chalk.white(
          `Your new account balance balance is ${chalk.blueBright.bgCyanBright(
            `PKR ${currentUser.currentBalance}`
          )}`
        ),
      });
    }

    askForOperation();
  } else if (answer.operation === "Withdraw Amount") {
    console.log(chalk.white.bgGreen("Withdraw Amount:\n"));

    const { withdrawAmount } = await inquirer.prompt({
      name: "withdrawAmount",
      type: "number",
      message: `Enter amount to withdraw`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner("withdrawing amount, please wait...").start();
    await sleep();

    if (withdrawAmount <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Withdraw amount can't be 0 or less!"),
      });
    } else if (withdrawAmount > currentUser.currentBalance) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Insufficient Funds!"),
      });
    } else {
      currentUser.currentBalance -= withdrawAmount;

      spinner.success({
        text: chalk.white(
          `Your new account balance balance is ${chalk.blueBright.bgCyanBright(
            `PKR ${currentUser.currentBalance}`
          )}`
        ),
      });
    }

    askForOperation();
  }
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await howToGuide();
  await startGame();
} catch (error) {
  console.log("ERROR: ", error);
}
