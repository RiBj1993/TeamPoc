import StockChart from "./components/stockChart";
import React, { useState,useEffect, useRef, useCallback, useMemo } from "react";
import { formatDistance, subDays } from 'date-fns'

import {variables} from './Variables.js';
import moment from "moment";
import {
 DateRangePicker,
 defaultStaticRanges,
 createStaticRanges
} from "react-date-range";
import { useTheme } from "@material-ui/core/styles";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DatePicker from "./DatePicker";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function App() {

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

 const [state, setState] = useState([
   {
     startDate: new Date(),
     endDate:  new Date(),
     key: "selection"
   }
 ]);
 /***************************************** */
/**{
 "date1": startDate.toISOString(),
 "date2": endDate.toISOString()
} */
 /********************************************/
 useEffect(() => {
   fetch(variables.API_URL+'getAllAggBetweenDates', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        "date1": startDate.toISOString(),
 "date2": endDate.toISOString()
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
 /****************************************** */
 //------------------------------------------
 const theme = useTheme();
 const [ranges, setRanges] = useState([
   {
     startDate: null,
     endDate: null,
     key: "rollup"
   }
 ]);

 const staticRanges = createStaticRanges([
   ...defaultStaticRanges,
   {
     label: "This Year",
     range: () => ({
       startDate: moment()
         .startOf("year")
         .toDate(),
       endDate: moment()
         .endOf("day")
         .toDate()
     })
   },
   {
     label: "Last Year",
     range: () => ({
       startDate: moment()
         .subtract(1, "years")
         .startOf("year")
         .toDate(),
       endDate: moment()
         .subtract(1, "years")
         .endOf("year")
         .toDate()
     })
   }
 ]);
 //------------------------------------------
 const now = useRef(new Date());
 const [to, setTo] = useState(now.current);
 const [from, setFrom] = useState(subDays(now.current, 7));

 /*const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
   setFrom(startDate);
   setTo(endDate);
 });*/

 const rangess = useMemo(() => {
   return [
     {
       startDate: from,
       endDate: to,
       key: "selection"
     }
   ];
 }, [from, to]);
const handleSelect = (ranges ) => {
    console.log(ranges);
}

 return (
   <div>
     <div className="min-w-screen  bg-yellow-100  flex items-center justify-center p20-5 py-1">
     {from.toISOString()} - {to.toISOString()}

     <DateRange
          startDatePlaceholder="Start Date"
          endDatePlaceholder="End Date"
          rangeColors={[theme.palette.primary.main]}
          ranges={ranges}
          onSelect={handleSelect}
          onChange={ranges =>{ setRanges([ranges.rollup]);} }
          staticRanges={staticRanges}
          inputRanges={[]}

         dateDisplayFormat={"yyyy.MM.dd"}
          // minDate={subMonths(now.current, 6)}
         
           showDateDisplay={false}
      />
           </div>
    <div className="min-w-screen  bg-yellow-200  flex items-center justify-center px-5 py-5">
 
     <StockChart info={data.ob} />
     
   </div> </div> );
 }




//------------------------


//function App() {

 // Empty array in useState!


 
/*
 useEffect(() => {
   fetch(variables.API_URL+'getAllAggBetweenDates', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           "date1": startDate.toISOString(),
           "date2": endDate.toISOString()
         })
         
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
*/
/*
 useEffect(() => {
   fetch(variables.API_URL+'getAllAGG')
     .then((res) => res.json())
     .then((data) => {

       const p = {ob:{
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
       setData(p);
     })
     .catch((err) => {
       console.log(err);
     });
 }, []);

  var dateobj = new Date('13/12/1993');
  var dateobj2 = new Date('13/12/2007');
  const [data, setData] = useState(ob);
 const [startDate, setStartDate] = useState(dateobj );
 const [endDate, setEndDate] = useState(dateobj2);
 var onChange = (dates) => {
   var [start, end] = dates;
   
   setStartDate(start);
   setEndDate(end);
console.log(startDate.toISOString());
console.log(endDate.toISOString());
 */

  //<StockChart info={data} />


 
 




