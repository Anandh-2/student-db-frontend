import axios from 'axios';

const url = process.env.REACT_APP_SERVER_URL;

export const getAllStudents = async()=>{
    try{
        const response = await axios.get(url);
        return response.data.students;
    }catch(err){
        console.log("Error in get api");
        return [];
    }
}

export const getStudent = async(id)=>{
    try{
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }catch(err){
        console.log("Error in get api");
    }
}

export const createStudent = async(body)=>{
    try{
        const response = await axios.post(url,body);
        return response.data.student;
    }catch(err){
        console.log("Error in create api");
    }
}

export const updateStudent = async(id, body)=>{
    try{
        const response = await axios.put(`${url}/${id}`,body);
        return response.data.student;
    }catch(err){
        console.log("Error in update api");
    }
}

export const deleteStudent = async(id)=>{
    try{
        const response = await axios.delete(`${url}/${id}`);
        return response;
    }catch(err){
        console.log("Error in delete api");
    }
}