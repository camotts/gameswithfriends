SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080

var players = new Map()
var asteroids = new Map();
var client = new Client(addPlayer)
//var logger = new Logger(true)

function setup() {
    createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT)
    angleMode(DEGREES);

    client.requestPlayer()
}


function draw() {
    background(51)
    players.forEach(function(p) {
        if(p.id === client.id()) {
            p.movement()
        }
        p.draw()
    })
    asteroids.forEach(function(e) {
        e.movement()
        e.draw()
    })
}

function addPlayer(data) {
    player = new Player()
    player.fromObj(data)
    players.set(player.id, player)

    if(player.id === client.id()) {
        setInterval(function() {
            client.sendMovement(players.get(client.id()).x, players.get(client.id()).y, players.get(client.id()).rotation)
        }, 10)
    }
}

function addAsteroid(data) {
    asteroid = new Asteroid()
    asteroid.fromObj(data)
    asteroids.set(asteroid.id, asteroid)
}

function handleMovement(data) {
    console.log("Getting movement")
    players.get(data.player).x = data.x
    players.get(data.player).y = data.y
    players.get(data.player).rotation = data.rotation
}

function disconnect(id) {
    console.log("dc", id)
    players.delete(id)
}