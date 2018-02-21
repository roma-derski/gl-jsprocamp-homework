// Hero classes
const heroClasses = {
	warrior: { charClass: "Warrior",	life: 30,	damage: 4 },
	rogue: { charClass: "Rogue", life: 25, damage: 3 },
	sorcerer: {	charClass: "Sorcerer", life: 20, damage: 5 }
};

// Monsters classes
const monsterClasses = {
	zombie: { charClass: "Zombie", life: 8, damage: 4	},
	skeleton: {	charClass: "Skeleton", life: 10, damage: 6 },
	holem: { charClass: "Holem", life: 15, damage: 6 }
};

// Char
const Char = function() {};

Char.prototype.getName = function(){ 
  return this.heroName || `I am ${this.charClass} I don\`t have name`; 
};
Char.prototype.getCharClass = function(){ return this.charClass; };

Char.prototype.attack = function(enemy) {
  let attacker, attacked;
  if (this instanceof Hero) {
    if (enemy instanceof Hero) return "I will attack only monsters";
    attacker = 'Hero';
    attacked = enemy.charClass;
  }  
  if (this instanceof Monster) {
    if (enemy instanceof Monster) return "I will attack only Hero";
    attacker = this.charClass;
    attacked = 'Hero';
  }
  enemy.life = Math.max(enemy.life - this.damage, 0);
  if (!enemy.life) return (`${attacker} attacked, ${attacked} killed`);
  return (`${attacker} attacked, done ${this.damage} damage to ${attacked}`);
};    
  

// Hero and Monster constructors
const Hero = function(name, charClass) {
  if (heroClasses.hasOwnProperty(charClass)) {
    this.heroName = name;
    Object.assign(this, heroClasses[charClass]);
  }
  else throw new Error("Incorrect character class provided");
};

const Monster = function(charClass) {
  if (monsterClasses.hasOwnProperty(charClass)) {
    Object.assign(this, monsterClasses[charClass]);
  }
  else throw new Error("Incorrect character class provided");
};

Hero.prototype = new Char();
Monster.prototype = new Char();
//--------------------------------

const statuses = {
	idle      : "Idle",
	progress  : "In progress",
	finished  : "Finished"
};

const Game = function() {
  this.monsters = [];
  this.status = statuses.idle;
};

Object.defineProperty(Game.prototype, 'monstersAlive', {
  get: function() {
    return this.monsters.some(monster => monster.life > 0);
  }
});

Game.prototype.addHero = function(hero) {
  const heroId = hero.charClass.toLowerCase();
  if (!heroClasses.hasOwnProperty(heroId)) throw new Error ("Only hero instance can be hero");
  else if (this.hero) throw new Error ("Only one hero can exist");
  else {
    this.hero = hero;
    return (`Hero created, welcome ${this.hero.heroName}`);
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
  else if (!this.monstersAlive) {
    return "The Game is finished. Monsters are dead. Congratulations";
  }
  else return "Don`t stop. Some monsters are still alive. Kill`em all";
};

Game.prototype.fight = function() {
  if (this.status !== statuses.progress) {
    throw new Error("Begin your journey to start fighting monsters");
  }
  
  if (!this.hero.life || !this.monstersAlive) return this.finishJourney();
  
  let currentMonster;
  for (let m of this.monsters) {
    if (m.life) {
      currentMonster = m;
      break;
    } 
  }
  
  while (this.hero.life && currentMonster.life) {
    this.hero.attack(currentMonster);
    if (currentMonster.life) currentMonster.attack(this.hero);
  }
  if (!this.hero.life) {
    this.status = statuses.finished;
    return "Monster win";
  }
  else if (!this.monstersAlive) {
    this.status = statuses.finished;
    return "Hero win";
  }
  return "Hero win";
};


/* Game Population mechanism should go below */

Game.prototype.populate = function() {
  const heroName = prompt('Name your Hero:', 'Chuck Norris');
  const heroClass = prompt('What is your Hero?', 'warrior | rogue | sorcerer | random').trim();
  if (heroClass === 'random') this.addRandomHero(heroName);
  else {
    const theHero = new Hero(heroName, heroClass);
    this.addHero(theHero);
  }
  
  while (this.monsters.length < Game.maxMonsters) {
    const monsterClass = prompt(`What is your Monster ${this.monsters.length+1}?`, 'zombie | skeleton | holem | random').trim();
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
