 import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import StockChart from "./components/stockChart";
import React, { useState,useEffect, useRef, useCallback, useMemo } from "react";
 
import {variables} from './Variables.js';
function App() {
  const [date, setDate] = useState([
    new Date(2005, 6, 1),
    new Date(2050, 6, 10),
  ]);

  const ob={ob:{
    stockFullName: "SW Limited.",
    stockShortName: "ASX:SFW",
    price: {
      current: 2.32,
      open: 2.23,
      low: 2.215,
      high: 2.325,
      cap: 93765011,
      ratio: 20.1,
      dividend: 1.67,
    },
    chartData: {
      labels:[4,5],
      data: [5,4],
    },
  }}
  const [data, setData] = useState(ob);
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
        }
          
          )
          
      })
      .then((res) => res.json())
      .then((data) => {
 
        const info = {ob:{
          stockFullName: "RSL DEVIATION",
          stockShortName: "Today",
          price: {
            current: 2.32,
            open: 2.23,
            low: 2.215,
            high: 2.325,
            cap: 93765011,
            ratio: 20.1,
            dividend: 1.67,
          },
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
        }
          
          )
          
      })
      .then((res) => res.json())
      .then((data) => {
 
        const info = {ob:{
          stockFullName: "RSL DEVIATION",
          stockShortName: "Today",
          price: {
            current: 2.32,
            open: 2.23,
            low: 2.215,
            high: 2.325,
            cap: 93765011,
            ratio: 20.1,
            dividend: 1.67,
          },
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
  /****************************************** */
  return (


<div>
<div className="min-w-screen  bg-yellow-100  flex items-center justify-center p20-5 py-1">
  
<div className='app'>
      <h1 className='text-center'> </h1>
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
      
<div className="min-w-screen  bg-yellow-200  flex items-center justify-center px-5 py-5">

<StockChart info={data.ob} />

</div> 
</div> 
  );
}

export default App;