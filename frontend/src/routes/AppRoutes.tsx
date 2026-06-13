import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import IncomePage from "../pages/Income";
import Expenses from "../pages/Expenses";
import Budgets from "../pages/Budgets";
import Profile from "../pages/Profile";
import Reports from "../pages/Reports";
import AiMentor from "../pages/AiMentor";
import SavingsGoals from "../pages/SavingsGoals";
import Debts from "../pages/Debts";
import Admin from "../pages/Admin";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/savings-goals" element={<SavingsGoals />} />
        <Route path="/debts" element={<Debts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai-mentor" element={<AiMentor />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
