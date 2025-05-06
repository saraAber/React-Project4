"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Avatar,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { observer } from "mobx-react-lite"
import userStore from "../stores/userStore"
import { useUser } from "../context/userContext"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

interface SignupForm {
  UserName: string
  Password: string
  Name: string
  Phone: string
  Email: string
  Tz: string
}

const Signup = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupForm>({ mode: "onChange" })
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { saveUser } = useUser()

  const onSend = async (data: SignupForm) => {
    setLoading(true)
    await userStore.signup(data)

    if (userStore.user) {
      saveUser(userStore.user)
      navigate("/recipes")
    }

    setLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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
        overflow: "auto",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
            my: 4,
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
              <PersonAddAltIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
              הרשמה
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit(onSend)} sx={{ mt: 3, width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="שם משתמש"
                    {...register("UserName", {
                      required: "שדה חובה",
                      minLength: { value: 3, message: "שם משתמש חייב להכיל לפחות 3 תווים" },
                    })}
                    error={Boolean(errors.UserName)}
                    helperText={errors.UserName?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    {...register("Password", {
                      required: "שדה חובה",
                      minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" },
                    })}
                    error={Boolean(errors.Password)}
                    helperText={errors.Password?.message}
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="שם מלא"
                    {...register("Name", { required: "שדה חובה" })}
                    error={Boolean(errors.Name)}
                    helperText={errors.Name?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="טלפון"
                    {...register("Phone", {
                      required: "שדה חובה",
                      pattern: { value: /^[0-9]+$/, message: "מספר טלפון חייב להכיל ספרות בלבד" },
                    })}
                    error={Boolean(errors.Phone)}
                    helperText={errors.Phone?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="תעודת זהות"
                    {...register("Tz", {
                      required: "שדה חובה",
                      pattern: { value: /^[0-9]+$/, message: "ת.ז חייבת להכיל ספרות בלבד" },
                    })}
                    error={Boolean(errors.Tz)}
                    helperText={errors.Tz?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="אימייל"
                    {...register("Email", {
                      required: "שדה חובה",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "כתובת אימייל לא תקינה" },
                    })}
                    error={Boolean(errors.Email)}
                    helperText={errors.Email?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#000000",
                  "&:hover": { backgroundColor: "#333333" },
                  borderRadius: 2,
                  padding: "12px",
                  fontSize: "1rem",
                }}
                type="submit"
                disabled={!isValid || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "הרשמה"}
              </Button>

              {userStore.error && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  {userStore.error}
                </Alert>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  כבר יש לך חשבון?
                </Typography>
                <Link to="/login" style={{ textDecoration: "none" }}>
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
                    להתחברות לחץ כאן
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
})

export default Signup
