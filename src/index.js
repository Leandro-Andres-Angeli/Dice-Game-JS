const rollDiceBtn = document.querySelector('.roll-dice-btn');
const diceGrid = document.querySelector('.dice-grid');
const reloadBtn = document.querySelector('.reload-btn');
let diceVal;
//USING OBJECT INSTEAD OF CLASSES EXAMPLE
//USING OBJECT INSTEAD OF CLASSES EXAMPLE
// const player = {
// 	points: 2,
// 	handlePoints(update) {
// 		return (this.points = this.points + update);
// 	},
// };
// function handleP(update) {
// 	return (this.points = this.points + update);
// }
// console.log(player.handlePoints(2));
// console.log(player);
// handleP.apply(player, [4]);
// console.log(player);
//USING OBJECT INSTEAD OF CLASSES EXAMPLE
//USING OBJECT INSTEAD OF CLASSES EXAMPLE

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
	reloadBtn.setAttribute('disabled', 'true');
});
const generateRandomNum = () => {
	diceVal = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	diceGrid.setAttribute('src', `./img/dice-${diceVal}.png`);
};
const winMsg = (winner) => {
	const winnerAlert = document.createElement('div');
	winnerAlert.classList.add(
		'bg-slate-50',
		'rounded-md',
		'shadow-lg',
		'self-center',
		'font-semibold',
		'w-1/3',
		'p-5',
		'mx-auto',
		'z-50',
		'absolute',
		'shadow-md',
		'border-black'
	);
	winnerAlert.style.zIndex = 50;
	winnerAlert.style.backgroundColor = 'white';
	winnerAlert.innerHTML = `<h2>Finished Game !! </h2> <ul>Winner ${
		winner.id + 1
	}
<li>

	Score:

	${winner.totalScore}

</li>
</ul>`;
	console.log('winneralert', winnerAlert);
	return document
		.querySelector('body')
		.insertAdjacentHTML('afterbegin', winnerAlert.outerHTML);
};
const handleEndGame = (winner) => {
	// console.log('end game');
	// console.log(winner);
	const btns = document.querySelectorAll('button');
	// console.log(btns);
	winMsg(winner);
	for (const btn of btns) {
		btn.getAttribute('disabled') !== null
			? btn.removeAttribute('disabled')
			: btn.setAttribute('disabled', 'true');
	}
	// const tagWinner = winMsg(winner);
	// console.log('winner', tagWinner);
	// document
	// 	.querySelector('body')
	// 	.insertAdjacentHTML('afterbegin', tagWinner.outerHTML);
};

rollDiceBtn.addEventListener('click', () => {
	generateRandomNum();
	const currentPlayer = playersList.filter((player) => player.status)[0];

	currentPlayer.updatePoints(diceVal !== 1 ? diceVal : undefined);
	// console.log(currentPlayer);
	updatePointsDom(currentPlayer);
	// console.log(currentPlayer);
	// console.log('render');
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
	// console.log(currentPlayer);
	let winner = playersList.find((p) => p.totalScore >= 30);

	// console.log(playersList);
	playersList.forEach((player) => {
		setPlayerStatus(player);
	});

	winner && handleEndGame(winner);
};
const holdBtn = document.querySelector('.hold-btn');
holdBtn.addEventListener('click', holdPoints);

reloadBtn.addEventListener('click', () => {
	location.reload();
});
