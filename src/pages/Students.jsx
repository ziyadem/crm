import Table from "../components/Table";
import React from "react";
import Navbar from "./../components/Navbar";
import Sidebar from "./../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Students = () => {
  let navigate = useNavigate();
  //state
   let [group, groupState] = useState([]);
   let [studentImg, studentimgState] = useState('');
   
   //useEffect
   useEffect(() => {
     //token Generation
     let tokenId = localStorage.getItem("token");
     if (!tokenId) {
       navigate("/login");
     }
      //group
     const getGroup = async () => {
      try {
        let data = await axios.get(`/group`);
        groupState(data.data);      
      } catch (error) {
         console.log(error.response.data.message);
         return toast(error.response?.data?.message, { type: "error" });
      }
     };
     getGroup();
   }, []);


    //uploadFille
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
       if (img) {
         toast('img upload', { type: "success" });
       }
       studentimgState(img);
     };



     //handleSubmit
   const handleSubmit = async (e) => {
     try {
       e.preventDefault();
       const student_name = e.target.name.value;
       const student_tel_nomer = +e.target.phone.value;
       const student_surname = e.target.surname.value;parent;
       const parents_name = e.target.parent.value;
       const parents_tel_nomer = +e.target.parentPhone.value;
       const group_id = e.target.course.value;
       let data = {
         student_name: student_name,
         student_surname: student_surname,
         parents_name: parents_name,
         student_tel_nomer: student_tel_nomer,
         parents_tel_nomer: parents_tel_nomer,
         student_img: studentImg,
         group_id: group_id,
       };

       let res = await axios.post(`/student`, data);
       if (res) {
         toast(res.data.message, { type: "success" });
       }
       } catch (error) {
        toast(error.response.data.message, { type: "error" });
       }
   };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="sd-right w-100">
        <Navbar title="O'quvchilar" />
        <div className="container">
          <h1 className="dv-hedding">Yangi o'quvchi qo'shish</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    O'quvchi ismi:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    O'quvchi Familyasi:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <labe className="label" l htmlFor="course">
                    Yo'nalish:
                  </labe>
                  <select id="course" className="form-select">
                    {group?.map((g) => {
                      return (
                        <option key={g.group_id} value={g.group_id}>
                          {g.group_title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label" htmlFor="phone">
                    Telefon raqam:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="+998 xx xxx xx xx"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-5 mt-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="parent" className="label">
                    Ota-onasi ismi:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="parent"
                    placeholder="Ota-onasi kiriting"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="teacher" className="label">
                    Ota-onasi tel raqami
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="parentPhone"
                    placeholder="+998 xx xxx xx xx"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="teacher" className="label">
                    O'quvchining surati
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="studentImg"
                    onChange={uploadPostFile}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary mt-4 w-100">
                  Qo'shish
                </button>
              </div>
            </div>
          </form>

          <div className="davomat pt-4 ps-5 pe-5">
            <div className="d-flex justify-content-between pb-4">
              <h2 className="dv-hedding fw-bold fs-2">Bizning o'quvchilar</h2>
              <input
                type="search"
                className="form-control rounded-4 dv-search"
                placeholder="O’quvchi ismini kiriting"
              />
            </div>
            <div>
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students