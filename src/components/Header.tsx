import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useRole } from "../helpers/useRole";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  SvgIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

interface CustomBookIconProps {
  sx?: object;
}

const CustomBookIcon: React.FC<CustomBookIconProps> = ({ sx }) => (
  <SvgIcon sx={sx} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      fill="none"
      stroke="#facc15"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </SvgIcon>
);

const Header: React.FC = () => {
  const { userData } = useRole();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = userData?.role ?? "";
  const isAdmin = userRole === import.meta.env.VITE_ROLE_ONE;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = async () => {
    setMobileOpen(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}auth/api/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Error al cerrar sesión:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const adminNavItems: NavItem[] = [
    { text: "Cursos", path: "/courses", icon: <BookIcon /> },
    { text: "Empleados", path: "/employees", icon: <PeopleIcon /> },
    { text: "Usuarios", path: "/users", icon: <PersonIcon /> },
  ];
  const navItems = isAdmin ? adminNavItems : [];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#1976D2",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      {/* Logo and title in Mobile */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <CustomBookIcon sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" noWrap>
          PassportCourses
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                color: "inherit",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Button Logout at bottom */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogOut}
          startIcon={<ExitToAppIcon />}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "#fff",
            },
          }}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#1976D2",
          color: "#fff",
        }}
        elevation={4}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 } }}>
            {/* Button Menu in Mobile */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo + title */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              <CustomBookIcon sx={{ fontSize: 36, mr: 1 }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                PassportCourses
              </Typography>
            </Box>

            {/* Menu Desktop */}
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 6 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: "inherit",
                    textTransform: "none",
                    fontWeight: 600,
                    mx: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Button Logout Desktop */}
            {!isMobile && (
              <Button
                color="inherit"
                onClick={handleLogOut}
                startIcon={<ExitToAppIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  ml: 3,
                }}
              >
                Salir
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            bgcolor: "#1976D2",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
