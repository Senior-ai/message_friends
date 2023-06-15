import React from 'react'
import { ListItemButton, ListItem, Divider, ListItemText,
     ListItemAvatar, Avatar, Typography } from '@mui/material';
import {Link, useNavigate } from 'react-router-dom';
    
const ChatDisplay = (props) => {
  const navigate = useNavigate();
    const chat = props.chat;
    const messages = chat.messages;
    var displayMsg = '';

    if (messages[messages.length - 1].body.length > 48)
        displayMsg = messages[messages.length - 1].body.slice(0,48) + '...';
    else
        displayMsg = messages[messages.length - 1].body

const handleNavigate = () => {
  //TODO - Navigate to chats/:id (use chat.id)
}
  return (
    <React.Fragment>
        <ListItemButton onClick={handleNavigate()}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={chat.senderId.username} //TODO - Verify that it displays the correct data. 
        secondary={
          <React.Fragment>
            {/* <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Ali Connors
            </Typography> */}
            {displayMsg}
          </React.Fragment>
        }
      />
    </ListItem>
      </ListItemButton>
    <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}
export default ChatDisplay;