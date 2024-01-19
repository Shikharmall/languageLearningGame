import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import UserDetails from "./pages/UserDetails";
import PublicUserDetails from "./pages/PublicUserDetails";
import LanguageGame from "./pages/LanguageGame";
import NotFound from "./components/NotFound";
import Admin from "./pages/Admin";
import Modalpopup from "./components/GameWindow";
import AllQuestions from "./pages/AllQuestions";
import EditQuestion from "./pages/EditQuestion";

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
      <Route exact path="/admin/allquestions" element={<AllQuestions />} />
      <Route exact path="/admin/editquestion/:question_id" element={<EditQuestion />} />
      <Route exact path="/admin/addquestions" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
