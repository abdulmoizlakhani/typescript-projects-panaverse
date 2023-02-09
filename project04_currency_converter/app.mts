#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

interface ExchangeRates {
  [currency: string]: number;
}

interface Currency {
  currency: string;
  exchangeRates: ExchangeRates;
}

let rainbowTitle: chalkAnimation.Animation;

let currenciesList: Currency[] = [
  {
    currency: "USD",
    exchangeRates: {
      PKR: 272.75,
      EUR: 0.93,
    },
  },
  {
    currency: "PKR",
    exchangeRates: {
      USD: 0.0037,
      EUR: 0.0034,
    },
  },
  {
    currency: "EUR",
    exchangeRates: {
      PKR: 293.47,
      USD: 1.08,
    },
  },
];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `CURRENCY CONVERTER`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Currency Converter! (A CLI based currency converter app developed by amlakhani)"
    );
  });
}

async function howToGuide() {
  console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("1. Choose option from menu")}
    ${chalk.white("2. Choose currency you have")}
    ${chalk.white("3. Choose currency you need")}
    ${chalk.white("4. Insert amount you have")}
    ${chalk.white("5. See Conversion Rates")}
  `);
}

async function askForOperation() {
  const answer = await inquirer.prompt({
    name: "operation",
    type: "list",
    message: "Choose the Option from below list",
    choices: ["See Currencies List", "Convert Currency", "Exit"],
  });
  if (answer.operation === "Exit") {
    process.exit();
  } else if (answer.operation === "See Currencies List") {
    console.log(chalk.white.bgGreen("See Currencies List:\n"));

    currenciesList.map((currency, i) => {
      console.log(chalk.white(`${i + 1}: ${currency.currency}`));
    });
    console.log("\n");

    askForOperation();
  } else if (answer.operation === "Convert Currency") {
    console.log(chalk.white.bgGreen("Convert Currency:\n"));

    const { currency } = await inquirer.prompt({
      name: "currency",
      type: "list",
      message: "Choose currency you need",
      choices: [...currenciesList.map((c) => c.currency), "Exit"],
    });

    if (currency === "Exit") {
      askForOperation();
    } else {
      const { currency2 } = await inquirer.prompt({
        name: "currency2",
        type: "list",
        message: "Choose currency you have",
        choices: [
          ...currenciesList
            .filter((c) => c.currency !== currency)
            .map((c) => c.currency),
          "Exit",
        ],
      });

      const { amount } = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: `Enter amount of ${currency2}`,
      });

      console.log("\nCurrent Conversion Rates:");

      const selectedCurrency = currenciesList.find(
        (c) => c.currency === currency2
      );

      console.log(
        chalk.white.bgBlue(
          `1 ${currency2} = ${selectedCurrency["exchangeRates"][currency]} ${currency} \n`
        )
      );

      console.log("\nYou will get:");

      console.log(
        chalk.white.bgBlue(
          `${amount} ${currency2} = ${
            selectedCurrency["exchangeRates"][currency] * amount
          } ${currency} \n`
        )
      );
    }
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
