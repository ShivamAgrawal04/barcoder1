import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicComponent = () => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="text-cyan-300 text-center py-10">
        loading.............
      </div>
    );
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicComponent;
