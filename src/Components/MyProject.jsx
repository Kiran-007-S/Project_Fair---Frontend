import React, { useEffect, useState,useContext } from "react";
import AddProject from "./AddProject";
import { getalluserproject } from "../Services/allAPI";
import EditProject from "./EditProject";
import addProjectResponseContext from "../ContextAPI/ContextShare";
import editUserProjectResponseContext from "../ContextAPI/ContextShare";

function MyProject() {
  // state creation
  const [allUserProject, setAllUserProject] = useState([]);

  const {addProjectRes,setAddProjectRes}= useContext(addProjectResponseContext)
  
  const {editUserProjectRes,setEditUserProjectRes}= useContext(editUserProjectResponseContext)
  //Api call
  const allUserprojects = async () => {
    //get token from sessionStorage
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await getalluserproject(reqHeader);
        console.log(result);
        if (result.status === 200) {
          setAllUserProject(result.data);
          console.log(allUserProject);
        } else {
          alert(`Failed to retrieve project`);
        }
      } catch (error) {
        alert(`Failed to retrieve project`);
        console.log(`error fetching projects : `, error);
      }
    }
  };

  useEffect(() => {
    allUserprojects();
  },[addProjectRes,editUserProjectRes]);

  return (
    <div className="container">
      <div className="d-flex m-3 align-items-center">
        <h3 className="text-justify">My Projects</h3>
        <div className="ms-auto">
          <AddProject />
        </div>
      </div>
      <div>
        {allUserProject ? (
          allUserProject.map((item) => (
            <div className="d-flex align-items-center justify-content-between m-3 p-3 border rounded-4">
              <h5 className="text-justify">{item?.title}</h5>
              <div>
                <button className="btn border-0">
                  <EditProject details={item}/>
                </button>
                <button className="btn border-0">
                  <i className="fa-brands fa-github"></i>
                </button>
                <button className="btn border-0">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No Projects Found</div>
        )}
      </div>
    </div>
  );
}

export default MyProject;
