import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CheckBox from "./CheckBox";
import { Check } from "@mui/icons-material";

export default function BasicAccordion(prop) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{prop.head1} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography> */}
          {prop.Slider ? <prop.Slider /> : ""}
          {/* <CheckBox
            val1="Single Piece"
            val2="Set of 2"
            val3="Set of 5"
            val4="Set of 10"
          /> */}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{prop.head2}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography> */}
          <CheckBox
            val1="0-1 years old "
            val2="2-3 years old"
            val3="4-5 years old"
            val4="more than 5 years old"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{prop.head3}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography> */}
          <CheckBox
            val1="unfurnished"
            val2="furnished"
            val3="sem-furnished"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{prop.head4}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          <CheckBox
            val1="Bachelor"
            val2="Family"
            val3="Single Women"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{prop.head5}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
           <CheckBox
            val1="1 BHK"
            val2="2 BHK"
            val3="3 BHK"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
