import { useEffect,useState } from 'react';
import Chart from 'chart.js';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ChartLine from './ChartLine';


export default function ChartBar() {
    const variables={
        API_URL:"http://localhost:9004/" }
    const [display, setDiplay] = useState(false);

    const [date, setDate] = useState([
      new Date(2005, 6, 1),
      new Date(2050, 6, 10),
    ]);
  
    const ob={ob:{
      
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
           /*"date1": new Date(''+startDate.toISOString() ),
    "date2": new Date(''+endDate.toISOString())*/
    "date1": "2005-03-16T10:00:25.307Z" ,
    "date2": "2033-03-16T10:00:25.307Z" 
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
          // "date1": new Date(''+date[0  ]).toISOString() ,
          "date1": "2005-03-16T10:00:25.307Z" ,
          "date2": "2033-03-16T10:00:25.307Z" 
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
    
    console.log(data);
    console.log("-------------------");

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
        <Card>
            <CardHeader color="pink" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                his is the calendar
                </h6>
    </CardHeader>
            <CardBody>
                <div className="relative h-96">
                <div className='app'>
      <h1 className='text-center'> This is the calendar</h1>
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
      <div className="min-w-screen    flex items-center justify-center px-5 py-5">

<ChartLine info={data.ob} />

</div>
            </CardBody>
        </Card>
    );
}
