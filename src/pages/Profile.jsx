import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status == "ok") {
          setUser(result.user);
        } else if ((result.status = "forbidden")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          }).then((value) => {
            navigate("/");
          });
        }
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <div class="card mx-auto" style={{width: "18rem"}}>
        <img src={user.avatar} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            {user.fname} {user.lname}
          </h5>
          <p class="card-text">{user.username}</p>
          <a href="#" class="btn btn-primary">
            View more
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
