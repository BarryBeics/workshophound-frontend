import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SidebarNav from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <Box display="flex" width="100vw" height="100vh" overflow="hidden">
      <SidebarNav />

      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Topbar />
        <Box
          component="main"
          flex="1"
          px={3}
          py={2}
          overflow="auto"
          boxSizing="border-box"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
