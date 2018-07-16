"use strict";

// Enemies our player must avoid
// x and y represent the position of the bugs on canvas
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.speed = this.randomSpeed = 10 + Math.random() * 100 +40;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position.
// Parameter: dt, a time delta between ticks. any movement is multyplied by dt, this ensure the games runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
        this.speed = this.speed + 10 +Math.random() *32;
    }
};


// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 75;
    this.sprite = 'images/char-cat-girl.png';
};

//Update the player's positions.
//when the player reach the top of the canvas the game is win.
Player.prototype.update = function(dt) {
    if (this.y < 0) {
        alert('You did it!');
        this.reset(202, 388);
    }
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};	
	
// HandleInput method on player to move it with arrows on the game canvas.
Player.prototype.handleInput = function (direction) {
    if (direction === 'left' && this.x > -25) {
        this.x -= 50;
    }
    if (direction === 'right' && this.x < 425) {
        this.x += 50;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 41;
    }
    if (direction === 'down' && this.y < 366) {
        this.y += 41;
    }
};
	
// Reset method to try again after a winning game.
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};

	
	
// Now instantiate your objects.
// all enemy objects are placed in an array called allEnemies
var allEnemies = [
	new Enemy (-300, 60),
	new Enemy(-202, 56),
    new Enemy(-200, 145),
	new Enemy(-325, 125),
    new Enemy(-450, 225)
];
	
	
	
//player object in a variable called player
var player = new Player(202, 388);

// Check collisions function to check if the player is crashed by an enemy
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width-20 &&
            allEnemies[i].x + allEnemies[i].width-20 > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            player.reset(202, 388);
        }
    }
}

	
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});