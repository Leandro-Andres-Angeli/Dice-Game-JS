const rollDiceBtn = document.querySelector('.roll-dice-btn');
const diceGrid = document.querySelector('.dice-grid');
let diceVal;

function Player(points = 0, id) {
	this.points = points;
	this.id = id;
	this.totalScore = 0;
	this.status = false;

	//ADDING METHOD HERE BECOMES PART OF THE CLASS ,USING PROTOTYPE ADDS FUNCTION AVAILABLE TO CLASS BUT DOESN'T ATTACH IT TO  CLASS
	// this.addPoints = (updatedPoint = 0) =>
	// 	(this.points = this.points + updatedPoint);
	//ADDING METHOD HERE BECOMES PART OF THE CLASS ,USING PROTOTYPE ADDS FUNCTION AVAILABLE TO CLASS BUT DOESN'T ATTACH IT TO  CLASS
}
//importantComment TO ADD FUNCTION TO JS CLASS USE PROTOTYPE OR CREATE METHOD INSIDE CLASS
Player.prototype.updatePoints = function (newPoints = -this.points) {
	return (this.points = this.points + newPoints);
};
Player.prototype.updateStatus = function (newStatus = false) {
	console.log(newStatus);
	return (this.status = newStatus);
};
Player.prototype.updateTotalPoints = function (points) {
	return (this.totalScore = this.totalScore + points);
};

//importantComment
//TO ADD FUNCTION TO JS CLASS USE PROTOTYPE OR CREATE METHOD INSIDE CLASS
const player0 = new Player(undefined, 0);
const player1 = new Player(undefined, 1);
const updatePointsDom = (player) => {
	const playerCurrentScore = document.querySelector(
		`.player_${player.id}_current_score`
	);
	playerCurrentScore.innerText = player.points;
};
const setPlayerStatus = (player) => {
	const playerCard = document.querySelector(`.player_${player.id}_card`);

	// console.log(player.id);
	// console.log(playerCard);
	player.updateStatus(!player.status);
	player.status === true
		? document
				.querySelector(`.active-player-${player.id}`)

				.classList.remove('hidden')
		: document
				.querySelector(`.active-player-${player.id}`)
				.classList.add('hidden');
};

const playersList = [player0, player1];
window.addEventListener('load', () => {
	setPlayerStatus(player0);
});
const generateRandomNum = () => {
	diceVal = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	diceGrid.setAttribute('src', `./img/dice-${diceVal}.png`);
};

rollDiceBtn.addEventListener('click', () => {
	generateRandomNum();
	const currentPlayer = playersList.filter((player) => player.status)[0];

	currentPlayer.updatePoints(diceVal !== 1 ? diceVal : undefined);
	console.log(currentPlayer);
	updatePointsDom(currentPlayer);
	console.log(currentPlayer);
});
const holdPoints = () => {
	const currentPlayer = playersList.filter((player) => player.status)[0];
	const totalScore = document.querySelector(
		`.player_${currentPlayer.id}_total_score`
	);
	const currentScore = document.querySelector(
		`.player_${currentPlayer.id}_current_score`
	);
	currentPlayer.updateTotalPoints(currentPlayer.points);
	totalScore.innerText = currentPlayer.totalScore;

	currentPlayer.updatePoints();
	currentScore.innerText = currentPlayer.points;
	console.log(currentPlayer);

	console.log(playersList);
	playersList.forEach((player) => {
		setPlayerStatus(player);
	});
};
const holdBtn = document.querySelector('.hold-btn');
holdBtn.addEventListener('click', holdPoints);
