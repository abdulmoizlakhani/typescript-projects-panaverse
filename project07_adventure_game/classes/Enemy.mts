import * as utils from "../utils.mjs";

class Enemy {
  private enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];

  enemyHealth: number;
  maxEnemyHealth: number;
  enemyAttackDamage: number;
  enemyName: string;

  constructor() {
    this.maxEnemyHealth = 75;
    this.enemyAttackDamage = 75;
    this.enemyHealth = utils.getRandomNumber(this.maxEnemyHealth);
    this.enemyName = this.enemies[utils.getRandomNumber(this.enemies.length)];
  }

  public attacked(damage: number) {
    this.enemyHealth -= damage;
  }
}

export default Enemy;
