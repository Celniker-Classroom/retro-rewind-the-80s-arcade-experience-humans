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
let hearts;
let heart1;
let heart2;
let heart3;
let heart4;
let heartImg;
let heartChunk1;
let heartChunk2;
let heartChunk3;
let heartholeImg;
let fireheartImg;
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
	heartImg = loadImage('images/heart.png');
	heartChunk1 = loadImage('images/heartchunk1.png');
	heartChunk2 = loadImage('images/heartchunk2.png');
	heartChunk3 = loadImage('images/heartchunk3.png');
	heartholeImg = loadImage('images/hearthole.png');
	fireheartImg = loadImage('images/fireheart.png');
	
}
//i wonder why java needs semicolons with every statement and javascript doesnt

/*
i still think that having the "continue? insert coin" thing
would be good for the porject because part of the rubric says our game has to be
fun and addictive.it'd be pretty easy to implement to, it'd just be a version of retrying
that doesn't reset the score. and maybe we can have a win condition where you win if you get 
100 points? idk i just really need to get perfect score on this i need an A here i'm so close to an A 
in the classit'd be pretty easy to 
*/

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
	player.x=0
	player.y=-50 //actually defined the players pos at the beginning
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
	texts.w//with this width and height the boxes should be less hollow = 640;
	texts.h = 320;
	texts.layer = 1;
	texts.collider = 'k'

	//making the hearts code for lives!
	hearts = new Group();
	hearts.overlaps(wizardGroup)
	hearts.overlaps(player) 
	hearts.overlaps(bullet)
	hearts.w=20;
	hearts.h=20;
	hearts.y=150
	hearts.physics=STATIC; //it took SO LONG to figure out how the colliding works
	hearts.image=heartImg;
	hearts.image.scale=1;
	heart1 = new hearts.Sprite();
	heart1.x=-175
	heart2 = new hearts.Sprite(); //i can resize the hearts if needed
	heart2.x=-145
	heart3 = new hearts.Sprite();
	heart3.x=-115
	heart4 = new hearts.Sprite();
	heart4.x=-85


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
		gameBut = new texts.Sprite();
		gameBut.image = gameImg
		gameBut.x = -50
		gameBut.y = -200;
		gameBut.image.scale = 10
		overBut = new texts.Sprite();
		overBut.image = overImg
		overBut.x = 50
		overBut.y = 0;
		overBut.image.scale = 10;
		retryButton = new texts.Sprite();
		retryButton.image = retryImg
		retryButton.x = 0 //i changed the positions of all these buttons
		retryButton.y = -100;
		retryButton.image.scale = 12
		//XD you have to try and catch the retry button before it leaves the screen
		if (retryButton) {
		console.log('button exists') //the button is working
		}
		if (retryButton.mouse){
        console.log('mouse exists') //this doesn't seem to be logging. the mouse doesn't exist 0.0
		}//i'm actually serious i have no idea what to do here. the mouse thing doesn't seem to be an actual thing in q5
	}
	//i think it's too old and there's no way to check if mouse is hovering over things anymore. it got deprecated
	//i'm just replacing it and now you have to press R
	if (!gameStarted) {
		if (kb.pressing('r')) {
			lives=3
			score=0
			player.x=0
			player.y=-50  //praying this works
			texts.deleteAll();
			wizardGroup.deleteAll();
			explosions.deleteAll();
			gameStarted = true;
			//HALLELUJAH IT WORKED. I AM MR. CODE.
			return
		}
	}
	gameStarted = false;
}

//i just found out that you could use the browser inspect console to find out whats wrong when it goes black
q5.draw = function () {
	background('skyblue'); //are we sticking with blue or should we make it black
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
		heart1.image=heartImg
		heart2.image=heartImg
		heart3.image=heartImg
		heart4.image=heartImg
	} else if (lives === 2) {
		player.image = damagejet1;
		heart1.image = heartChunk1;
	} else if (lives === 1) {
		player.image = damagejet2;
		heart2.image = heartholeImg;
	} else if (lives === 0) {
		player.image = damagejet3; //i made it so ur able to get hir three times and then explode on the fourth
		heart3.image = heartChunk2;
	} else {
		player.image=explosionImg;
		heart4.image=fireheartImg;
		gameEnd();
	};
	//code that ai made, spawns enemies often and when shot they fly in a random direction before disappearing
	if (enemySpawnTimer <= 0 && gameStarted) {
		let enemy = new wizardGroup.Sprite();
		enemy.x = random(-width/2 + 50,  width/2 - 50);
		enemy.y = -400 + wizardGroup.w;
		enemy.velocity.y = Math.floor(Math.random()*5)+1;
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
