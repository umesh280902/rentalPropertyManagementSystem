import Modal from "../MUI_components/Modal";
import { Calen } from "../components/Calendar/Calendar";
import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import { getDet } from "./Calendar(ReactBigCal)";
import Loading from "../MUI_components/Loading";
// import { TransferTime } from "../MUI_components/TimePicker";
//import { useEffect, useState } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  BasicTimePicker as TimePicker,
  TransferTime,
} from "../MUI_components/TimePicker";
import { Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Panel from "../components/360_view/Panel";
//--

const PropertyDetails = () => {
  const [propertyDetail, setPropertyDetail] = useState({});
  const [InputTime, setInputTime] = useState(null);
  const [InputDate, setInputDate] = useState(null);
  const [Submit, setSubmit] = useState(false);
  const [EventDetails, setEventDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState();
  useEffect(() => {
    const property = async () => {
      try {
        const id = window.location.href.split("/");
        console.log(id);
        const response = await axios.get(`/api/property/${id[4]}`);
        setPropertyDetail(response.data);
        console.log(response.data);
        setImg(propertyDetail.images[0].fileName)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    property();
  }, []);
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

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {InputTime == null ? <div></div> : <div>{InputTime}</div>}

          {InputDate == null ? <div></div> : <div>{InputDate}</div>}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "3rem",
              alignContent: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "row", gap: "0.25rem" }}
            >
              <span>Rs</span>
              <div style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                {propertyDetail.rentalValue}
              </div>
              <div>Per month</div>
            </div>
            <div style={{ width: "22.6rem" }}>
              <div style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                {propertyDetail.noOfBedroom} BHK
              </div>
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
            <div className="List of Buttons" style={{display : "flex",flexDirection : "column", gap : "0.5rem"}}>
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
              <div style={{ paddingLeft: "26.35rem" }}>
                <Button   variant="contained">Contact Owner</Button>
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
              gap: "20rem",
            }}
          >
            <div style={{display: "flex", justifyContent : "flex-end", gap :"1rem"}}>
              <div style={{width : "100%"}}>
                <Panel />
              </div>
              <div>
                another image
                <img src={propertyDetail.images[0].fileName}
                alt="failed"
                />
                
              </div>
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
          <div style={{ display: "flex", flexDirection: "column", paddingLeft : "14.75rem" }}>
            <div style={{ fontWeight: "900", fontSize: "1.5rem" }}>
              About Property
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "flex-start",
                gap: "3rem",
              }}
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
          <div style={{paddingLeft : "14.5rem",display :"flex", justifyContent : "center", flexDirection : "column", gap : "1rem"}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d666.6998670572094!2d72.82017289697582!3d19.045098152412667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9458a4665a7%3A0x1d88e9dbe132fbb8!2sSeema%20Apartments%2C%20Bullock%20Rd%2C%20Mount%20Mary%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra%20400050!5e0!3m2!1sen!2sin!4v1698038214965!5m2!1sen!2sin"
              width="85%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
            <br />
            <div style={{width : "50%"}}>
            <Button>
              <a href="https://www.mappls.com/place-Bandra+Station-Bandra+Terminus-Naupada-Bandra+East-Mumbai-Maharashtra-400051-798d7z?@lrfetlat,odqttjoe,liveoqflaqojvqltj,l,f,f,f,l,f,f,zdata=MTkuMDYzNTc1KzcyLjg0MDQ3KzE3Kzc5OGQ3eisrMjA5ODIed">
                get Street view
              </a>
            </Button>
          
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

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
