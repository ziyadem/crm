import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CardLesson from "../components/CardLesson";
import DavomatTable from "../components/DavomatTable";
import Navbar from "../components/Navbar";
import axios from "axios";

const DavomatItem = () => {
  let { group_id } = useParams();
  let [group, groupState] = useState([]);
  let [paymentStudent, paymentStudentState] = useState([]);
  let [allStudent, allStudentState] = useState([]);
  const d = new Date();

  useEffect(() => {
    const getGroups = async () => {
      let data = await axios.get(`/group/${group_id}`);
      groupState(data.data);
    };
    getGroups();

    //monthAllPayment
    let dataRes1 = {
      start: `${d.getFullYear()}-${d.getMonth() + 1}-01`,
      end: `${d.getFullYear()}-${d.getMonth() + 1}-30`,
      group_id: group_id,
    };
    const getMonthAllPayment = async () => {
      let res1 = await axios.post(`/grouppayment`, dataRes1);
      paymentStudentState(res1.data);
    };
    getMonthAllPayment();

    //all student group
    const getStudentGroup = async () => {
      let res2 = await axios.get(`/student/${group_id}`);
      allStudentState(res2.data);
    };
    getStudentGroup();
  }, []);

let arr=[]
paymentStudent.forEach((e) => {
  arr.push(e.id)
});
let notPayment=[]
allStudent.forEach(s=> {
  if(arr.includes(s.student_id)){
    s.payment=true;
  }else{notPayment.push(s.student_name)}
});
console.log(notPayment);
console.log("allstudent",allStudent);
  
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="Davomat" />
        <div className="davomat pt-4 ps-5 pe-5">
          <div className=" pb-4">
            <h2 className="dv-hedding fw-bold fs-2">Guruh royhati</h2>
          </div>
          <div className="row ">
            <div className="col-md-4">
              {group?.map((g) => {
                return <CardLesson groupData={g} />;
              })}
              <h5>To'lov amalga oshirmahanlar(shu oy bo'yicha)</h5>
              <ol>{notPayment?.map((p,idx)=>{
                return(
                  <li key={idx}>{p}</li>
                )
              })}</ol>
            </div>
            <div className="col-md-8">
              <table className="table table-hover">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>N^</th>
                    <th>O'quvchi ismi</th>
                    <th>To'lov</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudent?.map((s, idx) => {
                    return (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{s.student_name}</td>
                        <td>
                          {s.payment ? (
                            <i className="fa fa-check text-primary"></i>
                          ) : (
                            <i className="fa fa-remove text-danger"></i>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DavomatItem;
