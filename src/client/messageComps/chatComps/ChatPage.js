import React from 'react'
import { useState } from 'react';
const ChatPage = () => {
    const [chatMsgs, setChatMsgs] = useState([]); //TODO - change it to the messagse array fetched from the db
    const listChatMessages = chatMsgs.map((chatMsgDto, index)=> {
        <ListItem>
            
        </ListItem>
    });
    return (
    <div>
        
    </div>
  )
}
export default ChatPage;