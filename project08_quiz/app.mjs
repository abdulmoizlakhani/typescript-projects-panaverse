#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import physicsQuiz from "./quizes/physics.mjs";
import technologyQuiz from "./quizes/technology.mjs";
import biologyQuiz from "./quizes/biology.mjs";
import englishGrammarQuiz from "./quizes/english-grammar.mjs";
let rainbowTitle;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let result = [];
function welcome() {
    const msg = `TECHNO QUIZ`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
        rainbowTitle = chalkAnimation.rainbow("Welcome to TECHNO QUIZ! (A CLI based quiz app developed by amlakhani)");
    });
}
async function guide() {
    console.log(`
    ${chalk.black.bgYellow("QUIZ INFO")}
    ${chalk.white("1. Choose subject to start quiz")}
    ${chalk.white("2. Total Questions: 10")}
    ${chalk.white("3. Passing Marks 80%")}
  `);
}
async function showResult() {
    const spinner = createSpinner("generating result, please wait...").start();
    await sleep();
    spinner.stop();
    console.log("\n");
    const totalCorrect = result.filter(x => x).length;
    const totalIncorrect = 10 - totalCorrect;
    const percentage = (totalCorrect / 10) * 100;
    const isPassed = percentage >= 80;
    if (isPassed) {
        console.log(chalk.white.bgGreen("*###########################################*"));
        console.log(chalk.white.bgGreen("*#       CONGRATULATIONS! YOU PASSED!      #*"));
        console.log(chalk.white.bgGreen(`*#       TOTAL QUESTIONS: 10               #*`));
        console.log(chalk.white.bgGreen(`*#       TOTAL CORRECT ANSWERS: ${totalCorrect < 10 ? "0" + totalCorrect : totalCorrect}          #*`));
        console.log(chalk.white.bgGreen(`*#       TOTAL WRONG ANSWERS: ${totalIncorrect < 10 ? "0" + totalIncorrect : totalIncorrect}           #*`));
        console.log(chalk.white.bgGreen(`*#       PERCENTAGE: ${percentage < 10 ? "0" + percentage : percentage}                    #*`));
        console.log(chalk.white.bgGreen("*###########################################*"));
    }
    else {
        console.log(chalk.white.bgRed("*###########################################*"));
        console.log(chalk.white.bgRed("*#       SORRY! YOU FAILED!                #*"));
        console.log(chalk.white.bgRed(`*#       TOTAL QUESTIONS: 10               #*`));
        console.log(chalk.white.bgRed(`*#       TOTAL CORRECT ANSWERS: ${totalCorrect < 10 ? "0" + totalCorrect : totalCorrect}         #*`));
        console.log(chalk.white.bgRed(`*#       TOTAL WRONG ANSWERS: ${totalIncorrect < 10 ? "0" + totalIncorrect : totalIncorrect}           #*`));
        console.log(chalk.white.bgRed(`*#       PERCENTAGE: ${percentage < 10 ? "0" + percentage : percentage}%                   #*`));
        console.log(chalk.white.bgRed("*###########################################*"));
    }
}
function startQuiz(subject, quiz) {
    console.log(chalk.white.bgGreen(`${subject} Quiz\n`));
    let i = 0;
    async function showQuiz() {
        if (i >= quiz.length) {
            showResult();
        }
        else {
            const { answer } = await inquirer.prompt({
                name: "answer",
                type: "list",
                message: `${i + 1}) ${quiz[i].question}`,
                choices: quiz[i].answers,
            });
            if (answer) {
                const answerIndex = quiz[i].answers.indexOf(answer);
                result.push(answerIndex === quiz[i].correctAnswer);
                i++;
                showQuiz();
            }
            else {
                console.log(chalk.white.bgRed(`Invalid Selection\n`));
            }
        }
    }
    showQuiz();
}
async function askForOperation() {
    const answer = await inquirer.prompt({
        name: "operation",
        type: "list",
        message: "Choose the Subject",
        choices: ["Physics", "Technology", "Biology", "English Grammar", "Exit"],
    });
    if (answer.operation === "Exit") {
        process.exit();
    }
    else if (answer.operation === "Physics") {
        startQuiz("Physics", physicsQuiz);
    }
    else if (answer.operation === "Technology") {
        startQuiz("Technology", technologyQuiz);
    }
    else if (answer.operation === "Biology") {
        startQuiz("Biology", biologyQuiz);
    }
    else if (answer.operation === "English Grammar") {
        startQuiz("English Grammar", englishGrammarQuiz);
    }
}
try {
    console.clear();
    welcome();
    await sleep();
    rainbowTitle.stop();
    await guide();
    await askForOperation();
}
catch (error) {
    console.log("ERROR: ", error);
}
//# sourceMappingURL=app.mjs.map