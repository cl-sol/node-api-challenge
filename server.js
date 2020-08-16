const express = require("express");

const server = express();

server.use(express.json());

//routes
server.get("/", (req, res) => {
    res.status(200).json("Server is working");
    // res.send("<h1> API Sprint </h1>");
});

module.exports = server;