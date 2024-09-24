const express = require('express');
require('dotenv').config();
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render("index");
});

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        console.log(`connected:${socket.id}`);
      io.emit("receive-location", { id: socket.id, ...data });
    });
  
    socket.on("disconnect", function () {
        console.log(`disconnected:${socket.id}`);
      io.emit("user-disconnected", socket.id);
    });
  });
  

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});