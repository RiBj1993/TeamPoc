// @flow
import React, { useState, useRef, useCallback, useMemo } from "react";
import rangeRight from "lodash/rangeRight";
import map from "lodash/map";
import toString from "lodash/toString";
import subDays from "date-fns/subDays";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import addYears from "date-fns/addYears";

import DateRange from "react-date-range/dist/components/DateRange";
import Calendar from "react-date-range/dist/components/Calendar";
 import "react-date-range/dist/styles.css";
import "./datepicker.scss";

export const DatePicker = props => {
  const now = useRef(new Date());
  const [to, setTo] = useState(now.current);
  const [from, setFrom] = useState(subDays(now.current, 7));

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    setFrom(startDate);
    setTo(endDate);
  });

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection"
      }
    ];
  }, [from, to]);

  return (
    <div>
      {from.toISOString()} - {to.toISOString()}
      <DateRange
       // locale={koLocale}
        dateDisplayFormat={"yyyy.MM.dd"}
        // minDate={subMonths(now.current, 6)}
        moveRangeOnFirstSelection={true}
        maxDate={now.current}
        ranges={ranges}
        onChange={handleSelect}
        showDateDisplay={false}
        {...props}
      />
      <Calendar />
    </div>
  );
};
