//imports
const express = require("express");
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

//router
const router = express.Router();

router.use(express.json());

//CRUD - get/Read
router.get("/", (req, res) => {
    projects.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: "Projects information could not be retrieved."});
        })
});

module.exports(router);

