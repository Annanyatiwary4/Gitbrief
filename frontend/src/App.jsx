import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import HeroSectionGitBrief from "./components/hero";
import SlidingFooter from "./components/Footer";
import Login from "./components/Login";
import TermsOfService from "./components/pages/Terms";
import PrivacyPolicy from "./components/pages/Privacy";
import Dashboard from "./components/pages/Dashboard";
import { PRTable } from "./components/PRtable";



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
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="/prs/:owner/:repo" element={<PRTable />} />
          {/* Add other routes as needed */}

        </Routes>

      
      </div>
    </Router>
  );

}

export default App;
