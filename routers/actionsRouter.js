//imports
const express = require("express");
const Action = require("../data/helpers/actionModel");

//router
const router = express.Router();

router.use(express.json());

//CRUD - get
router.get("/", (req, res) => {
    Action.get()
        .then((action) => {
            res.status(200).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Actions could not be retrieved"
            })
        })
});

router.get("/:id", (req, res) => {
    Action.get(req.params.id)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: "Action with that ID could not be found"
            })
        })
});

//CRUD - post
router.post("/", (req, res) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error saving the action to the database"
            })
        })
});

//CRUD - put
router.put("/:id", (req, res) => {
    Action.update(req.params.id, req.params.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error updating action information"
            })
        })
});
 
//CRUD - delete
router.delete("/:id", (req, res) => {
    Action.remove(req.params.id)
        .then(count => {
            if(count === 0) {
                res.status(404).json({
                    message: "Action with this ID does not exist"
                })
            } else {
                res.status(200).json(count)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Action could not be removed"
            })
        })
});

module.exports = router;
