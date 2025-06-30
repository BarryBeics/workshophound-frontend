import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RouteIcon from '@mui/icons-material/Route';
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

import { UserRole } from "../constants/userRoles.ts";



export const navItems = [
  /* ---------- Public section ---------- */
  { section: "Public" },
  { text: "Landing",   icon: <HomeOutlinedIcon />, path: "/",          roles: [UserRole.GUEST, UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "FAQ",       icon: <HelpOutlineOutlinedIcon />, path: "/faq", roles: [UserRole.GUEST, UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Roadmap",       icon: <RouteIcon />, path: "/roadmap", roles: [UserRole.GUEST, UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Join The Pack",  icon: <PersonOutlinedIcon />, path: "/joinThePack", roles: [UserRole.GUEST, UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },

  /* ---------- Strategy (needs login) ---------- */
  { section: "Strategy" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Manage Bots", icon: <CodeOffOutlinedIcon />, path: "/bots", roles: [UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },

  /* ---------- Charts (needs login) ---------- */
  { section: "Charts" },
  { text: "Pairs Chart", icon: <TimelineOutlinedIcon />, path: "/pairsChart", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "SMA Chart", icon: <MultilineChartOutlinedIcon />, path: "/smaChart", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Avg Gain Chart", icon: <TrendingUpOutlinedIcon />, path: "/avgGainChart", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Liquidity Trend Chart", icon: <TrendingUpOutlinedIcon />, path: "/liquidityTrendChart", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },

    /* ---------- Charts (needs login) ---------- */
  { section: "Reports" },
  { text: "Trade Outcomes", icon: <TimelineOutlinedIcon />, path: "/tradeOutcomes", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },
  { text: "Market Stats", icon: <TimelineOutlinedIcon />, path: "/marketStats", roles: [UserRole.INTERESTED, UserRole.MEMBER, UserRole.ADMIN], adminOnly: false },

  /* ---------- Admin (hidden unless admin) ---------- */
  { section: "Admin", adminOnly: true },
  { text: "Manage Users",    icon: <PeopleAltOutlinedIcon />,   path: "/manageUsers",    roles: [UserRole.ADMIN], adminOnly: true  },
  { text: "Manage Tasks",    icon: <FormatListNumberedOutlinedIcon />, path: "/manageTasks", roles: [UserRole.ADMIN], adminOnly: true  },
  { text: "Manage Projects", icon: <AccountTreeOutlinedIcon />, path: "/manageProjects", roles: [UserRole.ADMIN], adminOnly: true  },
  { text: "Manage SOPs",     icon: <ArticleIcon />,             path: "/manageSOPs",     roles: [UserRole.ADMIN], adminOnly: true  },
  { text: "Kanban Board",    icon: <ViewKanbanIcon />,          path: "/kanban",         roles: [UserRole.ADMIN], adminOnly: true },
];
