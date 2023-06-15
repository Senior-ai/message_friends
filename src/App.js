import MainLayout from "./client/layouts/MainLayout";
import ContactPage from './client/messageComps/contactComps/ContactPage'
import ChatPage from './client/messageComps/chatComps/ChatPage'
import { Routes, Route } from "react-router-dom";

function App(props) {
  // changeClientUri={props.changeClientUri('http://localhost:5000/graphql_chat/')}
  return (
    <div props={props}>
      <Routes>
        <Route path='/' element={<MainLayout/>}/>
        <Route path={'/createAccount'} element={<MainLayout/>} />
        <Route path={'/AllChats'} element={<MainLayout/>} />
        <Route path={'/Contacts'} element={<ContactPage/>} />
        <Route path={'Chat/:id'} element={<ChatPage/>}/>
      </Routes>
    
  </div>
  );
}

export default App;
