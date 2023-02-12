class Player {
    health;
    attackDamage;
    numHealthPotions;
    healthPotionHealAmount;
    healthPotionDropChance;
    running;
    constructor() {
        this.health = 100;
        this.attackDamage = 50;
        this.numHealthPotions = 3;
        this.healthPotionHealAmount = 3;
        this.healthPotionDropChance = 3;
        this.running = true;
    }
    attacked(damage) {
        this.health -= damage;
    }
    usePotion() {
        this.health += this.healthPotionHealAmount;
        this.numHealthPotions--;
    }
    takeEnemyHealthPotion() {
        this.numHealthPotions++;
    }
}
export default Player;
//# sourceMappingURL=Player.js.map