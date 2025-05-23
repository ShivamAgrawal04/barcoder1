import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateComponent = () => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="text-cyan-300 text-center py-10">
        loading.............
      </div>
    );
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponent;
