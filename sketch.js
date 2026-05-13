let playerSpeed = 5;
let playerImg;
let player;
let bullet;
let shootDelay = 0;
q5.preload = function() {
	playerImg = loadImage("images/greenjet.png");
}

q5.setup = async function() {
	await Canvas();
	frameRate(60);
	player = new Sprite();
	player.w = 80;
	player.h = 75;
	player.image = playerImg;
	player.image.scale = 3;
	player.debug = true;
	player.rotationLock = true;
	bullet = new Group();
	bullet.w = 10;
	bullet.h = 30;
	bullet.collider = 'k';
}

function playerControls() {
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
	if (kb.pressing("space") && shootDelay < 1){
		let shotBullet = new bullet.Sprite();
		shotBullet.velocity.y = -5;
		shotBullet.x = player.x;
		shotBullet.y = player.y - player.height/2;
		shootDelay = 30;
		shotBullet.collider = 'k';
	}
}

q5.draw = function () {
	background('skyblue');
	playerControls();
	shootDelay --;
};
