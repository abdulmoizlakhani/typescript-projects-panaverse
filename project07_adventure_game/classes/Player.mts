class Player {
  health: number;
  attackDamage: number;
  numHealthPotions: number;
  healthPotionHealAmount: number;
  healthPotionDropChance: number;

  running: boolean;

  constructor() {
    this.health = 100;
    this.attackDamage = 50;
    this.numHealthPotions = 3;
    this.healthPotionHealAmount = 3;
    this.healthPotionDropChance = 3;
    this.running = true;
  }

  public attacked(damage: number) {
    this.health -= damage;
  }

  public usePotion() {
    this.health += this.healthPotionHealAmount;
    this.numHealthPotions--;
  }

  public takeEnemyHealthPotion() {
    this.numHealthPotions++;
  }

  public exit() {
    this.running = false;
  }
}

export default Player;
