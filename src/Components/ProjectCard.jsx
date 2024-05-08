import React, { useState } from "react";
import {Card, Row, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../Services/baseUrl";

function ProjectCard({project}) {
  console.log(project)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card onClick={handleShow} className="p-3 m-5">
        <Card.Img variant="top" src={project?`${baseUrl}/uploads/${project?.projectImage}`:"null"} fluid/>
        <Card.Body>
          <Card.Title className="text-center text-justify">{project?.title}</Card.Title>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <h3 className="text-center text-justify mb-4">Project Details</h3>
                <Col>
                   <img src={project?`${baseUrl}/uploads/${project?.projectImage}`:"null"} fluid className='w-100 h-95 px-4' alt="" />
                </Col>
                <Col>
                    <h3 className="text-justify">{project?.title}</h3>
                    <span>
                        <p className="text-justify"><b>Project Overview : </b>{project?.overview}</p>
                    </span>
                    <p className="text-justify">Lanquage Used : <b>{project?.language}</b> </p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-evenly">
          <Button variant="light" onClick={()=>{window.location.href=project.github}}>
              <i class="fa-brands fs-3 fa-github fa-beat-fade "></i>
          </Button>
          <Button variant="light" onClick={()=>{window.location.href=project.link}}>
              <i class="fa-solid fs-3 fa-link fa-beat-fade"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectCard;
