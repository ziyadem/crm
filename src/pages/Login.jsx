import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  //token Generation
  let tokenId = localStorage.getItem("token");
  useEffect(() => {
    if (tokenId) {
      navigate("/");
    }
  }, []);

  //registration
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      let data = { username: username, password: password };
      let res = await axios.post(`/login`, data);
      if (res) {
        toast(res.data.message, { type: "success" });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error.response?.data?.message, { type: "error" });
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center login">
      <div className="w-50 border p-5 rounded bg-dark bg-opacity-25">
        <h1 className="text-center pb-5 text-primary fs-1">Login</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            required
            name="username"
            id="username"
            className="form-control mb-4"
            placeholder="Username"
            min={3}
          />
          <input
            type="password"
            required
            name="password"
            className="form-control mb-4"
            id="password"
            placeholder="Your password"
            min={3}
          />
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
