import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBox from "./CheckBox";

export default function BasicAccordion(props) {
  const[activeFilters,setActiveFilters]=useState({})
  const sendDataToProperty = (filterName, value) => {
    const updatedFilters = { ...activeFilters, [filterName]: value };
    setActiveFilters(updatedFilters);
    props.onFiltersChange(updatedFilters);
  };

  return (
    <div>
      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.head1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.Slider ? <props.Slider onChange={(value)=>sendDataToProperty('rentalValue',value)} /> : ""}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{props.head2}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="1"
            val2="2"
            val3="11"
            val4="4"
            val5="5"
            onClick={(value)=>sendDataToProperty('ageOfConstruction',value)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{props.head3}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="unfurnished"
            val2="furnished"
            val3="semi-furnished"
            onClick={(value)=>sendDataToProperty('furnishing',value)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{props.head4}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="Bachelor"
            val2="Family"
            val3="Single Women"
            onClick={(value)=>sendDataToProperty('availableFor',value)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{props.head5}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            val1="1"
            val2="2"
            val3="3"
            onClick={(value)=>sendDataToProperty('noOfBedrooms',value)}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}