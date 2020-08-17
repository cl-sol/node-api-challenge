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

router.get("/:id", validateActionId, (req, res) => {
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
router.post("/", validateAction, (req, res) => {
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
router.put("/:id", validateActionId, validateAction, (req, res) => {
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
router.delete("/:id", validateActionId, (req, res) => {
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

//middleware
function validateActionId(req, res, next) {
    Action.get(req.params.id)
        .then(acction => {
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({
                    message: "Invalid user ID"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status*(500).json({
                message: "Not a valid action ID"
            })
        })
};

function validateAction(req, res, next) {
    if(Object.keys(req.body).length === 0) {
        req.status(400).json({
            message: "Missing required data"
        })
    } else if
        (!req.body.description || !req.body.notes) {
            res.status(400).json({
                message: "Description and notes are required"
            })
    } else {
        return next();
    }
}

module.exports = router;
