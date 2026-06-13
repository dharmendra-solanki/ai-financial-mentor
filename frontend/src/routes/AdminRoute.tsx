import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";

const AdminRoute = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;