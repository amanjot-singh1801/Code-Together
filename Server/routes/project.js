const express = require("express")
const projectRouter = express.Router();


const {saveCode ,updateCode,getAllProjects} = require("../controller/Project");

projectRouter.post("/savecode",saveCode);
projectRouter.put("/updatecode",updateCode);
projectRouter.get("/getproject",getAllProjects);

module.exports = projectRouter;