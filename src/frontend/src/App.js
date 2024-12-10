import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import MyGroups from './pages/MyGroups';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mygroups" element={<MyGroups />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
