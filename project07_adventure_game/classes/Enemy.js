import * as utils from "../utils.js";
class Enemy {
    enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    enemyHealth;
    maxEnemyHealth;
    enemyAttackDamage;
    enemyName;
    constructor() {
        this.maxEnemyHealth = 75;
        this.enemyAttackDamage = 75;
        this.enemyHealth = utils.getRandomNumber(this.maxEnemyHealth);
        this.enemyName = this.enemies[utils.getRandomNumber(this.enemies.length)];
    }
    attacked(damage) {
        this.enemyHealth -= damage;
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map