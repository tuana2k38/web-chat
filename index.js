const { Socket } = require('dgram')
const express = require('express')
const app = express()

const http = require('http')
const { emit } = require('process')
const server = http.createServer(app)
const{
    Server
} = require('socket.io')

const delay = require('delay')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data) 
    })
})
server.listen(3000,() => {
    console.log('listen on port 3000')
})

async function boardcastBitcoinPrice(){
    while(true){
        const price = 31750+Math.random()*400
        io.emit('bitcoin-price',{
            price: parseFloat(price.toFixed(2))
        })
        await delay(1000)
    }
}
boardcastBitcoinPrice()