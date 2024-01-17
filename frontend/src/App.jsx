import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import UserDetails from "./pages/UserDetails";
import PublicUserDetails from "./pages/PublicUserDetails";
import LanguageGame from "./pages/LanguageGame";
import NotFound from "./components/NotFound";
import Admin from "./pages/Admin";
import Modalpopup from "./components/Modalpopup";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/leaderboard" element={<Leaderboard />} />
      <Route exact path="/userdetails" element={<UserDetails />} />
      <Route
        exact
        path="/publicUserdetails/:user_id"
        element={<PublicUserDetails />}
      />
      <Route exact path="/game" element={<Modalpopup />} />
      <Route exact path="/languagegame" element={<LanguageGame />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
