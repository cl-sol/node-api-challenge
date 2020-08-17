//imports
const express = require("express");
const projectsRouter = require("./routers/projectsRouter");

const server = express();

server.use(express.json());

//route
server.get("/", (req, res) => {
    res.status(200).json("Server is working");
    // res.send("<h1> API Sprint </h1>");
});

//subroutes
server.use("/api/projects", projectsRouter);

module.exports = server;