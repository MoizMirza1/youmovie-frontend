import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthRoutes from "./routes/AuthRoutes";
import ScrollToTop from "./ScrollToTop";  // Import the ScrollToTop component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <div className=" ">
      <AuthProvider>
        <Router>
          <ScrollToTop />  
          <AuthRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
