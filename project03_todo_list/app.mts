#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

interface Todo {
  text: string;
  done: boolean;
}

let rainbowTitle: chalkAnimation.Animation;

let todoList: Todo[] = [];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `TO-DOO`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to TO-DOO! (A CLI based todo list app developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Choose option from menu")}
  `);
}

async function askForOperation() {
  const answer = await inquirer.prompt({
    name: "operation",
    type: "list",
    message: "Choose the Option from below list",
    choices: [
      "See Current List",
      "Add New Todo",
      "Edit Todo",
      "Delete Todo",
      "Mark Todo as Done",
      "Mark Todo as Undone",
      "Exit",
    ],
  });
  if (answer.operation === "Exit") {
    process.exit();
  } else if (answer.operation === "See Current List") {
    console.log(chalk.white.bgGreen("Current List:\n"));

    if (!todoList.length) {
      console.log(chalk.blue("Hurray! No new todos!\n"));
    } else {
      todoList.map((todo, i) => {
        console.log(
          chalk.white(
            `${i + 1}: ${todo.text} ${
              todo.done
                ? `${chalk.green("(Done)")}`
                : `${chalk.yellow("(Pending)")}`
            }`
          )
        );
      });
      console.log("\n");
    }
    askForOperation();
  } else if (answer.operation === "Add New Todo") {
    console.log(chalk.white.bgGreen("Add New Todo:\n"));

    const { todo } = await inquirer.prompt({
      name: "todo",
      type: "input",
      message: `What's new?`,
    });

    const spinner = createSpinner("adding todo, please wait...").start();
    await sleep();

    if (!todo) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Todo should not be empty!\n"),
      });
    } else {
      todoList.push({ text: todo, done: false });
      spinner.success({
        text: chalk.white(`Todo added successfully!\n`),
      });
    }

    askForOperation();
  } else if (answer.operation === "Mark Todo as Done") {
    console.log(chalk.white.bgGreen("Mark Todo as Done:\n"));

    const { todoIndex } = await inquirer.prompt({
      name: "todoIndex",
      type: "number",
      message: `Please enter index number of todo`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner(
      "marking todo as done, please wait..."
    ).start();
    await sleep();

    if (todoIndex <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Index can't be 0 or less!\n"),
      });
    } else if (todoIndex > todoList.length) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Todo doesn't exist!\n"),
      });
    } else {
      const updatedTodoList = [...todoList];
      updatedTodoList[todoIndex - 1]["done"] = true;
      todoList = updatedTodoList;

      spinner.success({
        text: chalk.white("Successfully marked as done!\n"),
      });
    }

    askForOperation();
  } else if (answer.operation === "Mark Todo as Undone") {
    console.log(chalk.white.bgGreen("Mark Todo as Undone:\n"));

    const { todoIndex } = await inquirer.prompt({
      name: "todoIndex",
      type: "number",
      message: `Please enter index number of todo`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner(
      "marking todo as undone, please wait..."
    ).start();
    await sleep();

    if (todoIndex <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Index can't be 0 or less!\n"),
      });
    } else if (todoIndex > todoList.length) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Todo doesn't exist!\n"),
      });
    } else {
      const updatedTodoList = [...todoList];
      updatedTodoList[todoIndex - 1]["done"] = false;
      todoList = updatedTodoList;

      spinner.success({
        text: chalk.white("Successfully marked as undone!\n"),
      });
    }

    askForOperation();
  } else if (answer.operation === "Delete Todo") {
    console.log(chalk.white.bgGreen("Delete Todo:\n"));

    const { todoIndex } = await inquirer.prompt({
      name: "todoIndex",
      type: "number",
      message: `Please enter index number of todo`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner("deleting todo, please wait...").start();
    await sleep();

    if (todoIndex <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Index can't be 0 or less!\n"),
      });
    } else if (todoIndex > todoList.length) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Todo doesn't exist!\n"),
      });
    } else {
      const updatedTodoList = [...todoList];
      updatedTodoList.splice(todoIndex - 1, 1);
      todoList = updatedTodoList;

      spinner.success({
        text: chalk.white("Successfully deleted the todo!\n"),
      });
    }

    askForOperation();
  } else if (answer.operation === "Edit Todo") {
    console.log(chalk.white.bgGreen("Edit Todo:\n"));

    const { todoIndex } = await inquirer.prompt({
      name: "todoIndex",
      type: "number",
      message: `Please enter index number of todo`,
      default() {
        return 1;
      },
    });

    const spinner = createSpinner("getting todo, please wait...").start();
    await sleep();

    if (todoIndex <= 0) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Index can't be 0 or less!\n"),
      });
    } else if (todoIndex > todoList.length) {
      spinner.error({
        text: chalk.whiteBright.bgRed("Todo doesn't exist!\n"),
      });
    } else {
      spinner.stop();

      const { todo } = await inquirer.prompt({
        name: "todo",
        type: "input",
        message: `What's the update?`,
      });

      const spinner2 = createSpinner("updating todo, please wait...").start();
      await sleep();

      const updatedTodoList = [...todoList];
      updatedTodoList[todoIndex - 1] = { text: todo, done: false };
      todoList = updatedTodoList;

      spinner2.success({
        text: chalk.white("Successfully updated the todo!\n"),
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
  await askForOperation();
} catch (error) {
  console.log("ERROR: ", error);
}
