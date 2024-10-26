import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function getAllProjects(token) {
    try{
        const toastId = toast.loading("Fetching Projects....");
        const GETPROJECT_API = BASE_URL + '/project/getproject';
        console.log("GETPROJECT_API",GETPROJECT_API);

        const response = await apiConnector("GET",GETPROJECT_API,{}, {
            Authorization: `Bearer ${token}`,
        }); 

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("Response of projects: ",response);
        toast.dismiss(toastId);
        return response.data;
    }catch(error){
        console.log("Error occur during Geting Project");
        console.log(error);
    }
}

export async function deleteProject(projectId,token){
    try{
        const toastId = toast.loading("Deleting Project....");
        const DELETEPROJECT_API = BASE_URL + '/delete/deleteproject';
        console.log("DELETEPROJECT_API",DELETEPROJECT_API);

        const response = await apiConnector("DELETE",DELETEPROJECT_API,{projectId}, {
            Authorization: `Bearer ${token}`,
        }); 

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("Response of projects: ",response);
        toast.dismiss(toastId);
        return response.data;
    }catch(error){
        console.log("Error occur during Delete Project");
        console.log(error);
    }
}