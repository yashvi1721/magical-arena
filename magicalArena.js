// Defines a Gladiator class with health, strength, and attack attributes
class Gladiator {
    constructor(health, strength, attack) {
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    // Rolls a die and returns the result
    rollAttackDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Rolls a die and returns the result
    rollDefenseDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Calculates the damage dealt by an attack roll
    calculateDamage(roll) {
        return this.attack * roll;
    }

    // Calculates the defense strength of a defense roll
    calculateDefense(roll) {
        return this.strength * roll;
    }

    // Reduces the health of gladiator by specified amount
    takeDamage(damage) {
        this.health -= damage;
    }
}

// Defines a Battle class that states match between two gladiators
class Battle {
    constructor(gladiator1, gladiator2) {
        this.gladiator1 = gladiator1;
        this.gladiator2 = gladiator2;
        this.currentGladiator = this.gladiator1.health < this.gladiator2.health ? this.gladiator1 : this.gladiator2;
        this.winner = null;
    }

    // Rolls die and returns the result
    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Plays a turn of the match
    playTurn() {
        const attacker = this.currentGladiator;
        const defender = attacker === this.gladiator1 ? this.gladiator2 : this.gladiator1;

        // Rolls dice and calculates damage and defense strength
        const attackRoll = attacker.rollAttackDice();
        const defenseRoll = defender.rollDefenseDice();
        const attackDamage = attacker.calculateDamage(attackRoll);
        const defenseStrength = defender.calculateDefense(defenseRoll);

        // Reduces defender's health by damage dealt
        const damageDealt = Math.max(0, attackDamage - defenseStrength);
        defender.takeDamage(damageDealt);

        // Checks if game is over and sets the winner
        if (defender.health <= 0) {
            this.winner = attacker;
        } else {
            this.currentGladiator = defender;
        }
    }

    // Checks if the match is over
    isGameOver() {
        return this.winner !== null;
    }
}

// Defines Arena class that manages matches b/w gladiators
class Arena {
    constructor() {
        this.gladiators = [];
        this.battles = [];
    }

    // Adding a gladiator to arena
    addGladiator(gladiator) {
        this.gladiators.push(gladiator);
    }

    // Starts a battle b/w two gladiators
    startBattle(gladiator1Index, gladiator2Index) {
        const gladiator1 = this.gladiators[gladiator1Index];
        const gladiator2 = this.gladiators[gladiator2Index];
        const battle = new Battle(gladiator1, gladiator2);
        this.battles.push(battle);

        // Plays turns until the match is over
        while (!battle.isGameOver()) {
            battle.playTurn();
        }

        // Logs the winner of match
        console.log(`Winner: Gladiator ${battle.winner === gladiator1 ? 1 : 2}`);
    }
}

const arena = new Arena();
const gladiatorA = new Gladiator(50, 5, 10);
const gladiatorB = new Gladiator(100, 10, 5);
arena.addGladiator(gladiatorA);
arena.addGladiator(gladiatorB);
arena.startBattle(0, 1);
