import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/auth/Auth"
import Chat from "./pages/chat/chat"
import Profile from "./pages/profile/Profile"
import { useAppStore } from "./store"
import { useEffect, useState } from "react"
import { apiClient } from "./lib/api-client"
import { GET_USER_INFO } from "./utils/constants"


const PrivateRoute=({children})=>{                //middleware type
  const {userInfo}=useAppStore();
  const isAuthenticated = userInfo !== null && userInfo !== undefined;
  return isAuthenticated?children:<Navigate to="/auth"/>
}

const AuthRoute=({children})=>{                 //middleware type
  const {userInfo}=useAppStore();
  const isAuthenticated=userInfo!==null && userInfo!==undefined;
  return isAuthenticated?<Navigate to="/chat"/>:children;
} 

function App() {
 
  const {userInfo,setUserInfo}=useAppStore();

  const [loading,setLoading]=useState(true);

  useEffect(() => {
    
      const getUserData=async()=>{
        try{
        const response=await apiClient.get(GET_USER_INFO,{withCredentials:true});

        if(response.status===200 && response.data.id){
          setUserInfo(response.data)
        }
        else{
          setUserInfo(undefined)
        }
        console.log(response)
      } 
    catch (error) {
      setUserInfo(undefined)
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  }
    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }
  }, [userInfo,setUserInfo])

  if(loading){
    return <div>Loading...</div>
  }
   
  return (
    <>
      <Routes>
        <Route path="/auth" element={
          <AuthRoute>
            <Auth/>
          </AuthRoute>
          }>
          </Route>

        <Route path="/chat" element={
          <PrivateRoute>
            <Chat/>
          </PrivateRoute>
          }>
          </Route>

        <Route path="/profile" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
          }>
          </Route>

        <Route path="*" element={<Navigate to="/auth"/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
