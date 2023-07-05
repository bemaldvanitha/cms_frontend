import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import SingleUser from "./pages/SingleUser";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/dashboard'} element={<Dashboard/>}/>
          <Route path={'/create'} element={<CreateUser/>}/>
          <Route path={'/update/:id'} element={<UpdateUser/>}/>
          <Route path={'/user/:id'} element={<SingleUser/>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
