import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function signUp(name,username,password,email,navigate){
   try{
    const toastId = toast.loading("Loading...");
    const SIGNUP_API = BASE_URL + "/auth/signup";
    console.log("Signup_api",SIGNUP_API);
    
    const response = await apiConnector("POST",SIGNUP_API,{name,username,password,email});

    console.log("SIGNUP_ API response ...... ",response);
    if(!response.data.success){
        throw new Error(response.data.message);
    }
    
    toast.success("Signup Successful");
    navigate("/login");
    toast.dismiss(toastId);
   }catch(error){
    console.log("Error occur during Signup");
    console.log(error);
   }
}

export async function login(email,password,navigate){
    try{
        const toastId = toast.loading("Loading...");
        const LOGIN_API = BASE_URL + "/auth/login"; 
        console.log("LOGIN_API ",LOGIN_API);

        const response = await apiConnector("POST",LOGIN_API,{email,password});
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Login Successful");
        console.log(response);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.dismiss(toastId);
        navigate('/home');
    }catch(error){
        console.log("Error occur during Login");
        console.log(error);
    }
    
}