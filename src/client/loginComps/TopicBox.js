import React from 'react'
import { Box, Typography, colors } from '@mui/material'
const TopicBox = () => {
  return (
<Box display="flex" flexDirection="column" alignItems="center">
          {/* LOGO */}
          <Box
            sx={{
              mt: "60px",
              width: "175px",
              height: "50px",
              bgcolor: "primary.main",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${colors.green[500]}`,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white">
              MessageFriends
            </Typography>
          </Box>
          

          <Typography color="white" fontWeight="bold" sx={{ textAlign: 'center', marginTop: 4,  marginBottom: 0}} mt={7} mb={1}>
          Simplifies connecting between friend.

          </Typography>
        </Box>
  )
}
export default TopicBox