#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

let rainbowTitle: chalkAnimation.Animation;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `COUNTDOWN TIMER`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Countdown Timer! (A CLI based countdown timer developed by amlakhani)"
    );
  });
}

async function startCountDown() {
  console.log("\n");

  const countDownDate = new Date("Dec 31, 2023").getTime();

  const x = setInterval(function () {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const data =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s" + "\r";

    process.stdout.write(data);

    // figlet(
    //   days + "d " + hours + "h " + minutes + "m " + seconds + "s",
    //   (err, data) => {
    //     process.stdout.write(data + "\r");
    //   }
    // );

    if (distance < 0) {
      clearInterval(x);
      console.log(chalk.red("EXPIRED"));
    }
  }, 1000);
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await startCountDown();
} catch (error) {
  console.log("ERROR: ", error);
}
