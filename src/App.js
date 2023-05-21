import MainLayout from "./client/layouts/MainLayout";
import { Routes, Route } from "react-router-dom";

function App(props) {
  // changeClientUri={props.changeClientUri('http://localhost:5000/graphql_chat/')}
  return (
    <div props={props}>
      <Routes>
        <Route path='/' element={<MainLayout/>}/>
        <Route path={'/createAccount'} element={<MainLayout/>} />
        <Route path={'/AllChats'} element={<MainLayout/>} />
      </Routes>
    
  </div>
  );
}

export default App;
