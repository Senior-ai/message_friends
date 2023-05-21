import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { gql } from 'apollo-boost';
import { useQuery, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ListItemButton } from '@mui/material';

const TextsList = () => {
  const endpoint = 'http://localhost:5000/graphql_chat';
  const id = sessionStorage.getItem('id');
  //todo - ALSO FETCH GROUPS FROM graphql, move this chat endpoint to chatFEL
  // const [id, setId] = React.useState('6458c6460a273d30aae9592b');
  const [data, setData] = React.useState(null);
 const GET_CHATS = gql`
  query getChatsByUserID($id: String!) {
    getChatsByUserID(id: $id) {
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

  // const client = createApolloClient(endpoint);

  // const { loading, error, refetch } = useQuery(GET_CHATS, {
  //   variables: { id },
  //   client, // Use the Apollo client instance with the specified endpoint URI
  //   onCompleted: (data) => {
  //     setData(data);
  //   },
  // });
  // React.useEffect(() => {handleOnload();}, []);

  // const handleOnload = async () => {
  //   try {
  //     const { data } = await refetch();
  //     console.log(data);
  //     if (data.getChatsByUserID) {
  //       //console.log(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }    
  // }
  return (
    <List sx={{ padding: '10px', marginTop: '70px',
    marginLeft:'70px', width: '100%', maxWidth:1200 ,bgcolor: 'background.paper' }}>

    <ListItemButton>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Brunch this weekend?"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
      </ListItemButton>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Summer BBQ"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              to Scott, Alex, Jennifer
            </Typography>
            {" — Wish I could come, but I'm out of town this…"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Oui Oui"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Sandra Adams
            </Typography>
            {' — Do you have Paris recommendations? Have you ever…'}
          </React.Fragment>
        }
      />
    </ListItem>
  </List>
  )
}
export default TextsList