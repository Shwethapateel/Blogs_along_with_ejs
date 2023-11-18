require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT
const MONGOLOCAL_URL = process.env.MONGOLOCAL_URL

const server = http.createServer(app)

mongoose.connect(MONGOLOCAL_URL).then(()=>{
    console.log('DB is connected')
}).catch((err)=>{
    console.log(err)
})
server.listen(PORT,(err)=>{
    if(err)console.log(err);
    console.log(`Listening on port number - ${PORT}`);
})