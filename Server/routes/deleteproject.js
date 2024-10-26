const express = require("express")
const deleteRouter = express.Router();


const {deleteProject} = require("../controller/Project");

deleteRouter.delete("/deleteproject",deleteProject);

module.exports = deleteRouter;