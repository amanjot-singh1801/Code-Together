const Project = require("../models/Code");


exports.saveCode = async (req, res) => {
  try {
    const { title, code } = req.body;
    const { email, id } = req.user; 

    console.log("Title:", title);
    console.log("Code:", code);
    console.log("User ID:", id); 
    console.log("Email:", email); 

    const newProject = await Project.create({ userId: id, email, title, code });

    return res.status(200).json({
      success: true,
      message: "Code saved successfully",
      projectId: newProject._id,
    });
  } catch (error) {
    console.error("Error saving code:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save code",
    });
  }
};

exports.

updateCode = async (req, res) => {
   try {
       const { code, projectId } = req.body;

       const response = await Project.findByIdAndUpdate(
           projectId, 
           { code }, 
           { new: true } 
       );

       if (!response) {
           return res.status(404).json({
               success: false,
               message: "Project not found",
           });
       }

       return res.status(200).json({
           success: true,
           message: "Code updated successfully",
           projectId: response._id,
       });

   } catch (error) {
       console.error("Error updating code:", error);
       return res.status(500).json({
           success: false,
           message: "Failed to update code",
       });
   }
};

exports.getAllProjects = async(req,res) =>{
  try{
    const {email} = req.user;
    const response = await Project.find({email}).populate("userId");
    if(!response){
      return res.status(200).json({
        success:true,
        message:"No project Found"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Project fetch successfull",
      projects:response
    })
    
  }catch(error){
    console.error("Error updating code:", error);
       return res.status(500).json({
           success: false,
           message: "Failed to get all projects",
    });
  }
}

exports.deleteProject = async (req,res)=>{
  try{
    const {projectId} = req.body;

    const response = await Project.findByIdAndDelete(
      projectId,
    );

    if (!response) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Project Deleted successfully",
    });
  }catch(error){
    console.error("Error updating code:", error);
    return res.status(500).json({
        success: false,
        message: "Failed to delete project",
    });
  }
}