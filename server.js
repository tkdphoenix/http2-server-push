const express = require('express')
const http2Express = require('http2-express-bridge')
const http2 = require('http2')
const fs = require("fs")
const {promisify} = require("util")

const readFile = promisify(fs.readFile)

const port = 3000;
const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
}

const app = http2Express(express);

app.use(express.static('public'))
app.get("/push", async (req, res) => {
  try {
    if(res.push){
      [
        "/styles.css",
        "/images/image.png"
      ].forEach(async (file) => {
        res.push(file, {}).end(await readFile(`public${file}`))
      })
    }

    res.writeHead(200)
    res.end(await readFile("index.html"))
  }catch(error){
    res.status(500).send(error.toString())
  }
})
app.get('/test', (req, res) => {
    console.log(req.originalUrl);
    res.send("Test");
    // res.sendFile('./index.html')
    // res.send(await readFile("index.html"))
});

app.get('*', (req, res) => {
    console.log(req.originalUrl);
    res.send("Welcome!");
});

http2.createSecureServer(options, app).listen(port, function() {
  console.log('listening on port 3000!')
});