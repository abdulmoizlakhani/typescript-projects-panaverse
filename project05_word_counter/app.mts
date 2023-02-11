#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

let rainbowTitle: chalkAnimation.Animation;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `WORD COUNTER`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Word Counter! (A CLI based word counter app developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Insert paragraph or text")}
    ${chalk.white("2. See Count Report")}
  `);
}

async function getUserText() {
  const { para } = await inquirer.prompt({
    name: "para",
    type: "input",
    message: "Enter text",
  });

  if (!para) {
    console.log(chalk.whiteBright.bgRed("Text should not be empty!\n"));
  } else {
    const words = para.split(" ");
    const characters = para.replace(/ /g, "");
    console.log(chalk.white.bgBlue(`\nTotal Words Count: ${words.length}`));
    console.log(
      chalk.white.bgBlue(`Total Characters Count: ${characters.length}\n`)
    );
  }
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await howToGuide();
  await getUserText();
} catch (error) {
  console.log("ERROR: ", error);
}
