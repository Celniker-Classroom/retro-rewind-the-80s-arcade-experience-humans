let moveMapping = [['w',0,1], ['a',-1,0], ['s',0,-1], ['d',1,0]];
let playerSpeed = 5;
await Canvas();

let player = new Sprite();
player.w = 30;
player.h = 75;

function playerMovement(){
	if (keyIsPressed){
	let move = moveMapping.findIndex((input) => moveMapping[input][0] = key);
	// alert(key);
	// alert(move);
	player.velocity.x = moveMapping[move][1] * playerSpeed;
	player.velocity.y = moveMapping[move][2] * playerSpeed;
	}
}

q5.update = function () {
	background('skyblue');
	playerMovement();
};
