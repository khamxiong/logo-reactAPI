import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'


const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": inputs.username,
      "password":  inputs.password,
      "expiresIn": 60000
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://www.melivecode.com/api/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.status == 'ok'){
            Swal.fire({
              title: <strong>Good job!</strong>,
              html: <i>You clicked the button!</i>,
              icon: 'success'
            }).then((value)=>{
                localStorage.setItem('token',result.accessToken)
                navigate('./profile')})
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="">
        <label className=" form-label">
          Enter your name:
          <input
          className="form-control"
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label className=" form-label">
          Enter your password:
          <input
          className="form-control"
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
