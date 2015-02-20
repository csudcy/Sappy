/*
Adapted from http://jsfiddle.net/dtrooper/AceJJ/
*/

/*
(function( $ ) {
    var FUNCTIONS = {
        'init': function() {
            // TODO
        },
        'destroy': function() {
            // TODO
        }
    };

    $.fn.fireworks = function(action) {
        if (!action) {
            // Assume no action means we want to init
            action = 'init';
        }
        FUNCTIONS[action]();
        return this;
    };
}(jQuery));
*/


var ELEMENT_WIDTH = 0,
    ELEMENT_HEIGHT = 0,
    ELEMENT,

    // create canvas
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvas_buffer = document.createElement('canvas'),
    context_buffer = canvas_buffer.getContext('2d'),
    particles = [],
    rockets = [],
    MAX_ROCKETS = 5,
    MAX_PARTICLES = 500,
    colorCode = 0;

// init
setTimeout(function() {
    ELEMENT = document.getElementsByTagName('div')[1];
    ELEMENT.style.position = 'relative';
    ELEMENT.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.bottom = '0px';
    canvas.style.left = '0px';
    canvas.style.right = '0px';

    setInterval(launch, 10);
    setInterval(loop, 1000 / 50);
}, 1);

function launch() {
    launchFrom(Math.random() * ELEMENT_WIDTH * 2 / 3 + ELEMENT_WIDTH / 6);
}

function launchFrom(x) {
    if (rockets.length < MAX_ROCKETS) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 2;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    }
}

function loop() {
    // update screen size
    if (ELEMENT_WIDTH != ELEMENT.offsetWidth) {
        canvas.width = ELEMENT_WIDTH = ELEMENT.offsetWidth;
        canvas_buffer.width = canvas.width;
    }
    if (ELEMENT_HEIGHT != ELEMENT.offsetHeight) {
        canvas.height = ELEMENT_HEIGHT = ELEMENT.offsetHeight;
        canvas_buffer.height = canvas.height;
    }

    // fade the background out slowly
    context_buffer.clearRect(0, 0, ELEMENT_WIDTH, ELEMENT_HEIGHT);
    context_buffer.globalAlpha = 0.9;
    context_buffer.drawImage(canvas, 0, 0);
    context.clearRect(0, 0, ELEMENT_WIDTH, ELEMENT_HEIGHT);
    context.drawImage(canvas_buffer, 0, 0);


    var existingRockets = [];

    for (var i = 0; i < rockets.length; i++) {
        // update and render
        rockets[i].update();
        rockets[i].render(context);

        // random chance of 1% if rockets is above the middle
        var randomChance = rockets[i].pos.y < (ELEMENT_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;

        /* Explosion rules
             - 80% of screen
            - going down
            - close to the mouse
            - 1% chance of random explosion
        */
        if (rockets[i].pos.y < ELEMENT_HEIGHT / 5 || rockets[i].vel.y >= 0 || randomChance) {
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets;

    var existingParticles = [];

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
}

function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;

    this.resistance = 1;
    this.gravity = 0;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
}

Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // gravity down
    this.vel.y += this.gravity;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
};

Particle.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

Particle.prototype.exists = function() {
    return this.alpha >= 0.1 && this.size >= 1;
};

function Rocket(x) {
    Particle.apply(this, [{
        x: x,
        y: ELEMENT_HEIGHT}]);

    this.explosionColor = 0;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.explode = function() {
    var count = Math.random() * 10 + 80;

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;

        particle.flick = true;
        particle.color = this.explosionColor;

        particles.push(particle);
    }
};

Rocket.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(0.2, "rgba(255, 180, 0, " + this.alpha + ")");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};
