"use client"

import type React from "react"

import { useState } from "react"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import userStore from "../stores/userStore"
import { useUser } from "../context/userContext"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const Login = observer(() => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const { saveUser } = useUser()

  const reset = () => {
    setUsername("")
    setPassword("")
  }

  const onSend = async () => {
    if (!username || !password) {
      setShowAlert(true)
      return
    }

    await userStore.login(username, password)

    if (userStore.user) {
      saveUser(userStore.user)
      navigate("/recipes")
    }

    reset()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSend()
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/רקע1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#b57e2c", width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
              התחברות
            </Typography>

            <TextField
              label="שם משתמש"
              value={username}
              required
              onChange={({ target }) => setUsername(target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              onKeyDown={handleKeyDown}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <TextField
              label="סיסמה"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              onKeyDown={handleKeyDown}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={onSend}
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "#333333" },
                borderRadius: 2,
                padding: "12px",
                fontSize: "1rem",
              }}
            >
              כניסה
            </Button>

            {userStore.error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {userStore.error}
              </Alert>
            )}

            {userStore.error === "user not found!" && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  עדיין אין לך חשבון?
                </Typography>
                <Link to="/logup" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 1,
                      borderColor: "#000000",
                      color: "#000000",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                      borderRadius: 2,
                    }}
                  >
                    להרשמה לחץ כאן
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="warning" sx={{ width: "100%" }}>
          אנא מלא את כל השדות הנדרשים
        </Alert>
      </Snackbar>
    </Box>
  )
})

export default Login
