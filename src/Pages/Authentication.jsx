import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import gif_login from "../Assets/IGCF.gif";
import { loginAPI, registerAPI } from "../Services/allAPI";

function Authentication({ register }) {

  const location = useNavigate()
  const isRegisterform = register ? true : false;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const registerData= async()=>{
    const {username,email,password} = userData;
    if(!username||!email||!password){
      alert('Please enter valid details')
    }
    else{
      const result = await registerAPI(userData);
      console.log(result)
      if(result.status === 200){
        alert(`${result.data}`) //user registration success
        location("/login")
      }
      else{
        alert(result.response.data) // user registration failed
      }
    }  
  }

  //login function
  const loginData = async()=>{
    const {email,password} = userData;
    if (!email||!password){
      alert('Please enter valid details')
    }
    else{
      const result = await loginAPI(userData)
      console.log(result)
      if(result.status===200){
        alert("Successfully login")
        //set user object into session storage
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        location("/dashboard")
      }
      else{
        alert("Please enter valid details")
      }
    }
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="container">
          <Row>
            <Col className="m-5 p-3">
              <img src={gif_login} alt="Login" />
            </Col>
            <Col className="m-5 p-3  shadow rounded-3">
              <h3 className="text-center mt-5">Project Fair</h3>
              <h5 className="text-center mt-3">
                {isRegisterform ? "Register here" : "Login here"}
              </h5>

              <form className="mt-4">
                {isRegisterform && (
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    className="form-control my-2"
                    placeholder="Enter Name"
                  />
                )}
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="form-control my-2"
                  placeholder="Enter Email"
                />
                <input
                  type="text"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="form-control my-2"
                  placeholder="Enter Password"
                />
              </form>
              {isRegisterform ? (
                <div className="text-center mt-4">
                  <button className="btn btn-success" onClick={registerData}>Register</button>
                  <Link
                    to={"/Login"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p className="m-3"> Already Register? Please Login here</p>
                  </Link>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <button onClick={loginData} className="btn btn-info">Login</button>
                  <Link
                    to={"/register"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p className="m-3">New here ? Please Register ...</p>
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </div>
        <div className="text-center">
          <Link to={"/"}>
            <button className="btn btn-dark m-5">Back To Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
