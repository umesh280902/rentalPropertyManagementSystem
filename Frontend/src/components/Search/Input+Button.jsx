import Input from "./Input"
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
const theme = createTheme({
  palette: {
    black: {
      //main color
      main: '#EC0B43',
      light: '#040F0F',
      //hover karne par
      dark: '#040F0F',
      contrastText: '#040F0F',
    },
  },
});
const Inputbox = () => {
  const [search, setSearch] = React.useState("bandra");

    return (
      <ThemeProvider theme={theme}>
        {/* <div> */}
          {/* hola */}
          {console.log(search)}
        {/* </div> */}
        <div style={{display : "flex", justifyContent : "center", flexDirection : "row"}}>
            <Input setSearch={setSearch} />
            <Button
            sx={{
              fontSize: "1rem",
              font: "Inter",
              boxShadow: "0px 0px",
              fontWeight: "500",
              // backgroundColor: "#084822",
              color : "white"
            }}
            variant="contained"
            color="black"
          >
            {" "}
            Search
          </Button>
        </div>
        </ThemeProvider>
    )
}
export default Inputbox