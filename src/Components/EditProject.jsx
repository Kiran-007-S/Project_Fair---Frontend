import React, { useState, useEffect,useContext } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { baseUrl } from "../Services/baseUrl";
import { editUserProjectResponseContext } from "../ContextAPI/ContextShare";


function EditProject({details}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {editUserProjectRes,setEditUserProjectRes} = useContext(editUserProjectResponseContext);
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
    id:details._id,
    title:details?.title,
    language: details?.language,
    github: details?.github,
    link: details?.link,
    overview: details?.overview,
    projectImage: details?.projectImage,
  });
  console.log(projectDetails);

  //to hold the image url
  const [preview, setPreview] = useState("");
  console.log(preview);

  useEffect(()=>{
    if(projectDetails.projectImage){
        //convert it to a url
        setPreview( URL.createObjectURL(projectDetails.projectImage));
    }
  },[projectDetails.projectImage])

  const updateproject= async()=>{
    const {id,title,language,github,link,overview,projectImage}=projectDetails

    if(!title||!language||!github||!link||!overview||!projectImage){
      alert("Please enter details")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("link", link);
      reqBody.append("overview", overview);
      preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage",details.projectImage)
    
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateproject(id,reqBody,reqHeader)
        console.log(result);

        if(result.status===200){
          setEditUserProjectRes(result.data)
          console.log(result.data);
          alert("Project Details Updated Successfully")
          handleClose()

        }else{
          console.log(result.response.data);
        }
      }
    }
  }
  return (
    <div>
      <button className="border-0" onClick={handleShow}>
         <i className="fa-solid fa-pen"></i>
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
                  src={preview ? preview :`${baseUrl}/uploads/${projectDetails?.projectImage}`}
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
          <Button variant="info" onClick={updateproject()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProject;
