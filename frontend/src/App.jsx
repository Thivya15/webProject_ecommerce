import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import SyncUser from "./components/SyncUser";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Router>
          <Navbar />
          <AppRoutes />
          <SyncUser />
        </Router>
      ) : (
          <Login />
      )}
    </div>
  );
}

export default App;
