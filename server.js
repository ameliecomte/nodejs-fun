const http = require('http')
const url = require('url')
const querystring = require('querystring')
const greeting = require('greeting')


const EventEmitter = require('events').EventEmitter


const server = http.createServer()
server.on('request', (req, res) => {
    const page = url.parse(req.url).pathname
    const params = querystring.parse(url.parse(req.url).query)
    console.log(page, params)
    res.writeHead(200, {"Content-type": "text/plain"})
    if (page == '/') {
        if (params == "moutarde") res.write('Home with mustard')
        else res.write('home with no mustard')
    }   
    else if (page == "/user") res.write("User Profile")
    else res.write("404!")
    // res.write('<!DOCTYPE html>'+
    // '<html>'+
    // '    <head>'+
    // '        <meta charset="utf-8" />'+
    // '        <title>Ma page Node.js !</title>'+
    // '    </head>'+ 
    // '    <body>'+
    // '     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
    // '    </body>'+
    // '</html>')
    res.end()
})

server.on('close', () => {
    console.log(greeting.greeting())
})

// emit events
const game = new EventEmitter()


game.on('gameover', (message) => {
    console.log(message)
})

game.emit('gameover', 'You lose')

server.listen(8080)
server.close()