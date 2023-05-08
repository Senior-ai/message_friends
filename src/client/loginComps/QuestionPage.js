import React from 'react'
import {Box, Button, colors} from "@mui/material";
import CustomInput from "./CustomInput";
import TopicBox from './TopicBox';
const QuestionPage = () => {
    let [clicked, setClicked] = React.useState(0);
    const handleSubmit = () => {
        setClicked(clicked++);
        console.log(clicked);
    }
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 24, 57, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        borderRadius: {
          xs: "30px",
          sm: "30px",
          md: "30px 0 0 30px",
          lg: "30px 0 0 30px",
          xl: "30px 0 0 30px",
        },
      }}
    >
      <Box width="50%">
        <TopicBox/>        
        <br></br>
        <CustomInput
          label="Phone number"
          placeholder="Enter your phone number..."
          isIconActive={false}
        />
        <CustomInput
          label="Username"
          placeholder="Enter your username..."
          isIconActive={false}
        />
        {clicked > 0? (<CustomInput
          label="MFA Code"
          placeholder="Enter your code..."
          isIconActive={true}
        />) : ('')}
        
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}
export default QuestionPage;