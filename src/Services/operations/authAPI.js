import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function signUp(name,username,password,email,navigate){
   const toastId = toast.loading("Loading...");
   try{
    const SIGNUP_API = BASE_URL + "/auth/signup";
    console.log("Signup_api",SIGNUP_API);
    
    const response = await apiConnector("POST",SIGNUP_API,{name,username,password,email});

    console.log("SIGNUP_ API response ...... ",response);
    if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
    }
    
    toast.success("Signup Successful");
    toast.dismiss(toastId);
    navigate("/login");
   }catch(error){
    console.log("Error occur during Signup");
    toast.error(error.response.data.message);
    console.log(error);
   }
   toast.dismiss(toastId);
}

export async function login(email,password,navigate){
    const toastId = toast.loading("Loading...");
    try{
        const LOGIN_API = BASE_URL + "/auth/login"; 
        console.log("LOGIN_API ",LOGIN_API);

        const response = await apiConnector("POST",LOGIN_API,{email,password});
        console.log("Login response : ",response.data);
        if(!response.data.success){
           toast.error(response.data.message);
           return new Error(response.data.message)
        }   

        toast.success("Login Successful");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.dismiss(toastId);
        navigate('/home');
    }catch(error){
        console.log("Error occur during Login");
        toast.error(error.response.data.message);
        console.log(error);
    }
    toast.dismiss(toastId);
}