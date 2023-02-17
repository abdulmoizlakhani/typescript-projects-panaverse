#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import Customer from "./Customer.mjs";

let rainbowTitle: chalkAnimation.Animation;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `NINJA BANK`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Ninja Bank! (A CLI based banking system developed by amlakhani)"
    );
  });
}

async function startProgram() {
  console.log("\n");

  const answer = await inquirer.prompt({
    name: "operation",
    type: "list",
    message: "Choose the Option from below list",
    choices: [
      "Open New Bank Account",
      "See My Bank Details",
      "Credit Transaction",
      "Debit Transaction",
      "Exit",
    ],
  });

  if (answer.operation === "Exit") {
    process.exit();
  } else if (answer.operation === "Open New Bank Account") {
    console.log(chalk.white.bgGreen("Open New Bank Account:\n"));

    const { firstName } = await inquirer.prompt({
      name: "firstName",
      type: "input",
      message: "Please enter your first name: ",
    });
    const { lastName } = await inquirer.prompt({
      name: "lastName",
      type: "input",
      message: "Please enter your last name: ",
    });
    const { gender } = await inquirer.prompt({
      name: "gender",
      type: "list",
      message: "Choose gender: ",
      choices: ["Male", "Female"],
    });
    const { age } = await inquirer.prompt({
      name: "age",
      type: "input",
      message: "Please enter your age: ",
    });
    const { mobileNumber } = await inquirer.prompt({
      name: "mobileNumber",
      type: "input",
      message: "Please enter your mobile number: ",
    });
    const { pinCode } = await inquirer.prompt({
      name: "pinCode",
      type: "input",
      message: "Please set pin code: ",
    });

    Customer.createNewCustomer({
      firstName,
      lastName,
      age,
      gender,
      mobileNumber,
      pinCode,
    });

    const spinner = createSpinner(
      "creating bank account, please wait..."
    ).start();
    await sleep();

    spinner.success({
      text: chalk.whiteBright.bgGreen(
        "Congratulations! You account has been created!\n"
      ),
    });

    startProgram();
  } else if (answer.operation === "See My Bank Details") {
    console.log(chalk.white.bgGreen("See My Bank Details:\n"));

    const { pinCode } = await inquirer.prompt({
      name: "pinCode",
      type: "input",
      message: "Please enter your pin code: ",
    });

    console.log(`${chalk.white(Customer.getCustomerInfo(pinCode))}`);

    startProgram();
  } else if (answer.operation === "Credit Transaction") {
    console.log(chalk.white.bgGreen("Credit Transaction:\n"));

    const { pinCode } = await inquirer.prompt({
      name: "pinCode",
      type: "input",
      message: "Please enter your pin code: ",
    });

    const msg = Customer.getCustomerInfo(pinCode);

    if (msg === "Invalid Pin Code or Account doesn't exist!") {
      console.log(chalk.red.bgWhite(msg + "\n"));
    } else {
      console.log(`${chalk.white(msg)}`);

      const { amount } = await inquirer.prompt({
        name: "amount",
        type: "input",
        message: "Please enter amount: ",
      });

      const result = Customer.creditAmount(pinCode, parseInt(amount));

      const spinner = createSpinner(
        "transaction in progress, please wait..."
      ).start();
      await sleep();

      spinner.success({
        text: chalk.whiteBright.bgGreen(result + "\n"),
      });
    }

    startProgram();
  } else if (answer.operation === "Debit Transaction") {
    console.log(chalk.white.bgGreen("Debit Transaction:\n"));

    const { pinCode } = await inquirer.prompt({
      name: "pinCode",
      type: "input",
      message: "Please enter your pin code: ",
    });

    const msg = Customer.getCustomerInfo(pinCode);

    if (msg === "Invalid Pin Code or Account doesn't exist!") {
      console.log(chalk.red.bgWhite(msg + "\n"));
    } else {
      console.log(`${chalk.white(msg)}`);

      const { amount } = await inquirer.prompt({
        name: "amount",
        type: "input",
        message: "Please enter amount: ",
      });

      const result = Customer.debitAmount(pinCode, parseInt(amount));

      const spinner = createSpinner(
        "transaction in progress, please wait..."
      ).start();
      await sleep();

      spinner.success({
        text: chalk.whiteBright.bgGreen(result + "\n"),
      });
    }

    startProgram();
  } else {
    console.log(chalk.red.bgWhite("Invalid option!\n"));
    startProgram();
  }
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await startProgram();
} catch (error) {
  console.log("ERROR: ", error);
}
