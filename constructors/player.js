function Player(id, age, college, draftPick, draftRound, name, position) {
	this.id = id;
	this.age = age;
	this.college = college;
	this.draftPick = draftPick;
	this.draftRound = draftRound;
	this.name = name;
	this.position = position;
}

module.exports = Player;