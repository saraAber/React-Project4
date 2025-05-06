"use client"

import type React from "react"

import { useState, useContext } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Tooltip,
} from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from "../context/userContext"
import MenuIcon from "@mui/icons-material/Menu"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"

const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLoginClick = () => {
    navigate("/login")
    handleCloseNavMenu()
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    handleCloseUserMenu()
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    handleCloseNavMenu()
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", boxShadow: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src="/רקע4.jpg" alt="לוגו" style={{ height: "60px", cursor: "pointer" }} />
            </Link>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleNavigate("/recipes")}>
                <Typography textAlign="center">מתכונים</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/showRecepies")}>
                <Typography textAlign="center">צפייה במתכונים</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/addRecipe")}>
                <Typography textAlign="center">הוספת מתכון</Typography>
              </MenuItem>
              {!user && (
                <MenuItem onClick={handleLoginClick}>
                  <Typography textAlign="center">התחברות</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <RestaurantMenuIcon sx={{ color: "#b57e2c", fontSize: 32 }} />
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Button onClick={() => handleNavigate("/recipes")} sx={{ my: 2, color: "white", display: "block", mx: 1 }}>
              מתכונים
            </Button>
            <Button
              onClick={() => handleNavigate("/showRecepies")}
              sx={{ my: 2, color: "white", display: "block", mx: 1 }}
            >
              צפייה במתכונים
            </Button>
            <Button
              onClick={() => handleNavigate("/addRecipe")}
              sx={{ my: 2, color: "white", display: "block", mx: 1 }}
            >
              הוספת מתכון
            </Button>
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="פתח תפריט">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "#b57e2c", color: "black" }}>
                      {user.Name ? user.Name.charAt(0).toUpperCase() : "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{user.Name}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">התנתקות</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleLoginClick}
                sx={{
                  backgroundColor: "#b57e2c",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#8c6321",
                  },
                }}
              >
                התחברות
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
