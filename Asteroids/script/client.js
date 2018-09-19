class Client {
    constructor(addPlayer) {
        this.socket = io.connect('http://gameswithfriends-216915.appspot.com')

        this.socket.on('newPlayer', addPlayer)
        this.socket.on('movement', handleMovement)
        this.socket.on('disconnect', disconnect)
        this.socket.on('newAsteroid', addAsteroid)
    }
    requestPlayer() {
        this.socket.emit('createPlayer')
    }
    sendMovement(x, y, rotation) {
        this.socket.emit('movement', {x: x, y:y, rotation: rotation})
    }
    shootBullet(x, y, rotation) {
        this.socket.emit('bullet', {x: x, y: x, rotation: rotation})
    }
    id() {
        return this.socket.io.engine.id
    }
}