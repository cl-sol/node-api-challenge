//imports
const express = require("express");
const projectsRouter = require("./routers/projectsRouter");
const actionsRouter = require("./routers/actionsRouter");

const server = express();

server.use(express.json());

//route
server.get("/", (req, res) => {
    res.status(200).json("Server is working");
    // res.send("<h1> API Sprint </h1>");
});

//subroutes
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;