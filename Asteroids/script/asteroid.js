(function(){
class Asteroid {
    constructor(id, x, y, r, xVel, yVel) {
        this.id = id
        this.x = x
        this.y = y
        this.radius = r
        this.xVel = xVel
        this.yVel = yVel
    }
    draw() {
        push()
        noFill()
        stroke(255)
        strokeWeight(2)
        translate(this.x, this.y)
        ellipse(10, 10, this.radius)
        pop()
    }
    movement() {
        this.x += this.xVel
        this.y += this.yVel

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
    fromObj(obj) {
        obj && Object.assign(this, obj)
    }
}
if ((typeof module !== 'undefined' && typeof module.exports !== 'undefined')) {
    module.exports = Asteroid
} else {
    window.Asteroid = Asteroid
}

})();