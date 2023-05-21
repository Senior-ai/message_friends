import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient';

const initialUri = 'http://localhost:5000/graphql_user/';

function RootComponent() {
  
  const client = createApolloClient(initialUri);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<RootComponent />);
