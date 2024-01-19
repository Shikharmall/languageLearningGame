import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { PieController, CategoryScale, Legend, Tooltip } from 'chart.js';
import 'chart.js';

function Progress({ width, height }) {
  const [data1, setData1] = useState([]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Extract unique publication dates
      const uniquePublicationDates = [...new Set(data1.map((item) => item.published))];

      // Create an object to store intensities for each publication date
      const intensitiesByDate = {};

      // Initialize intensitiesByDate with zeros
      uniquePublicationDates.forEach(date => {
        intensitiesByDate[date] = 0;
      });

      // Accumulate intensities for each publication date
      data1.forEach((item) => {
        intensitiesByDate[item.published] += item.intensity;
      });

      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: uniquePublicationDates,
          datasets: [
            {
              label: "Total Intensity",
              data: uniquePublicationDates.map(date => intensitiesByDate[date]),
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChart);
    }
  }, [data1]);

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Progress;
