(function(){
class Bullet {
    constructor(x, y, rotation) {
        this.x = x
        this.y = y
        this.scale = 2
        this.rotation = rotation
        this.acceleration = 1
    }
    draw() {
        push()
        translate(this.x, this.y)
        scale(this.scale)
        rotate(this.rotation)
        noStroke()
        beginShape()
        vertex(1, 1)
        vertex(-1, 1)
        vertex(-1, -1)
        vertex(1, -1)
        endShape()
        pop()
    }
    movement() {
        var xVel = this.acceleration*sin(this.rotation)
        var yVel = -this.acceleration*cos(this.rotation)
        this.x += xVel
        this.y += yVel
    }
    fromObj(obj) {
        obj && Object.assign(this, obj)
    }
}
if ((typeof module !== 'undefined' && typeof module.exports !== 'undefined')) {
    module.exports = Bullet
} else {
    window.Bullet = Bullet
}

})();