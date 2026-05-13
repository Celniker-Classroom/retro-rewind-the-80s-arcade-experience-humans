let playerSpeed = 5;
let playerImg;
let player;
q5.preload = function() {
	playerImg = loadImage("images/greenjet.png");
}

q5.setup = async function() {
	await Canvas();
	player = new Sprite();
	player.w = 30;
	player.h = 75;
	player.image = playerImg;
}

function playerMovement() {
	player.velocity.x = 0;
	player.velocity.y = 0;
	if (kb.pressing('w')) {
		player.velocity.y = -1 * playerSpeed;
	}
	else if (kb.pressing('s')) {
		player.velocity.y = 1 * playerSpeed;
	}
	if (kb.pressing("a")) {
		player.velocity.x = -1 * playerSpeed;
	}
	else if (kb.pressing("d")) {
		player.velocity.x = 1 * playerSpeed;
	}
}

q5.draw = function () {
	background('skyblue');
	playerMovement();
};
