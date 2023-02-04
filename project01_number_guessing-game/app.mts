#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let rainbowTitle: chalkAnimation.Animation;
let result: number[] = [];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function randomNum() {
  return Math.floor(Math.random() * 10) + 1;
}

function welcome() {
  const msg = `Guess The Number`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Guess The Number! (A CLI based game developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Insert count of rounds you want to play")}
    ${chalk.white(
      "2. We will generate a new number between 0 to 10 in each round"
    )}
    ${chalk.white("3. Number will be hidden and you will be asked to guess")}
    ${chalk.white("4. Insert your guess in each round")}
    ${chalk.white("5. Result")}
  `);
}

async function startGame() {
  const answer = await inquirer.prompt({
    name: "rounds",
    type: "number",
    message: `Enter rounds count`,
    default() {
      return 1;
    },
  });

  if (answer.rounds <= 0) {
    console.log(chalk.whiteBright.bgRed("Rounds count can't be 0 or less!"));
    startGame();
  } else {
    generateRandomNumberAndAskUser(answer.rounds);
  }
}

async function generateRandomNumberAndAskUser(rounds: number) {
  for (let i = 0; i < rounds; i++) {
    const num = randomNum();
    const spinner = createSpinner("Generating random number...").start();
    await sleep();

    spinner.success({ text: "The number is X!! Guess it!" });

    const answer = await inquirer.prompt({
      name: "guess",
      type: "number",
      message: `Guess the number!`,
    });

    if (answer.guess === num) {
      result.push(1);
    } else {
      result.push(0);
    }
  }

  generateResult();
}

function generateResult() {
  const win = result.every((num) => num === 1);
  if (win) {
    const msg = `Congratulations! YOU WON!!`;
    figlet(msg, (err, data) => {
      console.log(gradient.pastel.multiline(data));
    });
  } else {
    console.log(chalk.white.bgRed("Sorry! You Lost!"));
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
