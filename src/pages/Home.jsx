import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import { Chart } from 'chart.js/auto';
import HomeCard from '../components/HomeCard'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";



const Home = () => {

  // Bar Chart
  const labels = ["January", "February", "March", "April", "May"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Jami o'quvchilar",
        backgroundColor: "rgb(50, 153, 249)",
        borderColor: "rgb(255, 99, 132)",
        data: [170, 200, 185, 240, 280, 300],
      },
      {
        label: "Tark etganlar",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [25, 20, 12, 25, 40, 48],
      },
    ],
  };

//state
  let [teachers, teacherState] = useState(0);
  let [student, studentState] = useState(0);
  let [group, groupState] = useState([]);
  let navigate = useNavigate();
  
  
  // useEffect
  useEffect(() => {
    
    //token Generation
    let tokenId = localStorage.getItem("token");
    if (!tokenId) {
      navigate("/login");
    }
      const getTeachers = async () => {
        try {
          let tokenId = localStorage.getItem("token");
          if (tokenId) axios.defaults.headers.common["token"] = tokenId;
          let data = await axios.get(`/teachers`);
          teacherState(data.data.length);
          
          } catch (error) {
          console.log(error.response.data.message);
          return toast(error.response?.data?.message, { type: "error" });
          }
      };
      getTeachers();

      const getStudent = async () => {
        try {
          let tokenId = localStorage.getItem("token");
          if (tokenId) axios.defaults.headers.common["token"] = tokenId;
          let data = await axios.get(`/student`);
          studentState(data.data.length);
        } catch (error) {
          console.log(error.response.data.message);
        }
      };
      getStudent();
      
      const getCourse = async () => {
        try {
          let tokenId = localStorage.getItem("token");
          if (tokenId) axios.defaults.headers.common["token"] = tokenId;
          let data = await axios.get(`/group`);
          groupState(data.data.length);           
        } catch (error) {
           console.log(error.response.data.message);            
        }
      };
      getCourse();
  }, []);

  //console
  console.log(group);
  console.log(teachers);
  console.log(student);

  return (
    <div className="d-flex">
      <Sidebar />
      <main className="homeMainSide">
        <Navbar title="Xisobot"/>
        <div className="homeCardsWrapper p-5">
          <HomeCard title="Jami o'quvchilar soni:" number={student} />
          <HomeCard title="O'qituvchilar soni:" number={teachers} />
          <HomeCard title="Shu oy tark etganlar:" number="31" />
          <HomeCard title="Jami guruhlar soni:" number={group} />
        </div>
        <div>
          <h2 className='text-center'>Aprel oyi bo'yicha statistika</h2>
          <Bar data={data} />
        </div>
      </main>
    </div>
  );
}

export default Home