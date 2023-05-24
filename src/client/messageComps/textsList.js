import * as React from 'react';
import List from '@mui/material/List';
import { gql } from 'apollo-boost';
import { useQuery, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import ChatDisplay from './ChatDisplay';

const TextsList = () => {
  const endpoint = 'http://localhost:5000/graphql_chat';
  // const id = sessionStorage.getItem('id');
  //todo - ALSO FETCH GROUPS FROM graphql, move this chat endpoint to chatFEL
  const [id, setId] = React.useState('6458c6460a273d30aae9592b');
  const [chats, setChats] = React.useState([]);
 const GET_CHATS = gql`
  query getChatsByUserID($id: String!) {
    getChatsByUserID(id: $id) {
      id
      senderId
      receiverId
        messages {
        id
        time
        body
        senderId
      }
    }
  }`;
  const createApolloClient = (uri) => {
    const httpLink = createHttpLink({
      uri,
    });

    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  };

  const client = createApolloClient(endpoint);

 

  React.useEffect(() => {handleOnload();}, []);

  const handleOnload = async () => {
    try {
     const { refetch } = useQuery(GET_CHATS, {
    variables: { id }, client });
      const { data } = await refetch();
      console.log(data);
      if (data.getChatsByUserID) {
        setChats(data.getChatsByUserID);
      }
    } catch (error) {
      console.error(error);
    }    
  }
  return (
    <List sx={{ padding: '10px', marginTop: '70px',
    marginLeft:'70px', width: '100%', maxWidth:1200 ,bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <ChatDisplay key={chat.id} chat={chat}/>
      ))}
  </List>
  )
}
export default TextsList