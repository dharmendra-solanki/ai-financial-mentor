import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import incomeRoutes from "./routes/income.routes";
import expenseRoutes from "./routes/expense.routes";
import budgetRoutes from "./routes/budget.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import aiMentorRoutes from "./routes/aiMentor.routes";
import profileRoutes from "./routes/profile.routes";
import reportRoutes from "./routes/report.routes";
import savingsGoalRoutes from "./routes/savingsGoal.routes";
import debtRoutes from "./routes/debt.routes";
import notificationRoutes from "./routes/notification.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AI Financial Mentor API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiMentorRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/savings-goals", savingsGoalRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

export default app;