import React from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import CardLesson from "../components/CardLesson";
import Navbar from "../components/Navbar";


const Teachers = () => {
  let [teacherimg, teacherimgState] = useState("sjhbsoduosundsjh");
  let [teachers, teachersState] = useState([]);


  //useEffect
  useEffect(() => {
    //allTeachers
    const getAllTeachers = async () => {
      
      try {
        let data = await axios.get(`/teachers`);
        teachersState(data.data);        
      } catch (error) {
        console.log(error.response.data.message);
        return toast(error.response?.data?.message, { type: "error" });
      }
    };
    getAllTeachers();
  }, []);

  //uploadFile
  const uploadPostFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "exam_three_backend");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsv0yl7sh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const data2 = await res.json();
    let img = data2.secure_url;
    teacherimgState(img);
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const teacher_tell = e.target.teacherTel.value;
      const teacher_name = e.target.teacherName.value;
      const teacher_surname = e.target.teacherSurname.value;
      
      let data = {
        teacher_name: teacher_name,
        teacher_surname: teacher_surname,
        teacher_tell: teacher_tell,
        teacher_img: teacherimg,
      };
      let res = await axios.post(`/teacher`, data);
       if (res) {
         toast(res.data.message, { type: "success" });
       }
     
    } catch (error) {
    toast(error.response.data.message, { type: "error" });
    }
  };

  console.log("teacherImg",teacherimg);
  console.log("teachers", teachers);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="Teachers" />
        <form className="container" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="dv-hedding">Teacher qo'shish</h1>
          <div className="row mb-5 mt-3">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="teacher" className="label">
                  O'qituvchi ismi:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="teacherName"
                  placeholder="O'qituvchi ismi"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="teacher" className="label">
                  O'qituvchi Familyasi:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="teacherSurname"
                  placeholder="O'qituvchi familyasi"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="teacherTel" className="label">
                  O'qituvchi tel raqami
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="teacherTel"
                  placeholder="+998 xx xxx xx xx"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="teacherImg" className="label">
                  O'qituvchi rasmi
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="teacherImg"
                  name="teacherImg"
                  onChange={uploadPostFile}
                />
              </div>
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary mt-4 w-100">
                Qo'shish
              </button>
            </div>
          </div>
        </form>
        <div className="davomat pt-4 ps-5 pe-5">
          <div className="d-flex justify-content-between pb-4">
            <h2 className="dv-hedding fw-bold fs-2">Barcha o`qtuvchilar</h2>
            <input
              type="search"
              className="form-control rounded-4 dv-search"
              placeholder="O'qtuvchilar nomini kiriting"
            />
          </div>
          <table className="table table-hover">
            <thead className="bg-primary text-white">
              <tr>
                <th>N^</th>
                <th>Teacher name</th>
                <th>Teacher surname</th>
                <th>Teacher tell</th>
                <th>Teacher img</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((s, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{s.teacher_name}</td>
                    <td>{s.teacher_surname}</td>
                    <td>{s.teacher_tell}</td>
                    <td>
                      <img
                        src={s.teacher_img}
                        style={{ height: "30px", width: "30px" }}
                        alt=""
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
