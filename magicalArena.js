// Defines a Player class with health, strength, and attack attributes
class Player {
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

    // Reduces the health of player by specified amount
    takeDamage(damage) {
        this.health -= damage;
    }
}

// Defines a Match class that states match between two players
class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1.health < this.player2.health ? this.player1 : this.player2;
        this.winner = null;
    }

    // Rolls  die and returns the result
    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Plays a turn of the match
    playTurn() {
        const attacker = this.currentPlayer;
        const defender = attacker === this.player1 ? this.player2 : this.player1;

        // Rolls dice and calculates damage and defense strength
        const attackRoll = attacker.rollAttackDice();
        const defenseRoll = defender.rollDefenseDice();
        const attackDamage = attacker.calculateDamage(attackRoll);
        const defenseStrength = defender.calculateDefense(defenseRoll);

        // Reduces defenders health by damage dealt
        const damageDealt = Math.max(0, attackDamage - defenseStrength);
        defender.takeDamage(damageDealt);

        // Checks if game is over and give the winner
        if (defender.health <= 0) {
            this.winner = attacker;
        } else {
            this.currentPlayer = defender;
        }
    }

    // Checks if the match is over
    isGameOver() {
        return this.winner !== null;
    }
}

// Defines Magical Arena class that manages matches b/w players
class MagicalArena {
    constructor() {
        this.players = [];
        this.matches = [];
    }

    // Adding a player to arena
    addPlayer(player) {
        this.players.push(player);
    }

    // Starts a match b/w two players
    startMatch(player1Index, player2Index) {
        const player1 = this.players[player1Index];
        const player2 = this.players[player2Index];
        const match = new Match(player1, player2);
        this.matches.push(match);

        // Plays turns until the match is over
        while (!match.isGameOver()) {
            match.playTurn();
        }

        // Logs the winner of match
        console.log(`Winner: Player ${match.winner === player1 ? 1 : 2}`);
    }
}


const arena = new MagicalArena();
const playerA = new Player(50, 5, 10);
const playerB = new Player(100, 10, 5);
arena.addPlayer(playerA);
arena.addPlayer(playerB);
arena.startMatch(0, 1);
