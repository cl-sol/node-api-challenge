//imports
const express = require("express");
const Projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

//router
const router = express.Router();

router.use(express.json());

//CRUD - get/Read
router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: "Projects information could not be retrieved."});
        })
});

router.get("/:id", (req, res)=> {
    Projects.getProjectActions(req.params.id)
    .then(project => {
        if(project === 0) {
            res.status(400).json({
                message: "User not found"
            })
        } else {
            res.status(200).json(project)
        }
    })
})

router.get("/:id/action", (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(action => {
            if(action === 0 ) {
                res.status(400).json({
                    message: "Actions not found"
                })
            } else {
                res.status(200).json(action)
            }
        })
})

//CRUD - post/Create
router.post("/", (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error connecting to the database"
            })
        })
})

//CRUD - put/Update
router.put("/:id", (req, res) => {
    Projects.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Project information could not be updated"
            })
        });
});

//CRUD - delete
router.delete("/:id", (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if(count === 0) {
                res.status(404).json({
                    message: "Project with this ID does not exist"
                })
            } else {
                res.status(200).json(count)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Project could not be removed"
            })
        })
})
module.exports = router;
