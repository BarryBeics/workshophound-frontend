// Third-party libraries
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

// Theme
import { ColorModeContext, useMode } from "./theme";

// Navigation
import Layout from "./navigation/Layout";

// Components
import ProtectedRoute from "./auth/ProtectedRoute";
import EditTaskForm from "./views/manageTasks/EditTaskForm";
import EditProjectForm from "./views/manageProjects/EditProjectForm";
import EditSOPForm from "./views/manageSOPs/EditSOPForm";
import EditUserForm from "./views/manageUsers/EditUserForm";

// Public
import Login from "./auth/LoginPanel";
import LandingPage from "./views/landingPage";
import FAQ from "./views/faq";
import Roadmap from "./views/roadmap";
import JoinThePack from "./views/joinThePack";

// Views - Strategy
import Dashboard from "./views/dashboard";
import Bots from "./views/bots";

// Views - Admin
import ManageUsers from "./views/manageUsers";
import ManageTasks from "./views/manageTasks";
import ManageProjects from "./views/manageProjects";
import ManageSOPs from "./views/manageSOPs";
import KanbanBoard from "./views/kanban";

import CreateUser from "./views/createUser";
import CreateTask from "./views/createTask";
import CreateProject from "./views/createProject";

import ManageMeeting from "./views/manageMeeting";

// Views - Charts
import PairsChart from "./views/pairsChart";
import SMAChart from "./views/smaChart";
import AvgGainChart from "./views/avgGainChart";
import LiquidityChart from "./views/liquidityTrendChart";

// View - Reports
import TradeOutcomes from "./views/tradeOutcomes";
import MarketStats from "./views/marketStatsTable";

import { UserRole } from "./constants/userRoles.ts";

function App() {
  const [theme, colourMode] = useMode();

  return (
    <ColorModeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Topbar link */}
          <Route path="/trackMeeting" element={<ManageMeeting />} />

          {/* Public pages with layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/joinThePack" element={<JoinThePack />} />
          </Route>

          {/* Protected pages wrapped in layout */}
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            {/* Strategy */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bots"
              element={
                <ProtectedRoute>
                  <Bots />
                </ProtectedRoute>
              }
            />
            {/* Charts */}
            <Route
              path="/pairsChart"
              element={
                <ProtectedRoute>
                  <PairsChart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/smaChart"
              element={
                <ProtectedRoute>
                  <SMAChart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/avgGainChart"
              element={
                <ProtectedRoute>
                  <AvgGainChart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/liquidityTrendChart"
              element={
                <ProtectedRoute>
                  <LiquidityChart />
                </ProtectedRoute>
              }
            />
          {/* Reports */}
            <Route
              path="/tradeOutcomes"
              element={
                <ProtectedRoute>
                  <TradeOutcomes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketStats"
              element={
                <ProtectedRoute>
                  <MarketStats />
                </ProtectedRoute>
              }
            />
          {/* ADMIN */}
            <Route
              path="/createUser"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageUsers"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/edit/:email"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <EditUserForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createTask"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <CreateTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageTasks"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <ManageTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/edit/:id"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <EditTaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createProject"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageProjects"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <ManageProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/edit/:id"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <EditProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manageSOPs"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <ManageSOPs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sops/edit/:id"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <EditSOPForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kanban"
              element={
                <ProtectedRoute role={[UserRole.ADMIN]}>
                  <KanbanBoard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
