import React from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from "./pages/Auth"
import axios from "axios";
import { setUserData } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import InterviewPage from "./pages/InterviewPage";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewReport from "./pages/InterviewReport";
export const serverUrl = "https://interviewer-iq.onrender.com";
function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        
        dispatch(setUserData(result.data));
      } catch (error) {
        
        dispatch(setUserData(null));
      }
    };
    getUser();
  }, [dispatch]);

  return (
      <Routes> 
        <Route path ='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/interview' element={<InterviewPage />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/report" element={<InterviewReport />} />

      </Routes>
  );
}

export default App;
