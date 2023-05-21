import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import LoginPage from "../loginComps/LoginPage";
import { useLocation } from "react-router-dom";
import QuestionPage from "../loginComps/QuestionPage";
import AllChatsPage from "../messageComps/AllChatsPage";

const bgImage = require("../assets/bg.png");

const MainLayout = (props) => {
    const location = useLocation();
    const locationContext = location.pathname || '';
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden", 
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {locationContext === '/createAccount'? (<QuestionPage props={props}/>) : 
        (locationContext==='/AllChats'? (<AllChatsPage props={props}/>) : (<LoginPage props={props}/>))}
        
      </Box>
    </ThemeProvider>
  )
}
export default MainLayout;