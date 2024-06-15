import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ErrorPage from "./Components/Error/ErrorPage";
import Protectedroute from "./Components/protectedRoutes/Protectedroute";
import Info from "./Components/Info";
import Profile from "./Components/Profile";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./Components/ForgetPassword";
import Userprofile from "./Components/Userprofile";
import Teams from "./Components/Team/Teams";
import Aos from "aos";
import "aos/dist/aos.css";
import Notification from "./Components/notification/Notification";
import Chat from "./Components/Team/chat";
import Myteams from "./Components/Team/Myteams";

Aos.init({
 once:true
})

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protectedroute />}>
          <Route path="/info" element={<Info />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:UserId" element={<Userprofile/>} />
          <Route path="/teams" element={<Myteams/>}/>
          <Route path="/exploreTeams" element={<Teams/>}/>
          <Route path="/teams/:projectId" element={<Chat/>} />
          <Route path="/notifications" element={<Notification/>}/>
        </Route>
        
        <Route path="/forget-password" element={<ForgetPassword />} />
             
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
