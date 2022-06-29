import React, {useState} from 'react';
import './Components/Utilities/button.css'
import './App.css';
import SearchForm from "./Components/searchForm/Form"
import ManageForm from './Components/manageForm/manageForm'
import Dashboard from './Components/Dashboard/Dashboard'
function App() {
  const [activity, setActivity] = useState('search')


  const setActive = (str) => {
    setActivity(str)
  }

  return (
    <div >
          <div className ='nav-container'>
          <button className="submit-btn" onClick={()=>setActive('search')}> Home</button>
          <button className="submit-btn" onClick={()=>setActive('manage')}> Admin </button>
          <button className="submit-btn" onClick={()=>setActive('dashboard')}> Dashboard </button>
          </div>
          {activity === 'search' &&
          <SearchForm reset={setActive}></SearchForm>}
          {activity === 'manage' &&
          <ManageForm></ManageForm>}
          {activity === 'dashboard' &&
          <Dashboard ></Dashboard>}

    </div>
  );
}

export default App;
