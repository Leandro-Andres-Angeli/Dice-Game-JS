const rollDiceBtn = document.querySelector('.roll-dice-btn');
const diceGrid = document.querySelector('.dice-grid');
let diceVal;

function Player(points = 0, id) {
	this.points = points;
	this.id = id;
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
	return (this.status = newStatus);
};
//importantComment
//TO ADD FUNCTION TO JS CLASS USE PROTOTYPE OR CREATE METHOD INSIDE CLASS
const player0 = new Player(undefined, 0);
const player1 = new Player(undefined, 1);
const setActivePlayer = (player, value) => {
	const playerCard = document.querySelector(`.player_${player.id}_cards`);
	console.log(player.id);
	console.log(playerCard);
	player.updateStatus(value);
	value === true &&
		playerCard.insertAdjacentHTML(
			'afterbegin',
			`<span class='text-red-500 text-sm bg-white absolute top-0 left-0 w-4/5 rounded-md'>Active Player${
				player.id + 1
			}</span>`
		);
};
window.addEventListener('load', () => {
	setActivePlayer(player0, true);
});
function generateRandomNum() {
	diceVal = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	diceGrid.setAttribute('src', `./img/dice-${diceVal}.png`);
}

rollDiceBtn.addEventListener('click', () => {
	generateRandomNum();
});
console.log(diceVal);
