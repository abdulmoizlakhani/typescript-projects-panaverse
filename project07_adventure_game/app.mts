#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

import Enemy from "./classes/Enemy.mjs";
import Player from "./classes/Player.mjs";
import * as utils from "./utils.mjs";

let rainbowTitle: chalkAnimation.Animation;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function welcome() {
  const msg = `DUNGEON MASTER`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    rainbowTitle = chalkAnimation.rainbow(
      "Welcome to Dungeon Master! (A CLI based adventure game developed by amlakhani)"
    );
  });
}

async function startGame() {
  const player = new Player();

  while (player.running) {
    const enemy = new Enemy();
    console.log("\n");
    console.log(chalk.white.bgBlue("*---------------------------------*"));

    console.log(
      chalk.whiteBright.bgRed(`\n   # ${enemy.enemyName} appeared! #\n`)
    );

    GAME: while (enemy.enemyHealth > 0) {
      console.log(`   Your HP: ${chalk.green(player.health)}`);
      console.log(
        `   ${enemy.enemyName}'s HP: ${chalk.blue(enemy.enemyHealth)}\n`
      );

      // console.log(`${chalk.black.bgYellow("WHAT WOULD YOU LIKE TO DO?")}`);

      const { option } = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices: ["Attack", "Drink health potion", "Run!"],
      });

      if (option === "Attack") {
        let damageDealt = utils.getRandomNumber(player.attackDamage);
        let damageTaken = utils.getRandomNumber(enemy.enemyAttackDamage);
        enemy.attacked(damageDealt);
        player.attacked(damageTaken);

        console.log(
          chalk.white.bgCyan(
            `\n   > You strike the ${enemy.enemyName} for ${damageDealt} damage.`
          )
        );
        console.log(
          chalk.white.bgMagenta(
            `\n   > You received ${damageTaken} damage in retaliation.\n`
          )
        );

        if (player.health < 1) {
          console.log(chalk.red(
            `   > You have taken too much damage, you are too weak to go on!\n`
          ));
          break;
        }
      } else if (option === "Drink health potion") {
        if (player.numHealthPotions > 0) {
          player.usePotion();
          console.log(
            chalk.green(
              `   > You drank a health potion, healing yourself for ${player.healthPotionHealAmount}.\n`
            )
          );
          console.log(chalk.green(`   > You now have ${player.health} HP.\n`));
          console.log(
            chalk.green(
              `   > You have ${player.numHealthPotions} health potions left.\n`
            )
          );
        } else {
          console.log(
            chalk.red(
              `   > You have no health potions left! Defeat enemies for a chance to get one!\n`
            )
          );
        }
      } else {
        console.log(
          chalk.blue(`   You run away from the enemy ${enemy.enemyName}!\n`)
        );
        continue GAME;
      }
    }

    if (player.health < 1) {
      chalk.red(`   > You limp out of the dungeon, weak from battle.\n`);
      break;
    }

    console.log(chalk.white.bgBlue("*---------------------------------*"));

    console.log(
      chalk.white.bgRed(`\n   # ${enemy.enemyName} was defeated! #\n`)
    );
    console.log(
      chalk.white.bgGreen(`   # You have ${player.health} HP left. #\n`)
    );

    if (utils.getRandomNumber(100) < player.healthPotionDropChance) {
      player.takeEnemyHealthPotion();
      console.log(
        chalk.green(`   # The ${enemy.enemyName} dropped a health potion! #\n`)
      );
      console.log(
        chalk.green(
          `   # You now have ${player.numHealthPotions} health potion(s). #\n`
        )
      );
    }

    const { option } = await inquirer.prompt({
      name: "option",
      type: "list",
      message: "What would you like to do now?",
      choices: ["Continue fighting", "Exit dungeon"],
    });

    if (option === "Continue fighting") {
      console.log(chalk.green(`\n   > You continued your adventure!\n`));
    } else {
      console.log(chalk.green(
        `\n   > You exit the dungeon, successfully from your adventures!`
      ));
      player.exit();
      break;
    }
    console.log("\n");
  }

  console.log(chalk.white.bgBlue("*##################################*"));
  console.log(chalk.white.bgBlue("*#       THANKS FOR PLAYING!      #*"));
  console.log(chalk.white.bgBlue("*##################################*"));
}

try {
  console.clear();
  welcome();
  await sleep();
  rainbowTitle.stop();
  await startGame();
} catch (error) {
  console.log("ERROR: ", error);
}
