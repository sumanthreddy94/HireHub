import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useSelector } from "react-redux";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA33CC",
  "#57FF33", "#FF9933", "#33A1FF", "#9933FF", "#FF33C8"
];


const AdminDashBoard = () => {
    
    const [dashboardData, setDashboardData] = useState({});
    const { isAuthorized, user } = useSelector((state) => {
      return state.auth;
    }); 

    const charts = [
      { key: "jobsByCategory", title: "Jobs by Category" },
      { key: "applicationStatuses", title: "Application Statuses" },
      { key: "experienceLevels", title: "Experience Levels" },
      { key: "employmentTypes", title: "Employment Types" },
      { key: "userTypes", title: "User Roles" },
    ];


    useEffect(() => {
      console.log(user);
        if (user && user.role === "Admin") {
            axios
              .get("http://localhost:4000/api/v1/user/dashboard", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
                const data = res.data;

                setDashboardData({
                    jobsByCategory: data?.jobsByCategory.map(item => ({
                      name: item.category,
                      value: item.count
                    })),
                    applicationStatuses: data?.applicationStatuses.map(item => ({
                      name: item.status,
                      value: item.count
                    })),
                    experienceLevels: data?.experienceLevels.map(item => ({
                      name: item.experienceLevel,
                      value: item.count
                    })),
                    employmentTypes: data?.employmentTypes.map(item => ({
                      name: item.employmentType,
                      value: item.count
                    })),
                    userTypes: data?.userTypes.map(item => ({
                      name: item.role,
                      value: item.count
                    }))            
                  });
              })
              .catch((error) => {
                toast.error(error.response.data.message);
              });
          } 

          if (!isAuthorized) {
            navigateTo("/");
            return null; // Prevent rendering while redirecting
          }
    }, [isAuthorized, user])

    console.log(dashboardData);
    return (

    <>
    <section className="my_applications page">
      <div className="container">
        <h1>Analytics</h1>
        <div className="container">
          <div className="row">
            {charts.map((chart, index) => {
              const chartData = dashboardData[chart.key];

              return (
                chartData && (
                  <div key={index} className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <CustomPieChart data={chartData} title={chart.title} />
                    </div>
                  </div>
                </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </section>
  </>
    );
}

const CustomPieChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <p>{title}: No data available</p>;
  }

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const renderLabel = ({ name, value }) => {
    const percentage = ((value / totalValue) * 100).toFixed(1);
    return `${name} (${percentage}%)`;
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h3>{title}</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          outerRadius={120}
          label={renderLabel} 
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} (${((value / totalValue) * 100).toFixed(1)}%)`} />
      </PieChart>
    </div>
  );
};

export default AdminDashBoard




