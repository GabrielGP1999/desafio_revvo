import { BrowserRouter as Router } from "react-router-dom";
import "./App.module.css";
import MainRoutes from "./routes/main-routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
