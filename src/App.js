import MainLayout from "./client/layouts/MainLayout";

import { Routes, Route } from "react-router-dom";
function App(props) {
  return (
    <div props={props}>
      <Routes>
        <Route path='/' element={<MainLayout/>} />
        <Route path={'/createAccount'} element={<MainLayout/>}/>
        <Route path={'/AllChats'} element={<MainLayout/>}/>
      </Routes>
    
  </div>
  );
}

export default App;
