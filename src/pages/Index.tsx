
import { Navigate } from "react-router-dom";

// Redirect from the root path to the login page
const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
