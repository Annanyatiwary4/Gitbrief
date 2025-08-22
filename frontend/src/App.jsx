import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import HeroSectionGitBrief from "./components/hero";
import SlidingFooter from "./components/Footer";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Routes */}
        <Routes>
          <Route
          path="/"
          element={
            <> <HeroSectionGitBrief />
              <SlidingFooter /> {/* Only here */}
            </>
          }
        />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      
      </div>
    </Router>
  );

}

export default App;
