import { useContext, useState } from "react";
import { useUser } from "./userContext";
import axios from "axios";
import { Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
    const reset=()=>
      {
        setUsername("")
        setPassword("")
      }
      const onSend = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/user/login", { UserName: username, Password: password });
            console.log("Login successful");
            setMsg(`hi ${username}!`);
            saveUser(res.data);
        } catch (error: any) {
            // בודקים אם יש תגובה מהשרת
            if (error.response && error.response.data) {
                
              console.error("Server error:", error.response.data);
              setMsg(error.response.data); // כאן מציגים את הודעת השגיאה שמגיעה מהשרת
            } else {
              console.error("Error:", error);
              setMsg('Login failed, please try again.');
            }
    
            //כאן ינווט לעמוד ההרשמה
          }
          
       
        reset()
      };
    
      return (
        <>
          <input value={username}  required onChange={({ target }) => setUsername(target.value)} />
          <input type="password" required value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type="submit" onClick={onSend}>Click</button>
          
         { msg=="user not found!" &&<Link to={"/logup"}>להרשמה הקליקו כאן👇</Link>}
         
          {msg && <div>{msg}</div>}
        </>
      );
    };
    
    export default Login;
    
// import React, { useState } from "react";
// import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
// import { Link } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [msg, setMsg] = useState("");

//     return (
//         <Container component="main" maxWidth="xs">
//             <Paper elevation={3} sx={{ padding: 3, borderRadius: "12px" }}>
//                 <Typography variant="h5" align="center" gutterBottom>
//                     התחברות
//                 </Typography>
//                 <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="שם משתמש"
//                         value={username}
//                         onChange={({ target }) => setUsername(target.value)}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         label="סיסמה"
//                         type="password"
//                         value={password}
//                         onChange={({ target }) => setPassword(target.value)}
//                     />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 3, mb: 2 }}
//                         onClick={() => {/* כאן תוסיף את הלוגיקה של הכניסה */}}
//                     >
//                         כניסה
//                     </Button>
//                     {msg === "user not found!" && (
//                         <Link to="/logup">
//                             <Typography variant="body2" align="center">
//                                 להירשם הקליקו כאן 👇
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

// export default Login;
