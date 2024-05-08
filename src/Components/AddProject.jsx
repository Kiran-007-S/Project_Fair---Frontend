import React, { useState, useEffect ,useContext} from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import ProjectImage from "../Assets/Project-image.jpg";
import { addProjectAPI } from "../Services/allAPI";
import { addProjectResponseContext } from "../ContextAPI/ContextShare";

function AddProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //ContextAPI linking
  const {addProjectRes,setAddProjectRes}=useContext(addProjectResponseContext) 

  // to hold token
  const [token, setToken] = useState(" ");
  //to take token from session storage and give to setToken
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  // to hold the project details
  const [projectDetails, setprojectDetails] = useState({
    title: "",
    language: "",
    github: "",
    link: "",
    overview: "",
    projectImage: "",
  });
  console.log(projectDetails);

  //to hold the image url
  const [preview, setPreview] = useState("");
  console.log(preview);

  useEffect(() => {
    if (projectDetails.projectImage) {
      //convert it to a url
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  // Add project
  const AddProjectDetails = async () => {
    const { title, language, github, link, overview, projectImage } =
      projectDetails;

      console.log(projectDetails)

    if (!title || !language || !github || !link || !overview || !projectImage) {
      alert("Enter valid details");
    } else {
      //api call
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("link", link);
      reqBody.append("overview", overview);
      reqBody.append("projectImage", projectImage);
      
      console.log(reqBody)
      const reqHeader = {
        "Content-Type": "Multipart/formdata", //req contains a file upload content
        Authorization: `Bearer ${token}`, // req contains token for backend
      };

      //api call
      const result = await addProjectAPI(reqBody, reqHeader);
      console.log(result);

      if (result.status === 200) {
        setAddProjectRes(result.data);
        alert("project added successfully");
        handleClose() //to close modal 
        //to empty all fields after entering inputs
        setprojectDetails({
          title: "",
          language: "",
          github: "",
          link: "",
          overview: "",
          projectImage: "",
        });
        //to empty images field
        setPreview("");
      }
      else{
        alert(result.response.data)  //Project Already Exists
        console.log(result.response.data); //error msg
      
      }
    }
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleShow}>
        Add Project
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col>
              <label>
                <input
                  type="file"
                  onChange={(e) =>
                    setprojectDetails({
                      ...projectDetails,
                      projectImage: e.target.files[0],
                    })
                  }
                  style={{ display: "none" }}
                />
                <img
                  src={preview ? preview : ProjectImage}
                  fluid
                  className="w-100 h-100"
                  alt=""
                />
              </label>
            </Col>
            <Col>
              <input
                type="text"
                value={projectDetails.title}
                className="form-control my-2"
                placeholder="Project Title"
                onChange={(e) =>
                  setprojectDetails({
                    ...projectDetails,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={projectDetails.language}
                className="form-control my-2"
                placeholder="Language Used"
                onChange={(e) =>
                  setprojectDetails({
                    ...projectDetails,
                    language: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={projectDetails.github}
                className="form-control my-2"
                placeholder="Github Link"
                onChange={(e) =>
                  setprojectDetails({
                    ...projectDetails,
                    github: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={projectDetails.link}
                className="form-control my-2"
                placeholder="Website Link"
                onChange={(e) =>
                  setprojectDetails({ ...projectDetails, link: e.target.value })
                }
              />
              <input
                type="text"
                value={projectDetails.overview}
                className="form-control my-2"
                placeholder="Project Overview"
                onChange={(e) =>
                  setprojectDetails({
                    ...projectDetails,
                    overview: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={AddProjectDetails}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProject;
