import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
var Details;

function getDet(eventDetails) {
  Details = eventDetails;
}

const locales = {
  "en-US": import("date-fns/locale/en-US"), // Changed 'import' to 'require'
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function BigCalendar({ EventDetails }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getDates = async () => {
      try {
        const response = await axios.get('/api/calendar');
        console.log(response.data[0])
        setEvents(response.data[0]); // Assuming that the data returned is an array
      } catch (error) {
        console.log(error);
      }
    };
    getDates();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div>
        <br />
        <br />
        <div style={{ paddingLeft: "3rem" }}>
          <h1>Calendar</h1>
          {

            <Calendar
            localizer={localizer}
            events={events.event}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            />
          }
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export { BigCalendar, getDet };
