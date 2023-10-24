import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import NavBar from "./components/Header/Navbar";
import Tabs from "./components/Search/Tab";
import Footer from "./components/Footer/Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropertyList from "./Pages/PropertyList";
import PropertySpecific from "./Pages/PropertySpecific";
import {BigCalendar} from "./Pages/Calendar(ReactBigCal)"
import Login from './Pages/login'
import Signup from './Pages/signup'
import OTPVerification from './Pages/OtpVerfication'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate as Navigate,
} from "react-router-dom";

const theme = createTheme({
  palette: {
    black: {
      //main color
      main: "#EC0B43",
      light: "#040F0F",
      //hover karne par
      dark: "#040F0F",
      contrastText: "#040F0F",
    },
  },
});
function Main() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>
          Welcome back! Let's continue with your search!
        </h1>
        <br />
        <Tabs />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <h1>Are you a property Owner?</h1>
          <Button
            variant="contained"
            size="large"
            style={{ width: "15%", color: "white" }}
            color="black"
          >
            Post your property
          </Button>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
function App() {
  return (
    <Router>
      {/* <YourComponent/> */}
      <Routes>
        <Route exact path="/" Component={Main} />
        <Route exact path="/List" element={<PropertyList />} />
        <Route exact path="/specific/:id" element={<PropertySpecific/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/otp" element={<OTPVerification/>}/>
        {/* <Route exact path="/blogSpecific" element={<BlogSpecific />} /> */}
        <Route exact path="/calendar" element={<BigCalendar/>}/>
        <Route exact path="/map" Component={() => {
          window.location.href = "https://www.mappls.com";
          return null;
        }} />
      </Routes>
    </Router>
  );
}

export default App;