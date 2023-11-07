import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";
var Details;
function getDet(eventDetails) {
  // console.log(...eventDetails)
  console.log(`EventDetails `, typeof eventDetails);
  Details = eventDetails;
}
const locales = {
  "en-US": import("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Bandra | Time : 3:00",
    allDay: true,
    start: new Date(2023, 10, 23),
    end: new Date(2023, 10, 23),
  },
  {
    title: "Vacation",
    start: new Date(2023, 11, 24),
    end: new Date(2023, 11, 24),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },

  {
    title: `Bandra | Time : 04:00`,
    start: "Wed Sep 27 2023",
    end: "Thu Sep 28 2023",
    // time: "4 : 00 AM"
  },
  {
    title: `Andheri | Time : 14:00`,
    start: "Wed Oct 27 2023",
    end: "Thu Oct 28 2023",
    // time: "4 : 00 AM"
  },
];

function BigCalendar({ EventDetails }) {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }
  // console.log(...EventDetails)
  console.log(`EventDetails `, typeof Details);

  return (
    <div className="App">
      <NavBar />
      <div>
        <br/>
        <br/>
        <div style={{paddingLeft: "3rem"}}>
          <h1>Calendar</h1>
          <h2>Add New Event</h2>
          <div>
            <input
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <DatePicker
              placeholderText="End Date"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
      <br/>

      <Footer />
    </div>
  );
}

export { BigCalendar, getDet };
