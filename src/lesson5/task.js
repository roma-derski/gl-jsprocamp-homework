
const heroClasses = {
	warrior: { charClass: "Warrior",	life: 30,	damage: 4 },
	rogue: { charClass: "Rogue", life: 25, damage: 3 },
	sorcerer: {	charClass: "Sorcerer", life: 20, damage: 5 }
};

// Monsters classes and randomizer
const monsterClasses = {
	zombie: { charClass: "Zombie", life: 8, damage: 4	},
	skeleton: {	charClass: "Skeleton", life: 10, damage: 6 },
	holem: { charClass: "Holem", life: 15, damage: 6 }
};

// Hero and Monsters constructors
const Hero = function(name, charClass) {
  if (heroClasses.hasOwnProperty(charClass)) {
    this.heroName = name;
    Object.assign(this, heroClasses[charClass]);
    this.getName = function(){ return this.heroName; };
    this.getCharClass = function(){ return this.charClass; };
  }
  else throw new Error("Incorrect character class provided");
};

const Monster = function(charClass) {
  if (monsterClasses.hasOwnProperty(charClass)) {
    Object.assign(this, monsterClasses[charClass]);
    this.getName = function(){ return (`I am ${this.charClass} I don\`t have name`); };
    this.getCharClass = function(){ return this.charClass; };
  }
  else throw new Error("Incorrect character class provided");
};


Hero.prototype.attack = function(enemy) {
    if (enemy instanceof Hero) return "I will attack only monsters";
    else {
      enemy.life = Math.max(enemy.life - this.damage, 0);
      if (!enemy.life) return (`Hero attacked, ${enemy.charClass} killed`);
      return (`Hero attacked, done ${this.damage} damage to ${enemy.charClass}`);
    }
  };  
  
Monster.prototype.attack = function(enemy) {
    if (enemy instanceof Monster) return "I will attack only Hero";
    else {
      enemy.life = Math.max(enemy.life - this.damage, 0);
      if (!enemy.life) return (`${this.charClass} attacked, Hero killed`);
      return (`${this.charClass} attacked, done ${this.damage} damage to ${enemy.charClass}`);
    }
  };  

// GENERAL_ATTACK_MESSAGE
//    "CHARACTER_CLASS killed" - this action will kill target
//    "done AMOUNT_OF_DAMAGE damage to CHARACTER_CLASS";

const statuses = {
	idle      : "Idle",
	progress  : "In progress",
	finished  : "Finished"
};

const Game = function() {
  this.monsters = [];
  this.status = statuses.idle;
};

Object.defineProperty(Game.prototype, 'lives', {
  get: function() {
    return this.monsters[0].life + this.monsters[1].life;
  }
});

Game.prototype.addHero = function(hero) {
  const heroId = hero.charClass.toLowerCase();
  if (!heroClasses.hasOwnProperty(heroId)) throw new Error ("Only hero instance can be hero");
  else if (this.hero) throw new Error ("Only one hero can exist");
  else {
    this.hero = hero;
    return ("Hero created, welcome %s", this.hero.heroName);
  }
};

Game.maxMonsters = 2;
Game.prototype.addMonster = function(monster) {
  const monsterId = monster.charClass.toLowerCase();
  if (!monsterClasses.hasOwnProperty(monsterId)) {
    throw new Error ("Only monster Instances can become monsters");
  }
  else if (this.monsters.length === Game.maxMonsters) {
    throw new Error (`Only ${Game.maxMonsters} monsters can exist`);
  }
  else { 
    this.monsters.push(monster);
    return (`Monster Created, ${monster.charClass} appeared in the world`);
  }
};
  
Game.prototype.beginJourney = function() {
  if (this.hero && (this.monsters.length === Game.maxMonsters)) {
    this.status = statuses.progress;
    return "Your journey has started, fight monsters";
  }
  throw new Error ("Cannot start journey, populate the world with hero and monsters first");
};

Game.prototype.finishJourney = function() {
  if (this.hero.life === 0) {
    this.status = statuses.finished;
    return "The Game is finished. Hero is dead :(";
  }
  else if (this.monsters[0].life + this.monsters[1].life === 0) {
    return "The Game is finished. Monsters are dead. Congratulations";
  }
  else return "Don`t stop. Some monsters are still alive. Kill`em all";
};

Game.prototype.fight = function() {
  if (this.status !== statuses.progress) {
    throw new Error("Begin your journey to start fighting monsters");
  }
  
  let currentMonster;
  if (this.monsters[0].life) currentMonster = this.monsters[0];
  else if (this.monsters[1].life) currentMonster = this.monsters[1];
  
  while (this.hero.life && currentMonster.life) {
    this.hero.attack(currentMonster);
    if (currentMonster.life) currentMonster.attack(this.hero);
  }
  if (!this.hero.life) return "Monster win";
  else if (!currentMonster.life) return "Hero win";
};


/* Game Population mechanism should go below */

Game.prototype.populate = function() {
  const heroName = prompt('Name your Hero:', 'Chuck Norris');
  const heroClass = prompt('What is your Hero?', 'warrior | rogue | sorcerer | random').toLowerCase().trim();
  if (heroClass === 'random') this.addRandomHero(heroName);
  else {
    const theHero = new Hero(heroName, heroClass);
    this.addHero(theHero);
  }
  
  while (this.monsters.length < 2) {
    const monsterClass = prompt(`What is your Monster ${this.monsters.length+1}?`, 'zombie | skeleton | holem | random').toLowerCase().trim();
    if (monsterClass === 'random') this.addRandomMonster();
    else {
      const theMonster = new Monster(monsterClass);
      this.addMonster(theMonster);
    }
  }
};

Game.prototype.addRandomHero = function(heroName) {
  const heroIndex = Math.floor(Math.random() * 3);
  const heroClass = ['warrior', 'rogue', 'sorcerer'][heroIndex];
  const randomHero = new Hero(heroName, heroClass);
  this.addHero(randomHero); 
};

Game.prototype.addRandomMonster = function() {
  const monsterIndex = Math.floor(Math.random() * 3);
  const monsterClass = ['zombie', 'skeleton', 'holem'][monsterIndex];
  const randomMonster = new Monster(monsterClass);
  this.addMonster(randomMonster); 
};

/* End of solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster
};
