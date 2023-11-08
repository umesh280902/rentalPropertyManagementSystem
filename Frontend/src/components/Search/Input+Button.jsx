import React, { useState } from "react";
import Input from "./Input";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    black: {
      main: "#EC0B43",
      light: "#040F0F",
      dark: "#040F0F",
      contrastText: "#040F0F",
    },
  },
});

const Inputbox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/list", { state: search  });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
        <Input setSearch={setSearch} />
        <Button
          onClick={handleSearch}
          sx={{
            fontSize: "1rem",
            font: "Inter",
            boxShadow: "0px 0px",
            fontWeight: "500",
            color: "white",
          }}
          variant="contained"
          color="black"
        >
          {" "}
          Search
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Inputbox;
