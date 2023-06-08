import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DavomatTable = () => {
  let { group_id } = useParams();
  let [student, studentsState] = useState([]);
  let [notstudent, notstudentState] = useState([]);
  let [checkBtn, checksBtnState] = useState(true);
  const d = new Date();

  useEffect(() => {

    const getStudents = async () => {
      let {data} = await axios.get(`/student/${group_id}`);
      data.forEach((e) => {
        e.attendance = true;
      });
      studentsState(data);
    };
    getStudents();

    let notLessonAttendence = async () => {
      let dataRes1 = {
        date: `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`,
        group_id: group_id,
      };
      console.log(dataRes1);
      let res = await axios.post(`/attendancenot`, dataRes1);
      notstudentState(res.data)
    };
    notLessonAttendence();
  }, []);

  if (notstudent.length !== 0) {
    student.forEach((e) => {
      notstudent.forEach((k)=>{
        if(e.student_id == k.student_id){
          e.attendance = false;
        }
      })
    });  
  } 

  let handleClick = (e) => {
    let s_id = e.currentTarget.dataset.tag;
    
    if(!s_id){
      console.log(23456);
      toast('btn ni yaxshilab bosing', { type: "error" });
    }

    student.forEach((e) => {
      if (e.student_id == s_id) {
        e.attendance = !e.attendance;
      }
    });
    studentsState(student);

    let attenFunc = async () => {
      let dataRes1 = {
        student_id: s_id,
        attendance:false,
      };
      let res = await axios.post(`/attendance`, dataRes1);
      console.log(res);
      checksBtnState(!checkBtn);
    };
    attenFunc();
    
  };

  return (
    <>
      <table className="table table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>N^</th>
            <th>O'quvchi FISH</th>
            <th>Davomat</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((s, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>
                  {s.student_name} {s.student_surname}
                </td>
                <button
                  onClick={(e) => handleClick(e)}
                  value={s.student_id}
                  data-tag={s.student_id}
                >
                  {s.attendance == false ? (
                    <i className="fa-solid fa-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-check"></i>
                  )}
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DavomatTable;
