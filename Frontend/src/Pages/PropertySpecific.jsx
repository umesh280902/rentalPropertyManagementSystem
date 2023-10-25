import Modal from "../MUI_components/Modal";
import { Calen } from "../components/Calendar/Calendar";
import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import { getDet } from "./Calendar(ReactBigCal)";
// import { TransferTime } from "../MUI_components/TimePicker";
//import { useEffect, useState } from "react";
import axios from 'axios'
import {useState,useEffect} from 'react'
import {
  BasicTimePicker as TimePicker,
  TransferTime,
} from "../MUI_components/TimePicker";
import { Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Panel from "../components/360_view/Panel"
//--

function PropertyDetails() {
  const [propertyDetail,setPropertyDetail]=useState({})
  const [InputTime, setInputTime] = useState(null);
  const [InputDate, setInputDate] = useState(null);
  const [Submit, setSubmit] = useState(false);
  const [EventDetails, setEventDetails] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    const property=async ()=>{  
      try {
        const id=window.location.href.split('/')
        console.log(id)
        const response=await axios.get(`/api/property/${id[4]}`)
        setPropertyDetail(response.data)
        console.log(response.data)
        setIsLoading(false)
        } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    property()
  },[])
  useEffect(() => {}, []);

  const result = EventDetails.find((val) => {
    return val.Date === InputDate && val.Time === InputTime;
  });
  if (Submit === true && !result) {
    //value constant ko pehle put kar, then jaake put the value, bc if you do it(meaning direct daala into setEventDetails) it will not cause error in setEventDetails
    const value = {
      Date: InputDate,
      Time: InputTime,
    };
    setEventDetails([...EventDetails, value]);

    // console.log(
    //   EventDetails[0].Date,
    //   typeof EventDetails[0].Date,
    //   EventDetails[0].Time,
    //   typeof EventDetails[0].Time
    // );
    getDet(EventDetails);

    setSubmit(false);
  }
  console.log(`Event Details`, ...EventDetails);
  const PropDet = [
    {
      propertyType: "sell",
      buildingName: "new vishal aprtment",
      facing: "east",
      contactNo: 7039836701,
      squareFeet: 900,
      securityDeposit: 8000,
      furnishing: "furnished",
      flooring: "marble",
      ageOfConstruction: "+10 years",
      waterAvailability: "24 hr",
      numberOfLifts: 0,
      electricityStatus: " 24 hr",
      street: "cabin road",
      area: "rawal nagar",
      city: "bhayander",
      state: "maharastra",
      postalCode: 401105,
      country: "india",
      likes: 0,
      comments: 0,
    },
  ];

  if(isLoading){
    return <div>Loading</div>
  }

  return (
    <div>
      {InputTime == null ? <div></div> : <div>{InputTime}</div>}
      Hello
      {InputDate == null ? <div></div> : <div>{InputDate}</div>}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "0.25rem" }}>
          <span>Rs</span>
          <div style={{ fontWeight: "900", fontSize: "1.5rem" }}>{propertyDetail.rentalValue}</div>
          <div>Per month</div>
        </div>
        <div>
          <div style={{ fontWeight: "500", fontSize: "1.5rem" }}>{propertyDetail.noOfBedroom} BHK</div>
          <br />
          Flat/Apartment for Rent
          <br />
          in{"   "}
          {propertyDetail.buildingName} {"   "}
          {propertyDetail.address.street} {"   "}
          {propertyDetail.address.area} {"   "}
          {propertyDetail.address.city} {"   "}
          {propertyDetail.address.state}
        </div>
        <div className="List of Buttons">
          <div style={{ maxWidth: "100%", paddingLeft: "25rem" }}>
            <Modal
              setSubmit={setSubmit}
              TimePicker={TimePicker}
              setInputTime={setInputTime}
              setInputDate={setInputDate}
              ButtonName="Schedule Property Visit"
              Calendar={Calen}
            />
          </div>
          <div style={{paddingLeft : "26.35rem"}}>
            <Button variant="contained">Contact Owner</Button>
          </div>
        </div>
      </div>
      <br />
      <Divider />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "10rem",
        }}
      >
        <div>
          <Panel/>
           </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "3rem",
          }}
        >
          <div>
            
            <p>
              Security deposit <br />
              {propertyDetail.securityDeposit}
            </p>
            <p>
              Rent
              <br />
              50000
              {/* {PropDet[0].securityDeposit} */}
            </p>
            <p>
              Furnishing
              <br />
              {propertyDetail.furnishing}
            </p>
          </div>
          <div>
            
            <p>
              Square Feet <br />
              {propertyDetail.squareFeet}
            </p>
            <p>
              Available for
              <br />
              {propertyDetail.availableFor}
              {/* {PropDet[0].securityDeposit} */}
            </p>
            <p>
              Available from
              <br />
              {propertyDetail.availableFrom}
              {/* {PropDet[0].securityDeposit} */}
            </p>
          </div>
        </div>
      </div>
      <br />
      <Divider />
      <br />
      <div style={{display : "flex", flexDirection : "column",}}>
        <div style={{ fontWeight: "900", fontSize: "1.5rem" }}>
          About Property
        </div>
        <div
          style={{ display: "flex", flexDirection: "flex-start", gap: "3rem" }}
        >
          <div>
            <p>
              Flooring: {"   "}
              {propertyDetail.flooring}
            </p>
            <p>
              Electricity Status: {"   "}
              {propertyDetail.electricityStatus}
            </p>
          </div>
          <div>
            <p>
              Age of Construction: {"   "}
              {propertyDetail.ageOfConstruction}
            </p>
            <p>
              Water Availability: {"   "}
              {propertyDetail.waterAvailability}
            </p>
            <p>
              No of Lifts: {"   "}
              {propertyDetail.numberOfLifts}
            </p>
          </div>
        </div>
      </div>
      <br />
      <Divider />
      <br />
      <div>
        
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d666.6998670572094!2d72.82017289697582!3d19.045098152412667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9458a4665a7%3A0x1d88e9dbe132fbb8!2sSeema%20Apartments%2C%20Bullock%20Rd%2C%20Mount%20Mary%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra%20400050!5e0!3m2!1sen!2sin!4v1698038214965!5m2!1sen!2sin"
        width="90%"
        height="450"
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
      <br/>
      <Button>
          <a href="https://www.mappls.com/place-Bandra+Station-Bandra+Terminus-Naupada-Bandra+East-Mumbai-Maharashtra-400051-798d7z?@lrfetlat,odqttjoe,liveoqflaqojvqltj,l,f,f,f,l,f,f,zdata=MTkuMDYzNTc1KzcyLjg0MDQ3KzE3Kzc5OGQ3eisrMjA5ODIed">get Street view</a>
          
        </Button>
      </div>
    </div>
  );
}

//--
const PropertySpecific = () => {
  return (
    <div>
      <NavBar />
      <PropertyDetails />
      <Footer />
    </div>
  );
};
export default PropertySpecific;
