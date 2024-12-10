import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import './recentSales.css';

function Reports() {
  const [options] = useState({
    chart: {
      id: "basic-line-chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    },
    title: {
      text: "Monthly Data Overview",
      align: "left",
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 4,
    },
    grid: {
      show: true,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Series 1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setSeries([
        {
          name: "Series 1",
          data: [35, 45, 50, 55, 60, 65, 75, 95],
        },
      ]);
    }, 5000);
  }, []);

  return (
    <div className="cards">
      <div className="card-body">
        <h5 className="card-titles">
          Reports <span>/ </span>
        </h5>
        <div className="rows">
          <div className="mixed-charts">
            <Chart
              options={options}
              series={series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
