var express = require('express');
var socket = require('socket.io');
const Player = require('./Asteroids/script/player.js')
const Asteroid = require('./Asteroids/script/asteroid.js')
const Logger = require('./Asteroids/script/logger.js')
var logger = new Logger(true)

var app = express();
var server = app.listen(3000);
var io = socket(server);

app.use("/asteroids", express.static('Asteroids'));
app.use("/tank", express.static('Tanks'));
logger.log("Starting server!")

var players = new Map()
var asteroids = new Map()
asteroidId = 0

generateAsteroids(50)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

io.sockets.on('connection', function(soc) {
    logger.logf('new connection: %s', soc.id)
    sendAllPlayers(soc)
    sendAllAsteroids(soc)
    soc.on('disconnect', function() {
        players.delete(soc.id)
        console.log('Got disconnect!');
        io.sockets.emit('disconnect', soc.id)
    })
    soc.on('createPlayer', function() {
        var ret = new Player(soc.id, getRandomInt(8000), getRandomInt(8000))
        players.set(soc.id, ret)
        logger.log(ret.x, "\t", ret.y)
        io.sockets.emit('newPlayer', ret)
    })
    soc.on('movement', function(data) {
        players.get(soc.id).x = data.x
        players.get(soc.id).y = data.y
        players.get(soc.id).rotation = data.rotation
        soc.broadcast.emit('movement', {player: soc.id, x: data.x, y: data.y, rotation: data.rotation})
    })
    soc.on('bullet', function(data) {
        logger.log("Got request for bullet! ", data)
    })
})

function sendAllPlayers(soc) {
    players.forEach(function(p) {
        soc.emit('newPlayer', p)
    })
}

function sendAllAsteroids(soc) {
    asteroids.forEach(function(a) {
        soc.emit('newAsteroid', a)
    })
}

function generateAsteroids(health) {
    numAsteroids = Math.abs(getRandomInt(20))
    for(var i = 0; i < numAsteroids; i++){
        asteroids.set(asteroidId, new Asteroid(asteroidId, getRandomInt(8000), getRandomInt(8000), health, getRandomInt(5), getRandomInt(5)))
        asteroidId++
    }
}