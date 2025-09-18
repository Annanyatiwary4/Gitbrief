import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import HeroSectionGitBrief from "./components/hero";
import SlidingFooter from "./components/Footer";
import Login from "./components/Login";
import TermsOfService from "./components/pages/Terms";
import PrivacyPolicy from "./components/pages/Privacy";
import Dashboard from "./components/pages/Dashboard";
import { PRTable } from "./components/PRtable";
import PRSummaryPage from "./components/Summary";
import { LoaderOne } from "./components/ui/loader";
import { useLocation  } from "react-router-dom";
import Contact from "./components/pages/Contact";
import NotFoundPage from "./components/pages/Notfound";

// Wrapper component to handle loading between routes
function PageWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loader on route change
    setLoading(true);

    // Simulate async page load delay (you can remove or adjust this)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // half a second delay

    return () => clearTimeout(timeout);
  }, [location]);

  if (loading) return <LoaderOne />; // show loader
  return children; // show page
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
         <PageWrapper>
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
          <Route path="/repos/:owner/:repo/pull-requests/:prNumber" element ={<PRSummaryPage />} />
          <Route path="/contact" element ={<Contact />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </PageWrapper>
      </div>
    </Router>
  );

}

export default App;
