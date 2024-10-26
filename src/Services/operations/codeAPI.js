import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function saveCode(title,code,token) {
    try{
        const toastId = toast.loading("Save Code....");
        const SAVECODE_API = BASE_URL + '/project/savecode';
        console.log("SAVECODE_API",SAVECODE_API);

        const response = await apiConnector("POST",SAVECODE_API,{title,code}, {
            Authorization: `Bearer ${token}`,
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Code Save");
        console.log("Response: ",response);
        localStorage.setItem("projectId", JSON.stringify(response.data.projectId));
        toast.dismiss(toastId);
        return response;
    }catch(error){
        console.log("Error occur during Code Save");
        console.log(error);
    }
}

export async function updateCode(code,projectId,token){
    try{
        const toastId = toast.loading("Save Code....");
        const UPDATECODE_API = BASE_URL + '/project/updatecode';
        console.log("UPDATECODE_API",UPDATECODE_API);

        const response = await apiConnector("PUT",UPDATECODE_API,{code,projectId}, {
            Authorization: `Bearer ${token}`,
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Code Save");
        // console.log("Response: ",response);
        localStorage.setItem("projectId", JSON.stringify(response.data.projectId));
        toast.dismiss(toastId);
        return response;

    }catch(error){
        console.log("Error occur during Updating Code");
        console.log(error);
    }
}