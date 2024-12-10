import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import MyGroups from './pages/MyGroups';
import { UserProvider } from './context/UserContext';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <UserProvider>
      <App />
  </UserProvider>,
  document.getElementById('root')
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mygroups" element = {<MyGroups/>}/>
      </Routes>
    </Router>
  );
};

export default App;
