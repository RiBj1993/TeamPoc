import React, { useState, useEffect }  from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import {variables} from './Variables.js';
import { Line } from "react-chartjs-2";


ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);


function Graph() {    
    useEffect(() => {
        const fetchSamplings = async () => {
            const res = await fetch(variables.API_URL+'getAllAGG');
            const data = await res.json();
            
            setChartData({
                labels: data.map((sampling) => sampling.checkpoint),
                datasets: [{
                    label: "Network SID",
                    data: data.map((sampling) => sampling.networK_SID),
                    borderColor: "#3333ff",
                    fill: true,
                    lineTension: 0.5                    
                },
                {
                  data: data.map((sampling) => sampling.rsL_DEVIATION),
                  label: "RSL deviation",
                  borderColor: "#ff3333",
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  fill: true,
                  lineTension: 0.5
                }]
            },);
        }
        fetchSamplings();        
    }, [])

    const [chartData, setChartData] = useState({
        datasets: [],
    });

    return(
      <Line
      type="line"
      width={160}
      height={60}
      options={{
        title: {
          display: true,
          text: "AGG line Chart",
          fontSize: 20
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={chartData}
    />
    )
  }

  export default Graph;