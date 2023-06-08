import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  let [student, studentsState] = useState([]);
  let [delStufent, delStufentState] = useState(true);

  useEffect(()=>{
     const getStudents = async () => {
       let data = await axios.get(`/student`);
      studentsState(data.data);
     };
     getStudents();
  },[])

  let deleteStudent = async(e)=>{
    let s_id= e.currentTarget.dataset.tag;
    try {
      let data = await axios.get(`/student/${s_id}`);
      console.log(data);
      delStufentState(!delStufent);     
    } catch (error) {
      console.log(data);      
    }

  }

  return (
    <table className="table table-hover">
      <thead className="bg-primary text-white">
        <tr>
          <th>N^</th>
          <th>O'quvchi ismi</th>
          <th>Telefon nomer</th>
          <th>Yo'nalish</th>
          <th>Ota-ona(F.I.Sh)</th>
          <th>Ota-ona(tel)</th>
          <th>Student img</th>
          <th>Deleted</th>
        </tr>
      </thead>
      <tbody>
        {student?.map((s, idx) => {
          return (
            <tr>
              <td>{idx + 1}</td>
              <td>{s.student_name}</td>
              <td>{s.student_tel_nomer}</td>
              <td>{s.group_title}</td>
              <td>{s.parents_name}</td>
              <td>{s.parents_tel_nomer}</td>
              <td>
                <img
                  src={s.student_img}
                  style={{ height: "30px", width: "30px" }}
                  alt=""
                />
              </td>
              <td>
                <i
                  data-tag={s.id}
                  onClick={deleteStudent}
                  className="fa-solid fa-trash text-danger"
                ></i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table