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
let lives = 1;
let hitCooldown = 0;
let explosions;
let explosionImg;
let score = 0;
let gameStarted = true;
let retryButton;
let retryImg;
let retryHovImg;
let gameBut;
let overBut;
let gameImg;
let overImg;
let texts;
//also i keep forgeting to put the lets accordingly, if you don't do that it throws an error
q5.preload = function() {
	playerImg = loadImage("images/greenjet.png");
	damagejet1 = loadImage("images/Damagejet1.png");
	damagejet2 = loadImage("images/damagejet2.png");
	damagejet3 = loadImage("images/Damagejet3.png");
	wizardImg = loadImage("images/redwizard.png");
	explosionImg = loadImage("images/explosion.png");
	retryImg = loadImage('images/retryButon.png'); //i've always used single quotes theyre easier
    retryHovImg = loadImage('images/retryHovered.png'); //i wonder why it puts the relative path with a backslash and you have to reverse it
	gameImg = loadImage('images/GAMEtxt.png');
	overImg = loadImage('images/OVERtxt.png'); //kms loading every image is so much work
	
}
//i wonder why java needs semicolons with every statement and javascript doesnt

q5.setup = async function() {
	await Canvas(400,800);
	//this weird await function is magical if you change it it turns black
	frameRate(60);
	player = new Sprite();
	player.w = 80;
	player.h = 75;
	player.image = playerImg;
	player.image.scale = 3;
	player.debug = true; //is this debug thing what's making those colorful boxes on each sprite
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

	texts = new Group(); //this makes all the text buttons like the game over text images and the retry button
	texts.w = 64;
	texts.h = 32;
	texts.layer = 1;
	texts.collider = 'k'

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
		shootDelay = 30;
		shotBullet.collider = 'k';
	}
}
function explosion(x,y){
	let boom = new explosions.Sprite();
	boom.x = x;
	boom.y = y;
}
function gameEnd(){
	if (gameStarted) {//this stuff SHOULD make the text buttons 
		let gameBut = new texts.Sprite();
		gameBut.image = gameImg
		gameBut.x = -50
		gameBut.y = -50;
		gameBut.image.scale = 10
		let overBut = new texts.Sprite();
		overBut.image = overImg
		overBut.x = 50
		overBut.y = -50;
		overBut.image.scale = 10
		let retryButton = new texts.Sprite();
		retryButton.image = retryImg
		retryButton.x = 0
		retryButton.y = 150;
		retryButton.image.scale = 12
		//XD you have to try and catch the retry button before it leaves the screen
	}
	if (retryButton.mouse.hovering){
		retryButton.image=retryHovImg
	} else {
		retryButton.image=retryImg
	}
	gameStarted = false;
	
}
//i just found out that you could use the browser inspect console to find out whats wrong when it goes black
q5.draw = function () {
	background('skyblue');
	if (gameStarted){
	playerControls(); //so now you can only move if the game is going
	}
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
	} else if (lives === 0) {
		player.image = damagejet3; //i made it so ur able to get hir three times and then explode on the fourth
	} else {
		player.image=explosionImg;
		gameEnd();
	};
	//code that ai made, spawns enemies often and when shot they fly in a random direction before disappearing
	if (enemySpawnTimer <= 0 && gameStarted) {
		let enemy = new wizardGroup.Sprite();
		enemy.x = random(-width/2 + 50,  width/2 - 50);
		enemy.y = -400 + wizardGroup.w;
		enemy.velocity.y = 2;
		enemy.collider = 'k';
		enemy.dead = false;
		enemySpawnTimer = 30;
	}
	enemySpawnTimer --;
	
	bullet.overlap(wizardGroup, function(b, w) {
		w.dead = true;
		w.velocity.x = random(-15, 15);
		w.velocity.y = random(-15, 15);
		w.rotationSpeed = random(-15,15);
		explosion(w.x,w.y);
		//bulllets will stay if they hit someone because its cool like plinko
		b.life=15
		//made it so the wizards don't disappear immediately 
		w.life = 30;
		score = score + 5;
	});
	//super cool code i made that makes the wizards run into each other and explode them
	wizardGroup.overlap(wizardGroup, function(a, b) {
		if (a !== b && a.dead && !b.dead) {
			b.life = 0;
			explosion(b.x,b.y);
			score = score + 10;
		}
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
	text('Lives: ' + lives, -170, -370);
	text ("Score: " + score, -170, -350);
};
