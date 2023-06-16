import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Sidebar from "./Sidebar";

import { logout } from "../../actions/userActions";
import {
  AppBar,
  Avatar,
  Box,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";

import FlexBetween from "../styledComponents/FlexBetween";

import { setFont, setMode, setModeLike } from "../../slices/themeSlice";

export default function Header() {
  const { isAuthenticated, user = {} } = useSelector(
    (state) => state.authState
  );
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const logoutHandler = () => {
    dispatch(logout);
  };
  const { mode, font } = useSelector((state) => state.themeState);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  let handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [themeEl, setThemeEl] = useState(null);
  const isThemeOpen = Boolean(themeEl);
  const themeClick = (e) => setThemeEl(e.currentTarget);
  const themeClose = () => setThemeEl(null);
  const changeTheme = (e) => {
    dispatch(setModeLike(e.target.innerText.toLowerCase()));
    themeClose();
  };

  const [fontEl, setFontEl] = useState(null);
  const isfontOpen = Boolean(fontEl);
  const fontClick = (e) => setFontEl(e.currentTarget);
  const fontClose = () => setFontEl(null);

  const changeFont = (e) => {
    let text = e.target.innerText;
    switch (text) {
      case "Inter":
        dispatch(setFont("'Inter', sans-serif"));
        break;

      case "Montserrat":
        dispatch(setFont("'Montserrat', sans-serif"));
        break;

      case "Roboto":
        dispatch(setFont("'Roboto', sans-serif"));
        break;

      case "Source Serif Pro":
        dispatch(setFont("'Source Serif Pro', serif"));

        break;
      case "Dancing Script":
        dispatch(setFont("'Dancing Script', cursive"));

        break;
      case "Expletus Sans":
        dispatch(setFont("'Expletus Sans', cursive"));
        break;

      default:
        dispatch(setFont("'Inter', sans-serif"));
    }
    fontClose();
  };

  //sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: theme.palette.background.alt1,
        }}
      >
        <FlexBetween width="100%">
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h4" color="secondary" component="p">
                Shop
              </Typography>
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              maxWidth: "700px",
              flexGrow: 1,
            }}
            className="ml-3 mt-1"
          >
            <Search />
          </Box>

          <FlexBetween>
            {isAuthenticated ? (
              <div>
                <FlexBetween
                  onClick={handleClick}
                  sx={{
                    textTransform: "none",
                    gap: "1rem",
                  }}
                >
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user.name || "dfs"}
                    </Typography>
                  </Box>
                  <Avatar src={user.avatar ?? "./images/default_avatar.png"} />
                </FlexBetween>
                <Menu
                  id="basic-menu"
                  aria-labelledby="basic-menu"
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,

                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <IconButton onClick={() => dispatch(setMode())}>
                      {theme.palette.mode === "light" ? (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                      ) : (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                      )}
                    </IconButton>
                  </MenuItem>
                  {user.role === "admin" && (
                    <MenuItem onClick={() => navigate("/admin/dashboard")}>
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => navigate("/myprofile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </MenuItem>
                  <MenuItem
                    aria-controls={isThemeOpen ? "theme-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isThemeOpen ? "true" : undefined}
                    onClick={themeClick}
                  >
                    Theme
                  </MenuItem>
                  <Menu
                    id="theme-menu"
                    aria-labelledby="theme-menu"
                    anchorEl={themeEl}
                    open={isThemeOpen}
                    onClose={themeClose}
                    anchorOrigin={{ vertical: "center", horizontal: "left" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "blue"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Blue
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "pink"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Pink
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "orange"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Orange
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "purple"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Purple
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "green"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Green
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "dark"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Dark
                    </MenuItem>
                    <MenuItem
                      onClick={changeTheme}
                      sx={{
                        border:
                          mode === "light"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Light
                    </MenuItem>
                  </Menu>
                  <MenuItem
                    onClick={fontClick}
                    aria-controls={isfontOpen ? "font-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isfontOpen ? "true" : undefined}
                  >
                    Font Style
                  </MenuItem>
                  <Menu
                    id="font-menu"
                    aria-labelledby="font-menu"
                    anchorEl={fontEl}
                    open={isfontOpen}
                    onClose={fontClose}
                    anchorOrigin={{ vertical: "center", horizontal: "left" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Inter', sans-serif"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Inter
                    </MenuItem>
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Montserrat', sans-serif"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Montserrat
                    </MenuItem>
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Roboto', sans-serif"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Roboto
                    </MenuItem>
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Source Serif Pro', serif"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Source Serif Pro
                    </MenuItem>
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Dancing Script', cursive"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Dancing Script
                    </MenuItem>
                    <MenuItem
                      onClick={changeFont}
                      sx={{
                        border:
                          font === "'Expletus Sans', cursive"
                            ? `1px solid ${theme.palette.secondary.main}`
                            : "",
                      }}
                    >
                      Expletus Sans
                    </MenuItem>
                  </Menu>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to={"/login"}>
                <Button variant="outlined" color="secondary" className="ml-3">
                  Login
                </Button>
              </Link>
            )}
            <Link to="/cart" className="ml-3 mr-1 ">
              <Badge color="secondary" badgeContent={cartItems.length}>
                <ShoppingCart color="secondary" />
              </Badge>
            </Link>
          </FlexBetween>
        </FlexBetween>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            width: "100%",
            pb: "1%",
          }}
        >
          <Search />
        </Box>
      </Toolbar>
      <Sidebar
        user={user || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        changeTheme={changeTheme}
        mode={mode}
        changeFont={changeFont}
        font={font}
      />
    </AppBar>
  );
}
