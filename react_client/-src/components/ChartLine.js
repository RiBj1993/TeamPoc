import { Line } from 'react-chartjs-2';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import React, {useState, useEffect} from 'react';
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const buildData = ({ chartData }) => ({
    labels: chartData.labels,
    datasets: [
        {
            label: '',
            data: chartData.data,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            fill: 'start',
            tension: 0.4,
        },
    ],
});

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        yAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },

        xAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                circular: true,
                borderColor: 'rgba(255, 255, 255, .2)',
                color: 'rgba(255, 255, 255, .2)',
                borderDash: [5, 5]
            },
        },
    },
    layout: {
        padding: {
            right: 10,
        },
    },
};


const ChartLine = ({info}) => {
    const data = buildData(info);
    
    return (
        <>

<div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '500px' }}>
                <div className="flex w-full md:px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
                <Line type="line" data={data} options={options} />

                </div>
                </div>






{/*
            <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '1300px' }}>
                <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
                   
                <Card>
            <CardHeader color="orange" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                    Overview
                </h6>
            </CardHeader>
            <CardBody>
                <div className="relative h-96 w-100">
                <Line type="line" data={data} options={options} />
                </div>
            </CardBody>
        </Card>







                </div>

            </div>
            */}
        </>
    );
};

export default ChartLine;
