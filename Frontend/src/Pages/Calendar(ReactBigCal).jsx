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
//   const events = [
//   {
//     title: "Bandra | Time : 3:00",
//     allDay: true,
//     start: new Date(2023, 10, 23),
//     end: new Date(2023, 10, 23),
//   },
//   {
//     title: "Vacation",
//     start: new Date(2023, 11, 24),
//     end: new Date(2023, 11, 24),
//   },
//   {
//     title: "Conference",
//     start: new Date(2021, 6, 20),
//     end: new Date(2021, 6, 23),
//   },

//   {
//     title: `Bandra | Time : 04:00`,
//     start: "Wed Sep 27 2023",
//     end: "Thu Sep 28 2023",
//     // time: "4 : 00 AM"
//   },
//   {
//     title: `Andheri | Time : 14:00`,
//     start: "Wed Oct 27 2023",
//     end: "Thu Oct 28 2023",
//     // time: "4 : 00 AM"
//   },
  
// ];
  const [displayEvent, setDisplayEvent] = useState([
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
  }])
  const[events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(displayEvent);

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
  // console.log(`EventDetails `, typeof Details);


  useEffect(() => {
    const getDates = async () => {
      try {
        const response = await axios.get('/api/calendar');
        console.log(response.data)
        setEvents(response.data[0]); // Assuming that the data returned is an array
        const final =  displayEvent.map(val => {
          var i = 0;
          val.title = response.data[i].event
          var c = response.data[i].endDate.split("/")
          c[0] =  `20${c[0]}`
          console.log("The values",`${c[0]} ${c[1]} ${c[2]}`)

          var FinalDate = new Date(c[0],c[1],c[2])
          val.start = FinalDate
          val.end = FinalDate
          i++
          console.log("The value of i ",i)
        })
        setDisplayEvent(final)
        console.log(...displayEvent)
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
          {/* {

            <Calendar
            localizer={localizer}
            events={events.event}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            />
          } */}
   <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export { BigCalendar, getDet };
