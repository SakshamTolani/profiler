import { Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from "./Pages/Homepage"
import NewProfilePage from "./Pages/NewProfilePage";
import EditProfilePage from "./Pages/EditProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/create-profile" element={<NewProfilePage/>}/>
        <Route path="/chats" element={<EditProfilePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
