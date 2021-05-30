import { useState } from "react";
import "./App.css";
import {
  currentMonthDay,
  days,
  monthDays,
  monthDayStart,
  monthYear
} from "./utils";

export default function App() {
  const defaultDisplayedCalender = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  const [displayedCalenderInfo, setDisplayedCalenderInfo] = useState(
    defaultDisplayedCalender
  );
  const [selectedDateIndex, setSelectedDateIndex] = useState([]);

  const handleArrowClick = (action) => {
    if (action === "next" && displayedCalenderInfo.month !== 11) {
      setSelectedDateIndex([]);
      setDisplayedCalenderInfo({
        ...displayedCalenderInfo,
        month: displayedCalenderInfo.month + 1
      });
    } else if (action === "previous" && displayedCalenderInfo.month !== 0) {
      setSelectedDateIndex([]);
      setDisplayedCalenderInfo({
        ...displayedCalenderInfo,
        month: displayedCalenderInfo.month - 1
      });
    }
  };

  const handleSelectedDates = (index) => {
    if (selectedDateIndex.includes(index))
      setSelectedDateIndex(
        selectedDateIndex.filter((dateIndex) => dateIndex !== index)
      );
    else setSelectedDateIndex(selectedDateIndex.concat(index));
  };

  const displayDates = (monthDayStart) => {
    const emptyDays = Array(monthDayStart(displayedCalenderInfo)).fill("");
    const renderedDates = emptyDays.concat(
      Array.from(
        { length: monthDays(displayedCalenderInfo) },
        (_, index) => index + 1
      )
    );

    return renderedDates.map((item, index) => (
      <span
        key={`calender-day-number${index}`}
        className={`num-item ${
          selectedDateIndex.includes(index) ? "selected" : ""
        } ${currentMonthDay(displayedCalenderInfo, item) ? "current-day" : ""}`}
        onClick={(_) => handleSelectedDates(index)}
      >
        {item}
      </span>
    ));
  };

  return (
    <div className="App">
      <span className="title">Calender</span>
      <div className="calender">
        <div className="month-name">
          <img
            className={`${
              displayedCalenderInfo.month === 0 ? "unclickable" : ""
            }`}
            onClick={(e) => handleArrowClick("previous")}
            src="/vectors/arrow-left-line.svg"
            alt="arrow-left"
          />
          <span className="month-text">{monthYear(displayedCalenderInfo)}</span>
          <img
            className={`${
              displayedCalenderInfo.month === 11 ? "unclickable" : ""
            } right-arrow`}
            onClick={(e) => handleArrowClick("next")}
            src="/vectors/arrow-left-line.svg"
            alt="arrow-left"
          />
        </div>
        <div className="days">
          {days.map((day) => (
            <span key={`calender-day_${day}`} className="day">
              {day}
            </span>
          ))}
        </div>
        <div className="num-of-days">{displayDates(monthDayStart)}</div>
      </div>
    </div>
  );
}
