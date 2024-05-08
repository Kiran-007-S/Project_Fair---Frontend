import React, { useEffect, useState } from "react";
import ProjectImage from "../Assets/Project-image.jpg";
import ProjectCard from "../Components/ProjectCard";
import {Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Marquee from "react-marquee-slider";
import { homeproject } from "../Services/allAPI";

function Home() {
  const [Homeproject, setHomeproject] = useState([])

  const gethomeproject = async()=>{
    const result = await homeproject()
    console.log(result);
    if(result.status===200){
      setHomeproject(result.data)
      console.log(Homeproject)
    }
    else{
     console.log(result.response.message);
    }
  }

  useEffect(()=>{gethomeproject()},[])
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 my-5 px-4">
          {/* content */}
          <h1 className="text-center m-4">Project Fair</h1>
          <p style={{ textAlign: "justify" }}>
            Project management is the strategic orchestration of resources and
            processes to achieve defined goals within set parameters. It
            involves meticulous planning, precise execution, and vigilant
            monitoring to ensure project success. Through effective leadership
            and coordination, project managers navigate complexities, anticipate
            challenges, and drive teams toward desired outcomes. They define
            project scope, allocate resources, and establish clear timelines to
            keep projects on track. By leveraging proven methodologies and
            tools, such as Agile or Scrum, project management fosters
            collaboration, streamlines workflows, and maximizes efficiency.
            Ultimately, it empowers organizations to deliver projects on time,
            within budget, and in alignment with strategic objectives.
          </p>

          <Link to={"/login"}>
            <div>
              <button className="btn btn-outline-dark my-2  rounded-pill text-black">
                Get Started
              </button>
            </div>
          </Link>
        </div>
        <div className="col-6 my-5 ">
          {/* Image */}
          <img
            src={ProjectImage}
            fluid
            className="w-100 h-95 px-4"
            style={{ marginTop: "10%" }}
            alt=""
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2 className="text-center">Explore Our Projects</h2>
          <Marquee>
           {
            Homeproject? Homeproject.map((item)=>(
              <Col>
                <ProjectCard project={item}/>
              </Col>
            )):"empty"
           }
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Home;
