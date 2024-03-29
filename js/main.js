
var canvas = document.getElementById("canvas");
var cx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");
canvas.style.marginLeft = 35+"px";
//basic coordinates
var tankWidth = 90;
var tankHeight = 60;
var tubeWidth = 60;
var tubeHeight = 6;
var bulletWidth = 20;
var bulletHeight = 8;
var playerActive = 1;
var tankOneAngle = 25;
var tankTwoAngle = 25;


//For Scores
var playerOneScore = 0;
var playerTwoScore = 0;

//To produce the hill
var x1 = 350 + Math.random() * 50;
var y1 = 450 - Math.random() * 50;
var x2 = 650 + Math.random() * 70;
var y2 = 320 - Math.random() * 100;
var x3 = 1050 + Math.random() * 30;
var y3 = 480 - Math.random() * 20;

//conditions for operations
var gameOver = false;
var tankOneFire = false;
var tankTwofire = false;
var move = true;
var angle = true;
var bulletOneAngle = tankOneAngle;
var bulletTwoAngle = tankTwoAngle;

//count of bullets
var tankOneBullets = 3;
var tankTwoBullets = 3;

//position of tanks
var baseY = 550;
var tankOneX = 0;
var tankOneY = 436;
var tankTwoX = 1130;
var tankTwoY = 436;
var shotWidth = 20;
var shotHeight = 15;
var hitY1;
var hitY2;

//variables used in making projectile 
var bounce1 = 1;
var bounce2 = 1;
var gravity = 7;
var time = 0;
var inc = 0.5;
var velocity = 15;
var Angle = (bulletOneAngle * (Math.PI) / 180);
var velocityx = velocity * Math.cos(Angle);
var velocityy = velocity * Math.sin(Angle) * -1;
var powerOne;
var powerTwo;

//Image variables
var background = new Image();
var tankOneImg = new Image();
var tankTwoImg = new Image();
var turret = new Image();
var shotOneImg = new Image();
var shotTwoImg = new Image();

//Image variables assignment
background.src = "assets/images/background.png";
tankOneImg.src = "assets/images/tank1.png";
tankTwoImg.src = "assets/images/tank2.png";
turret.src = "assets/images/tanks_turret3.png";
shotOneImg.src = "assets/images/shot.png";
shotTwoImg.src = "assets/images/shot.png";

document.addEventListener('keydown', function (event) {

	//space to fire
	if (event.keyCode == 32) {
		if (playerActive == 1) {
			if (tankOneBullets > 0 && tankOneFire == false) {
				var velocity;
				velocity = 13;
				powerOne = 1.3;
				time = 0;
				velocity = 15;
				shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
				shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
				missileOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
				missileTwoY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
				Angle = (tankOneAngle * (Math.PI) / 180);
				velocityx = velocity * Math.cos(Angle);
				velocityy = velocity * Math.sin(Angle) * -1;
				tankOneFire = true;
				tankOneBullets--;
				move = false;
				angle = false;
			}
		}
		else {
			if (tankTwoBullets > 0 && tankTwofire == false) {
				var velocity;
				powerTwo = 1.3;
				time = 0;
				velocity = 15;
				Angle = (tankTwoAngle * (Math.PI) / 180);
				velocityx = velocity * Math.cos(Angle);
				velocityy = velocity * Math.sin(Angle) * -1;
				shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
				shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
				missileTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
				missileTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
				tankTwofire = true;
				tankTwoBullets--;
				move = false;
				angle = false;
			}
		}

	}

	//Left Movement
	if (event.keyCode == 37 && move == true) {
		if (playerActive == 1) {
			if (tankOneX >= 20)
				tankOneX -= 20;
		}
		else {
			if (tankTwoX > 1050)
				tankTwoX -= 20;
		}
	}

	//Right Movement
	if (event.keyCode == 39 && move == true) {
		if (playerActive == 1) {
			if (tankOneX < 140)
				tankOneX += 20;
		}
		else {
			if (tankTwoX < 1190)
				tankTwoX += 20;
		}
	}

	//down movement
	if (event.keyCode == 40 && angle == true) {
		if (playerActive == 1) {
			if (tankOneAngle > 0) {
				tankOneAngle--;
			}
		}
		else {
			if (tankTwoAngle > 0) {
				tankTwoAngle--;
			}
		}
	}

	//up movement
	if (event.keyCode == 38 && angle == true) {
		if (playerActive == 1) {
			if (tankOneAngle < 50) {
				tankOneAngle++;
			}
		}
		else {
			if (tankTwoAngle < 50) {
				tankTwoAngle++;
			}
		}
	}
}, false);

//Function which draws the Mountain
function drawMountain() {
	cx.beginPath();
	cx.strokeStyle = "#070F3F";
	cx.fillStyle = "#070F3F";
	cx.moveTo(30, baseY);
	cx.bezierCurveTo(100, 470, 160, 520, x1, y1);
	cx.lineTo(x2, y2);
	cx.lineTo(x3, y3);
	cx.bezierCurveTo(1150, 490, 1200, 480, width - 30, baseY);
	cx.closePath();
	cx.stroke();
	cx.fill();
	cx.fillStyle = "#FFFFFF";
}


//Function which draws the tank's turret which is placed on the left side
function drawTurret1() {
	cx.save();
	cx.translate(tankOneX + 39, tankOneY + 6);
	cx.rotate(-1 * tankOneAngle * Math.PI / 180);
	cx.drawImage(turret, 0, 0, tubeWidth, tubeHeight);
	cx.restore();
	bulletOneAngle = tankOneAngle;
}

//Function which draws the tank's turret which is placed on the left side
function drawTurret2() {
	cx.save();
	cx.translate(tankTwoX + 38, tankTwoY + 13);
	cx.rotate(Math.PI + tankTwoAngle * Math.PI / 180);
	cx.drawImage(turret, 0, 0, tubeWidth, tubeHeight);
	cx.restore();
	bulletTwoAngle = tankTwoAngle;
}

function missileCheckOne() {
	if (((mountainHitTankOneX + 10 >= tankTwoX) && (mountainHitTankOneX <= tankTwoX + tankWidth)) && ((mountainHitTankOneY >= tankTwoY - 8) && (mountainHitTankOneY <= tankTwoY + tankHeight))) {
		playerOneScore += 5;
		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		playerActive = 2;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y2 + ((y3 - y2) * (mountainHitTankOneX - x2) / (x3 - x2));
	hitY2 = (3 * mountainHitTankOneX - 81150) / 175;
	if (((mountainHitTankOneX >= 650 && mountainHitTankOneX <= 950) && ((hitY1 - mountainHitTankOneY) < 20)) || ((mountainHitTankOneX >= 950 && mountainHitTankOneX <= 1115) && ((hitY2 + mountainHitTankOneY) > 5))) { 
		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		playerActive = 2;
		
		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y1 + ((y2 - y1) * (mountainHitTankOneX - x1) / (x2 - x1));
	hitY2 = (-33 * mountainHitTankOneX + 124350) / 247;
	if (((mountainHitTankOneX >= 400 && mountainHitTankOneX <= 650) && ((hitY1 - mountainHitTankOneY) < 20)) || ((mountainHitTankOneX >= 153 && mountainHitTankOneX <= 400) && ((hitY2 - mountainHitTankOneY) < 20))) {

		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		playerActive = 2;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}


}

function missileCheckTwo() {
	if (((mountainHitTankTwoX >= tankOneX) && (mountainHitTankTwoX <= tankOneX + tankWidth + 10)) && ((mountainHitTankTwoY >= tankOneY - 8) && (mountainHitTankTwoY <= tankOneY + tankHeight))) {//condition if the missile/shot hits the tank

		playerTwoScore += 5;
		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
		tankTwofire = false;
		move = true;
		angle = true;

		playerActive = 1;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y1 + ((y2 - y1) * (mountainHitTankTwoX - x1) / (x2 - x1));
	hitY2 = (-33 * mountainHitTankTwoX + 124350) / 247;
	if (((mountainHitTankTwoX >= 400 && mountainHitTankTwoX <= 650) && ((hitY1 - mountainHitTankTwoY) < 5)) || ((mountainHitTankTwoX >= 153 && mountainHitTankTwoX <= 400) && ((hitY2 - mountainHitTankTwoY) < 2))) {//condition if the missile/shot hits the left hill 

		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);

		tankTwofire = false;
		move = true;
		angle = true;
		playerActive = 1;
		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y2 + ((y3 - y2) * (mountainHitTankTwoX - x2) / (x3 - x2));
	hitY2 = (3 * mountainHitTankTwoX - 81150) / 175;
	if (((mountainHitTankTwoX >= 650 && mountainHitTankTwoX <= 950) && ((hitY1 - mountainHitTankTwoY) < 5)) || ((mountainHitTankTwoX >= 950 && mountainHitTankTwoX <= 1115) && ((hitY2 + mountainHitTankTwoY) > 5))) {//condition if the missile/shot hits the right hill
		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
		tankTwofire = false;
		move = true;
		angle = true;
		playerActive = 1;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}
}

function animation() {
	cx.drawImage(background, 0, 0, width, height);
	drawMountain();
	drawTurret1();
	drawTurret2();
	cx.drawImage(tankOneImg, tankOneX, tankOneY, tankWidth, tankHeight);
	cx.drawImage(tankTwoImg, tankTwoX, tankTwoY, tankWidth, tankHeight);
	cx.font = "bold 32px Trebuchet MS";
	cx.fillStyle = "#fff";
	cx.fillText(playerOneScore, 20, 120);
	cx.fillText(playerTwoScore, 1185, 120);

	if (tankOneFire == true) {
		cx.drawImage(shotOneImg, shotOneX, shotOneY, shotWidth, shotHeight);
		time = time + inc;
		shotOneX = shotOneX + velocityx * inc * powerOne * 1.19;
		shotOneY = shotOneY + velocityy * inc * bounce1;
		if (shotOneX < 650 * Math.cos(tankOneAngle * Math.PI / 180)) {
			if (tankOneAngle <= 15) {
				velocityy = velocityy + gravity * inc * 0.2;
				bounce1 = 1;
			}
			else if (tankOneAngle > 15 && tankOneAngle <= 25) {
				velocityy = velocityy + gravity * inc * 0.11;
				bounce1 = 1.4;
			}
			else if (tankOneAngle > 25 && tankOneAngle <= 35) {
				velocityy = velocityy + gravity * inc * 0.03;
				bounce1 = 1.4;
			}
			else if (tankOneAngle > 35 && tankOneAngle <= 42) {
				velocityy = velocityy + gravity * inc * 0.01;
				bounce1 = 1.4;
			}
			else {
				velocityy = velocityy - gravity * inc * 0.00001;
				bounce1 = 1.4;
			}
		}
		else {
			velocityy = velocityy + gravity * inc * 0.1;
		}
		velocityx = velocityx;
		velocityy = velocityy + gravity * inc * 0.01;
		mountainHitTankOneX = shotOneX;
		mountainHitTankOneY = shotOneY;
		missileCheckOne();
	}
	if (tankTwofire == true) {
		cx.drawImage(shotTwoImg, shotTwoX, shotTwoY - 5, shotWidth, shotHeight);
		time = time + inc;
		shotTwoX = shotTwoX - velocityx * inc * powerTwo;
		shotTwoY = shotTwoY + velocityy * inc * bounce2;
		if (shotTwoX > 650 * Math.cos(Angle)) {
			velocityy = velocityy + gravity * inc * 0.04;
			if (tankTwoAngle <= 15) {
				velocityy = velocityy + gravity * inc * 0.2;
				bounce2 = 1;
			}
			else if (tankTwoAngle > 15 && tankTwoAngle <= 25) {
				velocityy = velocityy + gravity * inc * 0.11;
				bounce2 = 1.2;
			}
			else if (tankTwoAngle > 25 && tankTwoAngle <= 35) {
				velocityy = velocityy + gravity * inc * 0.03;
				bounce2 = 1.25;
			}
			else if (tankTwoAngle > 35 && tankTwoAngle <= 42) {
				velocityy = velocityy + gravity * inc * 0.015;
				bounce2 = 1.25;
			}
			else {
				bounce2 = 1.3;
			}
		}
		else {
			velocityy = velocityy + gravity * inc * 0.1;
		}
		velocityx = velocityx;
		velocityy = velocityy + gravity * inc * 0.01;
		mountainHitTankTwoX = shotTwoX;
		mountainHitTankTwoY = shotTwoY;
		missileCheckTwo();
	}
	if (gameOver == true) {
		window.alert("player-1:" + playerOneScore + "\n" + "player-2:" + playerTwoScore);
		return;
	}
	requestAnimationFrame(animation);
}
animation();

