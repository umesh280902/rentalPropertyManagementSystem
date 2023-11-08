import React, { Component } from 'react';
import { render } from 'react-dom';
 
import { Pannellum, PannellumVideo } from "pannellum-react";
// import myVideo from "./images/video.mp4";
 
 
const PannellumReact = (props) => (
  
  <div>
    <h1>
      {/* {console.log(`Props recieved ${props.Image}`)} */}
    </h1>
    <div style={{}}>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;

            </div>
    <Pannellum
        width="100%"
        height="500px"
        image={props.Image}
        pitch={10}
        yaw={110}
        hfov={90}
        autoLoad
        onLoad={() => {
            console.log("panorama loaded");
        }}
    >
      <Pannellum.Hotspot
        type="equirectangular "
        pitch={11}
        yaw={-167}
        text="Info Hotspot Text 3"
        URL="https://github.com/farminf/pannellum-react"
      />
 
      <Pannellum.Hotspot
        type="equirectangular "
        pitch={31}
        yaw={-107}
        text="Info Hotspot Text 4"
        URL="https://github.com/farminf/pannellum-react"
      />
    </Pannellum>
  

    {/******  for video 360 component *******/}
 
    {/* <PannellumVideo
      video={myVideo}
      loop
      width="100%"
      height="600px"
      pitch={10}
      yaw={180}
      hfov={140}
      minHfov={50}
      maxHfov={180}
    >
      <Pannellum.Hotspot
        type="custom"
        pitch={31}
        yaw={150}
        handleClick={(evt , name) => this.hanldeClick(name)}
        name="hs1"
      />
 
      <Pannellum.Hotspot
        type="info"
        pitch={31}
        yaw={-57}
        text="Info"
        URL="https://github.com/farminf"
      />
    </PannellumVideo>
  */}
    </div>
);
 
export default PannellumReact;