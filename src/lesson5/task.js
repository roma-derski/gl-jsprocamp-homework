
// helper. May be useful when need to select random monster, if you need it

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// function getRandomMonster() {
//   const monsterIndex = Math.floor(Math.random() * 3);
//   const monsterClass = ['zombie', 'skeleton', 'holem'][monsterIndex];
//   return monsterClass;
// }
// end of Monsters 

// Hero and Monsters constructors
const Hero = function(name, charClass) {
  if (heroClasses.hasOwnProperty(charClass)) {
    this.heroName = name;
    Object.assign(this, heroClasses[charClass]);
    this.getName = function(){
      return this.heroName;
    };
    this.getCharClass = function(){
      return this.charClass;
    };
  }
  else throw new Error("Incorrect character class provided");
};

const Monster = function(charClass) {
  if (monsterClasses.hasOwnProperty(charClass)) {
    Object.assign(this, monsterClasses[charClass]);
    this.getName = function(){
      return (`I am ${this.charClass} I don\`t have name`);
    };
    this.getCharClass = function(){
      return this.charClass;
    };
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


const statuses = {
	idle      : "Idle",
	progress  : "In progress",
	finished  : "Finished"
};

const Game = function() {
  this.monsters = [];
  this.lives = 0;
  this.status = statuses.idle;
};

Game.prototype.addHero = function(hero) {
  console.log(hero);
  const heroId = hero.charClass.toLowerCase();
  if (!heroClasses.hasOwnProperty(heroId)) {
    throw new Error ("Only hero instance can be hero");
  }
  else if (this.hero) {
    throw new Error ("Only one hero can exist");
  }
  else {
    // const heroName = prompt('Name your Hero:', 'Chuck Norris');
    // const heroClass = prompt('What is your Hero?', 'warrior|rogue|sorcerer');
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
    this.lives += monster.life;
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

Game.prototype.fight = function() {
  if (this.status !== statuses.progress) throw new Error("Begin your journey to start fighting monsters");
  // if (enemy.life === 0) return "Monster win";
  // else if (game.lives === 0) return "Hero win";
};




/* Game Population mechanism should go below */


/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster
};
