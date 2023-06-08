import axios from 'axios';
import React from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CardLesson from "../components/CardLesson";
import Navbar from "../components/Navbar";

const Groups = () => {
  //state
  let [teacherId, teacherIdState] = useState(null);
  let [course, courseState] = useState([]);
  let [teachers, teachersState] = useState([]);
  let [group, groupState] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    //token generation
     let tokenId = localStorage.getItem("token");
     if (!tokenId) {
       navigate("/login");
     }
    const getCourse = async () => {
      
       try {
         let data = await axios.get(`/course`);
         courseState(data.data);
       } catch (error) {
         console.log(error.response.data.message);
         return toast(error.response?.data?.message, { type: "error" });
       }
    };
    getCourse();

    const getTeachers = async () => {
      let data = await axios.get(`/teachers`);
      teachersState(data.data);
    };
    getTeachers();

    const getGroups = async () => {
      let data = await axios.get(`/group`);
      groupState(data.data);
    };
    getGroups();

  }, []);
  console.log(course);
  console.log(teachers);


   const handleSubmit = async (e) => {
     try {
       e.preventDefault();
       const course = e.target.course.value;
       const groupTitle = e.target.groupTitle.value;
       const teacher = e.target.teacher.value;
       const days = e.target.days.value;
       const time = e.target.time.value;
       console.log(course, groupTitle, days, time, teacher);
       let dataHero = {
         group_title: groupTitle,
         day_lesson: days,
         time_lesson: time,
         teacher_id: teacher,
         course_id: course,
       };
       console.log(dataHero);
       let res = await axios.post(`/group`, dataHero);
       if (res) {
         toast(res.data.message, { type: "success" });
       }
     } catch (error) {
      console.log(error);
      toast(error.response.data.message, { type: "error" });
     }

   };


  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="Guruhlar" />
        <form className="container" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="dv-hedding">Guruh qo'shish</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="label" htmlFor="course">
                  Guruh yo'nalishi:
                </label>
                <select id="course" className="form-select">
                  <option value="value" selected>
                    yo'nalish...
                  </option>
                  {course?.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.course_title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="label" htmlFor="course">
                  Teacher group
                </label>
                <select id="teacher" className="form-select">
                  <option value="value" selected>
                    Teachers...
                  </option>
                  {teachers?.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.teacher_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <labe className="label" l htmlFor="days">
                  Guruh nomi:
                </labe>
                <input type="text" className="form-control" id="groupTitle" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <labe className="label" l htmlFor="days">
                  Dars kunlari:
                </labe>
                <select id="days" className="form-select">
                  <option value="DU-CHOR-JUMA">DU-CHOR-JUMA</option>
                  <option value="SE-PAY-SHAN">SE-PAY-SHAN</option>
                  <option value="Har kuni">Har kuni</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="label" htmlFor="time">
                  Dars vaqti:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="time"
                  placeholder="HH:MM - HH:MM"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Qo'shish
            </button>
          </div>
        </form>
        <div className="davomat pt-4 ps-5 pe-5">
          <div className="d-flex justify-content-between pb-4">
            <h2 className="dv-hedding fw-bold fs-2">Mavjud Guruhlar</h2>
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

export default Groups