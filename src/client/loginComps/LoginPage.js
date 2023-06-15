import { Box, Button, Checkbox, colors,
   Typography, TextField, IconButton} from "@mui/material";
import React from "react";
import {Link, useNavigate } from 'react-router-dom';
import TopicBox from "./TopicBox";
import { VisibilityOff, Visibility} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { colors as themeColors } from "../layouts/theme";
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/client';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isIconActive, setIconActive] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const VERIFY_USER = gql`
  query VerifyUser($username: String!, $password: String!) {
    verifyUser(username: $username, password: $password) {
      id
      username
      password
    }
  }`;

  const { loading, error, data, refetch} = useQuery(VERIFY_USER, {
    variables: { username, password }
  });
  const handleSubmit = async () => {
    try {
      const { data } = await refetch();
      if (data.verifyUser) {
        console.log(data.verifyUser[0]);
        sessionStorage.setItem('id', data.verifyUser[0].id)
       // navigate('/AllChats'); // navigate to dashboard route
      }
    } catch (error) {
      console.error(error);
    }    
  }
  return (
    <Box
      sx={{bgcolor: "rgba(0, 24, 57, 0.2)",
        display: "flex", flexDirection: "column",
        alignItems: "center", height: "100%",
      }}>
      <Box width="50%">
        <TopicBox/><br/>
        <p style={{color: 'white'}}>Username:</p>
        <TextField sx={{width: '100%', bgcolor:themeColors.input[650],
           '& label.Mui-focused': {
            color: 'lightgreen',
          },}}
        id="input-username-textfield"
        label="Enter your username..."
        onChange={e => setUsername(e.target.value)}
        variant="filled"
        /> <br/><br/>

      <p style={{color: 'white'}}>Password:</p>
      <TextField sx={{width: '100%', bgcolor:themeColors.input[650],
           '& label.Mui-focused': {
             color: 'lightgreen',
            },}}
            
            id="input-with-icon-textfield"
            label="Enter your password..."
            type={isIconActive ? "text" : "password"}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                  (<InputAdornment position="end" sx={{ pr: 1 }}>
                    <IconButton edge="end" onClick={() => {
                      setIconActive(!isIconActive);
                    }}>
                      {isIconActive? <Visibility/> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>)
        )}}
        variant="filled"
        />

        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          width="100%"
          color="white"
          >
          <Link to="/createAccount" style={{ color: colors.green[500], textDecoration: "none" }}>
            Don't have an account yet?
          </Link>
        </Box>

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}`,marginBottom: '160px' }}>
          Login
        </Button> <br/><br/>
      </Box>
    </Box>
  )
}

export default React.memo(LoginPage);