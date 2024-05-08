import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import { Col, Row } from "react-bootstrap";
import { getallproject } from "../Services/allAPI";

function Project() {
  //to hold seach value from the input box
  const [searchKey, setSearchKey] = useState("");
  console.log(searchKey);

  //to hold all project details
  const [allProject, setAllProject] = useState([]);

  //api call function
  const getAllProjects = async () => {
    //get token
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getallproject(searchKey, reqHeader);
        console.log(result);
        if (result.status === 200) {
          setAllProject(result.data);
          console.log(allProject);
        } else {
          alert("Failed to get project");
        }
      } catch (e) {
        alert("error getting project" + e.message);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-5">All Projects</h1>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex border border-4 rounded mb-5">
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              className="form-control px-5"
              placeholder="Search by technology"
            />
            <i className="fa-solid fa-magnifying-glass text-dark fs-4 p-3"></i>
          </div>
        </div>
      </div>
      <div className="container">
      <Row>
          {allProject.length>0
            ? allProject.map((item) => (
                <Col className="m-2">
                  <ProjectCard project={item} />
                </Col>
              ))
            :<div className="text-center">No Projects Found</div> }
      </Row>
      </div>
    </div>
  );
}

export default Project;
