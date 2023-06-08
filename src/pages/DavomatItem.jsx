import React from 'react'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CardLesson from "../components/CardLesson";
import DavomatTable from "../components/DavomatTable";
import Navbar from "../components/Navbar";
import axios from "axios";


const DavomatItem = () => {
  let {group_id}=useParams()
  let [group, groupState] = useState([]);
  let [notstudent, notstudentState] = useState([]);
  const d = new Date();

  useEffect(() => {
    const getGroups = async () => {
      let data = await axios.get(`/group/${group_id}`);
      groupState(data.data);
    };
    getGroups();

    let notLessonAttendence = async () => {
      let dataRes1 = {
        date: `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`,
        group_id: group_id,
      };
      console.log(dataRes1);
      let res = await axios.post(`/attendancenot`, dataRes1);
      notstudentState(res.data);
    };
    notLessonAttendence();
    
    console.log(notstudent);

  }, []);
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="Davomat" />
        <div className="davomat pt-4 ps-5 pe-5">
          <div className=" pb-4">
            <h2 className="dv-hedding fw-bold fs-2">Guruh royhati</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              {group?.map((g, idx) => {
                return <CardLesson groupData={g} key={idx} />;
              })}
              <h5>Bugn darsga kelmaganlar</h5>
              {notstudent?.map((s, idx) => {
                return (
                  <p>{s.student_name}</p>
                );
              })}
            </div>
            <div className="col-md-8">
              <DavomatTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DavomatItem