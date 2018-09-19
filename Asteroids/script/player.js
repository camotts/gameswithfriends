(function(){
class Player {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
        this.rotation = 0
        this.acceleration = 0
        this.scale = 15
        this.maxVel = 1
        this.drag=.95
        this.canShoot=true
    }
    draw() {
        push()
        translate(this.x, this.y)
        scale(this.scale)
        rotate(this.rotation)
        noStroke()
        beginShape()
        vertex(0, -2)
        vertex(1, 0)
        vertex(0, 1)
        vertex(-1, 0)
        endShape()
        pop()
    }
    movement() {
        this.input()
        var xVel = this.acceleration*sin(this.rotation)
        var yVel = -this.acceleration*cos(this.rotation)
        this.x += xVel
        this.y += yVel

        this.acceleration*=this.drag
        if(this.y > SCREEN_HEIGHT) {
            this.y-=SCREEN_HEIGHT
        } else if(this.y < 0) {
            this.y += SCREEN_HEIGHT
        }
        if(this.x > SCREEN_WIDTH) {
            this.x -= SCREEN_WIDTH
        } else if(this.x < 0) {
            this.x += SCREEN_WIDTH
        }
    }
    input() {
        if (keyIsDown(UP_ARROW)) {
            this.acceleration = max(this.acceleration + .7, this.maxVel)
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.acceleration = max(this.acceleration - .1, 0)
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.rotation -= 5
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.rotation += 5
        }
        if (keyIsDown(32)) {
            if (this.canShoot) {
                client.shootBullet(this.x, this.y, this.rotation)
                this.canShoot = false
                setTimeout(function(p) {
                    p.canShoot = true
                }, 250, this)
            }
        }
    }
    fromObj(obj) {
        obj && Object.assign(this, obj)
    }
}
if ((typeof module !== 'undefined' && typeof module.exports !== 'undefined')) {
    module.exports = Player
} else {
    window.Player = Player
}

})();