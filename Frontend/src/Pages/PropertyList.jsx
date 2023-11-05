import NavBar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Card from "../MUI_components/Card";
import Divider from "@mui/material/Divider";
import Accordion from "../MUI_components/Accordion";
import PropertyImg from "../Images/Property_image.jpg";
import Panorama from "../Images/Overview.jpg";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "@mui/material";
import StreetviewIcon from '@mui/icons-material/Streetview';
import Panel from "../components/360_view/Panel"
import axios from 'axios'
import {useState,useEffect} from 'react'
import Loading from "../MUI_components/Loading"
// import AOS from 'aos';
// import T from "../MUI_components/Trash"
const PropertyList = () => {
  const [details,setDetails]=useState({})

  // AOS.init();
  useEffect(()=>{
    const propertyDetails=async ()=>{
      const response=await axios.get('/api/property')
      console.log(response.data)
      setDetails(response.data[0])
    }
    propertyDetails()
  },[])
  return (
    <div>
      <NavBar />
      <br />
      {/* <T/> */}
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "3rem",
          paddingLeft: "19rem",
        }}
      >
        <div style={{ width: "30%" }}>
          <Accordion
            head1="Budget"
            head2="Type of Property"
            head3="Available for"
            head4="Age of Property"
            head5="Furnishing"
          />
        </div>
        <div style={{}}>
          {/* <br /> */}
          {/* <br/> */}
          <div style={{display : "flex", justifyContent : "space-between", paddingRight : "15.5rem"}}>
            <div style={{ paddingLeft: "0rem", fontWeight : "700", fontSize : "2rem" }}>&nbsp; {details.length} results</div>
            {/* <Link to="/map">
            </Link> */}
            <a href="http://www.mappls.com">
              <StreetviewIcon />
            </a>
            <a href="http://www.mappls.com">
              <MapIcon />
            </a>
            
          </div>
          <br />
          <Divider>{/* <LocalFloristOutlinedIcon /> */}</Divider>
          <br />
          <div
            className="DisplayProd"
            style={{
              width: "78%",
              // borderStyle: "dashed", borderColor: "black",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {/* <Panel/> */}
            {/* <div style={{ borderStyle: "dashed", borderColor: "black" }}>
              <img style={{ width: "75%", padding: "2.25rem" }} src={prod[0].photo} alt="Logo" />
              <div className="ProdText" style={{ display: "flex", flexDirection: "column", rowGap: "0.25rem", }}>
                <div className="prodPrice">
                  &nbsp;    &nbsp;    {prod[0].Dprice}  &nbsp;   <span className="discount"> {prod[0].OGprice}</span>
                </div>
                <div>
                  <Rating value={prod[0].Rating} />
                </div>
                <div className="prodDesc">
                  &nbsp;    &nbsp;   {prod[0].name}
                </div>
                <div className="prodDesc">
                  &nbsp;    &nbsp;    {prod[0].color}
                </div>
              </div>
            </div> */}
            {details.length>0?details.map((val) => (
              <Card rentalValue={val.rentalValue} address={val.address} noOfBedroom={val.noOfBedroom} squareFeet={val.squareFeet} 
               description={val.description} image={val.images} _id={val._id}/>)):<div><Loading/></div>}
            

          </div>
          
          <br />
        </div>
      </div>
      {/* <Panel/> */}
<br/>
      <Footer />
    </div>
  );
};
export default PropertyList;
