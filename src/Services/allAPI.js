import { commonAPI } from "./CommonApi";
import { baseUrl } from "./baseUrl";

//Actual Api Call

//1 register Api call - post - body
export const registerAPI =async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//2 login api call - post - body
export const loginAPI =async(user)=>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

// Add project api call
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/project/add`,reqBody,reqHeader)
}

// get home-project
export const homeproject = async()=>{
    return await commonAPI("get",`${baseUrl}/project/home-projects`,"","")
}

// get all projects
export const getallproject = async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-projects?search=${searchKey}`,"",reqHeader)
}

// get all user projects
export const getalluserproject = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-user-projects`,"",reqHeader)
}

// update project
export const updateproject = async(reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/project/update-project/:id`,reqBody,reqHeader)
}