let playerSpeed = 5;
let playerImg;
let player;
let bullet;
let wizardGroup;
let shootDelay = 0;
let enemySpawnTimer = 0;

q5.preload = function() {
	playerImg = loadImage("images/greenjet.png");
	wizardImg = loadImage("images/wizard.png");
}

q5.setup = function() {
	Canvas();
	frameRate(60);
	player = new Sprite();
	player.w = 80;
	player.h = 75;
	player.image = playerImg;
	player.image.scale = 3;
	player.debug = true;
	player.rotationLock = true;
	player.x = width / 2;
	player.y = height - 100;

	bullet = new Group();
	bullet.w = 10;
	bullet.h = 30;
	bullet.collider = 'k';

	wizardGroup = new Group();
	wizardGroup.w = 80;
	wizardGroup.h = 80;
	wizardGroup.collider = 'k';
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
		shotBullet.velocity.y = -10;
		shotBullet.x = player.x;
		shotBullet.y = player.y - player.height/2;
		shootDelay = 30;
		shotBullet.collider = 'k';
	}
}

//i wont even lie bro i had to use ai for all of this i didnt know how to like make them spawn at intervals and die correctly
function spawnWizard() {
	let enemy = new wizardGroup.Sprite();
	enemy.image = wizardImg;
	enemy.image.scale = 2;
	enemy.x = random(50, width - 50);
	enemy.y = -50;
	enemy.velocity.y = 2;
	enemy.debug = false;
	
	enemy.isShot = false;
	enemy.shotTime = null;
}

function handleBulletHit(shotBullet, wizard) {
	if (!wizard.isShot) {
		wizard.isShot = true;
		wizard.shotTime = millis();
	}
	shotBullet.remove();
}

q5.draw = function () {
	background('skyblue');
	playerControls();
	shootDelay --;

	if (enemySpawnTimer <= 0) {
		spawnWizard();
		enemySpawnTimer = 120;
	}
	enemySpawnTimer --;

	bullet.overlap(wizardGroup, handleBulletHit);

	wizardGroup.forEach(function(wizard) {
		//this should remove the wizard 5 seconds after being shot so it can fly around crazy for a bit before disappearing
		if (wizard.isShot && wizard.shotTime && millis() - wizard.shotTime >= 5000) {
			wizard.remove();
		}
	});
};
