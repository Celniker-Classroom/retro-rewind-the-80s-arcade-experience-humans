let playerSpeed = 7;
let playerImg;
let damagejet1;
let damagejet2;
let damagejet3;
let wizardImg;
let player;
let bullet;
let shootDelay = 0;
let enemySpawnTimer = 0;
let wizardGroup;
let lives = 3;
let hitCooldown = 0;
let explosions;
let explosionImg;
//also i keep forgeting to put the lets accordingly, if you don't do that it throws an error
q5.preload = function() {
	playerImg = loadImage("images/greenjet.png");
	damagejet1 = loadImage("images/Damagejet1.png");
	damagejet2 = loadImage("images/damagejet2.png");
	damagejet3 = loadImage("images/Damagejet3.png");
	wizardImg = loadImage("images/redwizard.png");
	explosionImg = loadImage("images/explosion.png");
}

q5.setup = async function() {
	await Canvas();
	//this weird await function is magical if you change it it turns black
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
	wizardGroup = new Group();
	wizardGroup.debug = true;
	wizardGroup.w = 70;
	wizardGroup.h = 70;
	wizardGroup.image = wizardImg;
	//idk why but this image is soooo tiny
	wizardGroup.image.scale=8

	explosions = new Group();
	explosions.w = 70;
	explosions.h = 70;
	explosions.image = explosionImg;
	explosions.collider = 'static';
	explosions.layer = 1;
	explosions.debug = true;
	explosions.image.scale = 2;
	explosions.life = 10;
	explosions.overlaps(wizardGroup);
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
		shotBullet.velocity.y = -18;
		shotBullet.x = player.x;
		shotBullet.y = player.y - player.height/2;
		shootDelay = 10;
		shotBullet.collider = 'k';
	}
}
function explosion(x,y){
	let boom = new explosions.Sprite();
	boom.x = x;
	boom.y = y;
}
//i just found out that you could use the browser inspect console to find out whats wrong when it goes black
q5.draw = function () {
	background('skyblue');
	playerControls();
	shootDelay --;
	hitCooldown --;
	//for some reason the image keeps resetting to the original one, so I have to set it every frame
	//call gordon ramsey because i am cooking up some spaghetti 
	//as in spaghetti code
	//get it? 
	player.image.scale = 3;
	if (lives === 3) {
		player.image = playerImg;
	} else if (lives === 2) {
		player.image = damagejet1;
	} else if (lives === 1) {
		player.image = damagejet2;
	} else {
		player.image = damagejet3;
	};
	//code that ai made, spawns enemies often and when shot they fly in a random direction before disappearing
	if (enemySpawnTimer <= 0) {
		let enemy = new wizardGroup.Sprite();
		enemy.x = random(-width/2 + 50,  width/2 - 50);
		enemy.y = -50;
		enemy.velocity.y = 2;
		enemy.collider = 'k';
		enemySpawnTimer = 30;
	}
	enemySpawnTimer --;
	
	bullet.overlap(wizardGroup, function(b, w) {
		w.velocity.x = random(-15, 15);
		w.velocity.y = random(-15, 15);
		w.rotationSpeed = random(-15,15);
		explosion(w.x,w.y);
		b.life = 0;
	});
	//so that you don't get hit by the same wizard a bunch of times
	player.overlap(wizardGroup, function(p, w) {
		if (hitCooldown <= 0) {
			lives --;
			hitCooldown = 60;
		}
		w.life = 0;
		explosion(w.x,w.y)
	});
	//replace this with the heart stuff, make the normal hearts be a random broken heart image upon damage
	fill('black');
	textSize(20);
	text('Lives: ' + lives, 10, 30);
};
