import ChartLine from 'components/ChartLine';
import ChartBar from 'components/ChartBar';
import './App.css';

import { useEffect,useState } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function Dashboard() {

const variables={
    API_URL:"http://localhost:9004/" }
const [display, setDiplay] = useState(false);

const [date, setDate] = useState([
  new Date(2000, 6, 1),
  new Date(2050, 6, 10),
]);

const ob={ob:{
  
  chartData: {
    labels:[4,5],
    data: [5,4],
  },
}}
const [data, setData] = useState(ob);
console.log("------------------------");
console.log(data.ob);
console.log("------------------------");

useEffect(() => {
  get( startDate,endDate);}, []);

async function get( startDate,endDate){
  await getEvents(startDate,endDate);
}
async function getEvents(startDate,endDate){
     console.log(startDate,endDate);

 if(date[1]!= null){
  fetch(variables.API_URL+'getAllAggBetweenDates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date1": new Date(''+startDate.toISOString() ),
  "date2": new Date(''+endDate.toISOString())
/*"date1": "2001-03-16T10:00:25.307Z" ,
"date2": "2033-03-16T10:00:25.307Z" */
      }
        
        )
        
    })
    .then((res) => res.json())
    .then((data) => {
console.log(data);
console.log("-------------------");

      const info = {ob:{
      
        chartData: {
          labels: data.map((sampling) => sampling.checkpoint),
          data:  data.map((sampling) => sampling.rsL_DEVIATION),
        },
      }};
      setData(info);
    })
    .catch((err) => {
      console.log(err);
    });}

  };

     


useEffect(() => {
  fetch(variables.API_URL+'getAllAggBetweenDates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date1": new Date(''+date[0]).toISOString() ,
  "date2": new Date(''+date[1]).toISOString()
     /* "date1": "2001-03-16T10:00:25.307Z" ,
      "date2": "2033-03-16T10:00:25.307Z" */
      }
        
        )
        
    })
    .then((res) => res.json())
    .then((data) => {

      const info = {ob:{
       
        chartData: {
          labels: data.map((sampling) => sampling.checkpoint),
          data:  data.map((sampling) => sampling.rsL_DEVIATION),
        },
      }};
      setData(info);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);



const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
const [selectRange, setSelectRange] = useState(true);

const onChange = (dates) => {
  console.log('onChange triggered', dates);

  if (Array.isArray(dates)) {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setSelectRange(false);
    get( start,end);
  } else {
    setEndDate(dates);
    setSelectRange(true);

  }
};

    return (
        <>
         <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

<div className="px-3 md:px-8 -mt-24">
    <div className="container mx-auto max-w-full">
        <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">

            <Card>
            <CardHeader color="orange" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                    Overview
                </h6>
                <h2 className="text-white text-2xl">Sales value</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                <ChartLine  info={data.ob}/>
                </div>
            </CardBody>
        </Card>

   
                       
                       
                       
                       
                       
                        <Card>
            <CardHeader color="pink" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                This is the calendar
                </h6>
    </CardHeader>
            <CardBody>
                <div className="relative h-96">
                <div className='app'>
      <div className='calendar-container'>
        <Calendar
                onChange={onChange}
                value={date}
           defaultValue={date} 
            endDate={endDate}
                inline={true}
                 selected={new Date()}
                selectRange={selectRange}
                showWeekNumbers={true}
                startDate={new Date()}
           
        />
      </div>
      {endDate!= null ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {startDate.toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {endDate.toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {endDate.toDateString()}
        </p>
      )}
      
      
      </div>  


</div>
            </CardBody>
        </Card>                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
}
