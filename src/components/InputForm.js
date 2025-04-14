import React from "react";
import "../styles/InputForm.css";
import { IoClose } from "react-icons/io5";
import { createStudent, updateStudent } from "../api/Api";

const defaultData = {
    _id:"",
    name:"",
    rollNo:"",
    email:"",
    mobile:""
  }
function InputForm({ userData, setUserData, mode, setIsFormOpen, studentsDetails, setStudentsDetails, setTriggerReload}) {
    const closeInput = ()=>{
        setIsFormOpen(false);
        setUserData(defaultData);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(mode==='edit'){
            const response = await updateStudent(userData._id ,userData);
            if(response){
                setTriggerReload(prev=>!prev);
            }
        }else{
            const response = await createStudent(userData);
            if(response){
                setTriggerReload(prev=>!prev);
            }
        }
        closeInput();
    }

    const handleChange = (e)=>{
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div className="blur-bg">
    <div className="input-form">
    <button id="close-btn" onClick={()=>{closeInput()}}><IoClose/></button>
    <h2>Enter Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-in">
          <label htmlFor="name">Name:</label>
          <input name="name" id="name" value={userData.name} onChange={handleChange}/>
        </div>
        <div className="user-in">
          <label htmlFor="roll">Roll No:</label>
          <input name="rollNo" id="rollNo" value={userData.rollNo} onChange={handleChange}/>
        </div>
        <div className="user-in">
          <label htmlFor="email">Email:</label>
          <input name="email" id="email" type="email" value={userData.email} onChange={handleChange}/>
        </div>
        <div className="user-in">
          <label htmlFor="mobile">Mobile:</label>
          <input name="mobile" id="mobile" value={userData.mobile} onChange={handleChange}/>
        </div>
        <button type="submit" id="submit-btn">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default InputForm;
