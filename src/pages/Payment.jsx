import Table from "../components/Table";
import React from "react";
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  let [monthPaymentAll, monthPaymentAllState] = useState(null);
  let [allGroup, allGroupState] = useState([]);
  let [groupId, groupIdState] = useState(null);
  let [students, studentState] = useState([]);
  let [studentId, studentIdState] = useState(null);
  let [state, statedState] = useState(1);
  let [Load, setLoad] = useState(true);
  const d = new Date();
  let navigate = useNavigate();


  useEffect(() => {
    //token Generation
    let tokenId = localStorage.getItem("token");
    if (!tokenId) {
      navigate("/login");
    }

    //allGroup
    const getCourse = async () => {
      
       try {
         let data = await axios.get(`/group`);
         allGroupState(data.data);
       } catch (error) {
         console.log(error.response.data.message);
         return toast(error.response?.data?.message, { type: "error" });
       }
    };
    getCourse();

    //monthAllPayment
    let dataRes1 = {
      start: `${d.getFullYear()}-${d.getMonth() + 1}-01`,
      end: `${d.getFullYear()}-${d.getMonth() + 1}-30`,
    };

    const getMonthAllPayment = async () => {
      let res1 = await axios.post(`/paid`, dataRes1);
      monthPaymentAllState(res1.data);
      console.log(res1);
    };
    getMonthAllPayment();
  }, [Load]);

  //get group student
  let groupStudents = (e) => {
    let group_name = e.target.value;
    let { group_id } = allGroup.find((g) => g.group_title == group_name);
    groupIdState(group_id);
    const getStudent = async () => {
      let data = await axios.get(`/student/${group_id}`);
      studentState(data.data);
    };
    getStudent();
  };

  //student id get
  let studentIdFunc = (e) => {
    let student_name = e.target.value;
    console.log(student_name);
    let { student_id } = students.find((g) => g.student_name == student_name);
    studentIdState(student_id);
  };

  //payment
  let handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoad(!Load);
    let data = {
      student_id: studentId,
    };
    let res = await axios.post(`/payment`, data);
    if (res.data) {
      toast(res.data.message, { type: "success" });
    }
    statedState(d.getSeconds());
  };

  //console
  console.log("monthPaymentAll", monthPaymentAll);
  console.log("allGroup", allGroup);
  console.log("GroupId", groupId);
  console.log("students", students);
  console.log("studentId", studentId);
  console.log(state);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="To'lovlar" />
        <div className="container">
          <h1 className="dv-hedding">To’lov qilish</h1>
          <form onSubmit={(e) => handleSubmitPayment(e)}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="label" htmlFor="course">
                    Guruh yo'nalishi:
                  </label>
                  <select
                    id="course"
                    className="form-select"
                    onChange={groupStudents}
                  >
                    <option value="value" selected>
                      group name
                    </option>
                    {allGroup?.map((g) => {
                      return (
                        <option key={g.id} value={g.id}>
                          {g.group_title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="label" htmlFor="course">
                    Guruh students
                  </label>
                  <select
                    id="course"
                    className="form-select"
                    onChange={studentIdFunc}
                  >
                    <option value="value" selected>
                      student name
                    </option>
                    {students?.map((c) => {
                      return (
                        <option key={c.id} value={c.id}>
                          {c.student_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary mt-4 w-100">
                  To'lov qilish
                </button>
              </div>
            </div>
          </form>

          <div className="davomat pt-4 ps-5 pe-5">
            <div className="d-flex justify-content-between pb-4">
              <h2 className="dv-hedding fw-bold fs-2">
                To’lov qilganlar (shu oy bo’yicha)
              </h2>
              <input
                type="search"
                className="form-control rounded-4 dv-search"
                placeholder="O’quvchi ismini kiriting"
              />
            </div>
            <table className="table table-hover">
              <thead className="bg-primary text-white">
                <tr>
                  <th>N^</th>
                  <th>O'quvchi ismi</th>
                  <th>Telefon nomer</th>
                  <th>Yo'nalish</th>
                  <th>Tell</th>
                  <th>Deleted</th>
                </tr>
              </thead>
              <tbody>
                {monthPaymentAll?.map((s, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{s.student_name}</td>
                      <td>{s.student_surname}</td>
                      <td>{s.group_title}</td>
                      <td>{s.student_tel_nomer}</td>
                      <td>
                        <i className="fa-solid fa-trash text-danger"></i>
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
  );
};

export default Payment;
