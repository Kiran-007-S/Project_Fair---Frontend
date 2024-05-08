import React from "react";
import { Row, Col } from "react-bootstrap";
import MyProject from "../Components/MyProject";
import MyProfile from "../Components/MyProfile";
import { Link } from "react-router-dom";

function Dashboard() {
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  return (
    <div>
      <div>
        <Row>
          <h2 className="p-5 text-start">
            Welcome &nbsp;
            <span className="text-primary">{existingUser.username}</span>
          </h2>
          <Col className="my-2 " sm={12} md={6}>
            {/*User Projects */}
            <MyProject />
          </Col>
          <Col className="my-2" sm={12} md={6}>
            {/*User Profile */}
            <MyProfile />
          </Col>
        </Row>
        <div>
          <Link to={"/projects"}>
            <div className="text-center">
              <button className="btn btn-outline-dark btn-lg m-3 rounded-pill shadow text-black">
                View All Projects
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
