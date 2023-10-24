import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Panel from "../components/360_view/Panel";

// import Lizard from "../Baby.jpg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate as Navigate,
} from "react-router-dom";

export default function MultiActionAreaCard({
  _id,
  image,
  description,
  address,
  buildingName,
  rentalValue,
  squareFeet,
  noOfBedroom,
}) {
  return (
    <Card sx={{ width: "1000", height: "" }}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}
      >
        <CardMedia
          component="img"
          height="45"
          image={image}
          alt="green iguana"
          sx={{ width: "0%", marginRight: "0rem" }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <div style={{ position: "relative", right: "3rem" }}>
            <Panel />
          </div>
          {/* <Typography variant="body2" color="text.secondary">
            {address}
          </Typography> */}
          <div style={{ width: "60%" }}>
            <Typography gutterBottom variant="h5" component="div">
              {address}
            </Typography>
            {/* <Typography> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                gap: "5rem",
              }}
            >
              <div>
                <span style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  {rentalValue}{" "}
                </span>
                /month
              </div>

              <div>
                {" "}
                <span style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  {squareFeet}{" "}
                </span>
                sq.ft
              </div>

              <div>
                <span style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  {noOfBedroom}{" "}
                </span>
                BHK
              </div>
            </div>
            {/* </Typography> */}
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 400,
          }}
          to={`/specific/${_id}`}
        >

        <Button size="small" color="primary">
          Contact owner
        </Button>
        
        </Link>
        </CardActions>
    </Card>
  );
}
