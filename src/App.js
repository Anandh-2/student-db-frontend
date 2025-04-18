import "./App.css";
import { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "./api/Api";
import InputForm from "./components/InputForm";

const defaultData = {
  _id:"",
  name:"",
  rollNo:"",
  email:"",
  mobile:""
}

function App() {
  const [studentsDetails, setStudentsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(defaultData);
  const [formMode, setFormMode]= useState("create");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const students = await getAllStudents();
      setStudentsDetails(students);
      setFilteredStudents(students);
      setIsLoading(false);
    };
    fetchStudents();
  }, [triggerReload]);

  const handleSearch = (e)=>{
    const value = e.target.value;
    setSearch(value);
    setFilteredStudents(studentsDetails.filter((student)=>{
      return search===''?true:student.name.toLowerCase().includes(value.toLowerCase());
    }));
  }

  const handleInput = (student)=>{
    setIsFormOpen(true);
    if(student){
      setUserData(student);
      setFormMode("edit");
    }else{
      setFormMode("create");
    }
  }

  const handleDelete=async(student)=>{
    await deleteStudent(student._id);
    setTriggerReload(prev=>!prev);
  }

  
  return (
    <div className="App">
    <div className={`main-container ${isFormOpen? 'blur':''}`}>
      <h1>Student Database</h1>
      <input className="search" onChange={handleSearch} value={search} placeholder="Search"/>
      <div style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
      <button id="add" onClick={()=>{handleInput()}}>Add student</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5}><div>Loading...</div></td>
            </tr>
          ) : filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={5}><div>No data found</div></td>
            </tr>
          ) : (
            filteredStudents.map((student) => {
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td>
                    <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
                      <button id="edit" style={{backgroundColor:"#20C997"}} onClick={()=>handleInput(student)}>Edit</button>
                      <button style={{backgroundColor:"#DC3545"}} onClick={()=>handleDelete(student)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      </div>
      {isFormOpen && <InputForm userData={userData} setUserData={setUserData} mode={formMode} setIsFormOpen={setIsFormOpen} studentsDetails={studentsDetails} setStudentsDetails={setStudentsDetails} setTriggerReload={setTriggerReload}/>}
    </div>
  );
}

export default App;
