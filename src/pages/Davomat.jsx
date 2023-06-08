import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import CardLesson from "../components/CardLesson";
import Navbar from "../components/Navbar";
import axios from 'axios';

const Davomat = () => {
      let navigate = useNavigate();
      let [group, groupState] = useState([]);
      let tokenId = localStorage.getItem("token");

      useEffect(() => {

        //token generation
        if (!tokenId) {
          navigate("/login");
        }

        const getGroups = async () => {   
          try {
            let data = await axios.get(`/group`);
            groupState(data.data);
          } catch (error) {
            console.log(error.response.data.message);
            return toast(error.response?.data?.message, { type: "error" });
          }
        };
        getGroups();
      }, []);
  

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="Davomat" />
        <div className="davomat pt-4 ps-5 pe-5">
          <div className="d-flex justify-content-between pb-4">
            <h2 className="dv-hedding fw-bold fs-2">
              Davomat olinadigan guruhni tanlang
            </h2>
            <input
              type="search"
              className="form-control rounded-4 dv-search"
              placeholder="Guruh nomini kiriting"
            />
          </div>
          <div className=" row">
            {group?.map((g) => {
              return (
                <div className="col-md-4">
                  <CardLesson groupData={g} />;
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Davomat