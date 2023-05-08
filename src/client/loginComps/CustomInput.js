import { VisibilityOff, Visibility} from "@mui/icons-material";
import {Box, IconButton, InputAdornment,
  InputBase, Paper, Typography,}
  from "@mui/material";
import { colors } from "../layouts/theme";
import React from 'react'

const CustomInput = (props) => { 
    const label = props.label;
    const placeholder = props.placeholder;
    const [isIconActive, setIconActive] = React.useState(props.isIconActive);
    const [password, setPassword] = React.useState('');
    return (
      <Box display="flex" flexDirection="column"
        alignContent="center" justifyContent="flex-start" mb={2}>
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Typography color="white" pb={1}>
            {label}
          </Typography>
          
          <Paper sx={{background: colors.input[500],width: "100%"}}>
            <InputBase
              placeholder={placeholder}
              fullWidth
              sx={{bgcolor: colors.input[500],p: 1,borderRadius: "5px",}}
              type={isIconActive ? "text" : props.context === 'name'? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                props.isIconActive?
                  (<InputAdornment position="end" sx={{ pr: 1 }}>
                    <IconButton edge="end" onClick={() => {
                      setIconActive(!isIconActive);
                    }}>
                      {isIconActive? <Visibility/> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>) : ('')
                }
            />
          </Paper>
        </Box>
      </Box>
    );
}
export default CustomInput