import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({dataSet, option}) => {
    console.log(dataSet);
    
  const data = {
    labels: ["Defectives", "Non-defectives", 
        // "Yellow", "Green", "Purple"
    ],
    datasets: [
      {
        label: "Products",
        data: dataSet,
        backgroundColor: [
          "rgba(255, 0, 0, 0.7)",
          "rgba(200, 200, 200, 0.7)",
        //   "rgba(255, 206, 86, 0.7)",
        //   "rgba(75, 192, 192, 0.7)",
        //   "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(200, 200, 200, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // controls the donut hole size
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px", position: "absolute", marginBottom: "90px", fontSize: "15px",color: "#264D78bf" }}>{option === "days" ? "Today" : option === "weeks" ? "This week" : "This month"}'s <br />defectives</h2>
      <h2 style={{ textAlign: "center", marginBottom: "10px", position: "absolute", marginBottom: "30px", fontSize: "29px",color: "#264D78" }}>{dataSet[0].toLocaleString()}</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;