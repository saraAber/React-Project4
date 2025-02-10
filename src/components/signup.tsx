import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./userContext";

// 🎯 נגדיר את סוג הנתונים שהמשתמש מזין בטופס
interface SignupForm {
  UserName: string;
  Password: string;
  Name: string;
  Phone: string;
  Email: string;
  Tz: string;
}

const Signup= () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignupForm>({ mode: "onChange" });
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
  const navigate = useNavigate();

  const onSend = async (data: SignupForm) => {
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/sighin",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data && res.data.Id) {
        setMsg("ההרשמה בוצעה בהצלחה! 🎉");
        saveUser(res.data); // שמירת המשתמש ב-Context
      } else {
        setMsg("שגיאה בהרשמה. נסה שוב.");
      }
    } catch (error: any) {
      if (error.response) {
        setMsg("😜 אתה רשום כבר במאגר");
        navigate("/profile"); 
      } else {
        setMsg("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {msg && <>{msg}</>}
      <form onSubmit={handleSubmit(onSend)}>
        <input {...register("UserName", { required: "שדה חובה" })} placeholder="שם משתמש" />
        <p>{errors.UserName?.message}</p>

        <input {...register("Password", { required: "שדה חובה" })} placeholder="סיסמה" type="password" />
        <p>{errors.Password?.message}</p>

        <input {...register("Name", { required: "שדה חובה" })} placeholder="שם מלא" />
        <p>{errors.Name?.message}</p>

        <input {...register("Phone", { required: "שדה חובה" })} placeholder="טלפון" />
        <p>{errors.Phone?.message}</p>

        <input {...register("Email", { required: "שדה חובה" })} placeholder="אימייל" />
        <p>{errors.Email?.message}</p>

        <input {...register("Tz", { required: "שדה חובה" })} placeholder="תעודת זהות" />
        <p>{errors.Tz?.message}</p>

        <button type="submit" disabled={!isValid || loading}>
          {loading ? "ביצוע הרשמה..." : "הרשמה"}
        </button>

        <br />
        {msg === "😜 אתה רשום כבר במאגר" && (
          <Link to="/login">להתחברות הקליקו כאן</Link>
        )}
      </form>
    </>
  );
};

export default Signup;



//MUI:
// import React, { useState } from "react";
// import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";

// interface SignupForm {
//     UserName: string;
//     Password: string;
//     Name: string;
//     Phone: string;
//     Email: string;
//     Tz: string;
// }

// const Signup = () => {
//     const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignupForm>({ mode: "onChange" });
//     const [msg, setMsg] = useState<string>("");
//     const [loading, setLoading] = useState<boolean>(false);

//     return (
//         <Container component="main" maxWidth="xs">
//             <Paper elevation={3} sx={{ padding: 3, borderRadius: "12px" }}>
//                 <Typography variant="h5" align="center" gutterBottom>
//                     הרשמה
//                 </Typography>
//                 <Box component="form" noValidate onSubmit={handleSubmit(() => {/* כאן תוסיף את הלוגיקה של ההרשמה */})} sx={{ mt: 1 }}>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="שם משתמש"
//                         {...register("UserName", { required: "שדה חובה" })}
//                         error={Boolean(errors.UserName)}
//                         helperText={errors.UserName?.message}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="סיסמה"
//                         type="password"
//                         {...register("Password", { required: "שדה חובה" })}
//                         error={Boolean(errors.Password)}
//                         helperText={errors.Password?.message}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="שם מלא"
//                         {...register("Name", { required: "שדה חובה" })}
//                         error={Boolean(errors.Name)}
//                         helperText={errors.Name?.message}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="טלפון"
//                         {...register("Phone", { required: "שדה חובה" })}
//                         error={Boolean(errors.Phone)}
//                         helperText={errors.Phone?.message}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="אימייל"
//                         {...register("Email", { required: "שדה חובה" })}
//                         error={Boolean(errors.Email)}
//                         helperText={errors.Email?.message}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="תעודת זהות"
//                         {...register("Tz", { required: "שדה חובה" })}
//                         error={Boolean(errors.Tz)}
//                         helperText={errors.Tz?.message}
//                     />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 3, mb: 2 }}
//                         type="submit"
//                         disabled={!isValid || loading}
//                     >
//                         {loading ? "ביצוע הרשמה..." : "הרשמה"}
//                     </Button>
//                     {msg === "😜 אתה רשום כבר במאגר" && (
//                         <Link to="/login">
//                             <Typography variant="body2" align="center">
//                                 להתחברות הקליקו כאן
//                             </Typography>
//                         </Link>
//                     )}
//                     {msg && (
//                         <Typography variant="body2" color="error" align="center">
//                             {msg}
//                         </Typography>
//                     )}
//                 </Box>
//             </Paper>
//         </Container>
//     );
// };

// export default Signup;
