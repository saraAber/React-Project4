import { useContext, useState } from "react";
import { useUser } from "./userContext";
import axios from "axios";
import { Link, Navigate } from "react-router";
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
  const navigate = useNavigate();

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  const onSend = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", { UserName: username, Password: password });
      setMsg("Login successful");
      
      // setMsg(`hi ${username}!`);
      saveUser(res.data);
      navigate("/recipes");
    } catch (error: any) {
      // בודקים אם יש תגובה מהשרת
      if (error.response && error.response.data) {
        console.error("Server error:", error.response.data);
        setMsg(error.response.data); // כאן מציגים את הודעת השגיאה שמגיעה מהשרת
      } else {
        console.error("Error:", error);
        setMsg('Login failed, please try again.');
      }
    }
    reset();
  };

  return (
    <>
      {/* <Typography variant="h5">Login</Typography> */}
      <TextField
        label="Username"
        value={username}
        required
        onChange={({ target }) => setUsername(target.value)}
        style={{ width: '200px' }} // הגדר רוחב של 200 פיקסלים

        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        required
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        style={{ width: '200px' }} // הגדר רוחב של 200 פיקסלים
        fullWidth
      />
      <br />
      <br />
      <Button variant="contained" size="small" onClick={onSend}>
          כניסה
        </Button>
      
      {msg === "user not found!" && <Link to={"/logup"}>להרשמה הקליקו כאן👇</Link>}
      {msg && <div>{msg}</div>}
    </>
  );
};

export default Login;





// import { useContext, useState } from "react";
// import { useUser } from "./userContext";
// import axios from "axios";
// import { Link } from "react-router";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const { saveUser } = useUser(); // גישה לפונקציה ששומרת את המשתמש
//     const reset=()=>
//       {
//         setUsername("")
//         setPassword("")
//       }
//       const onSend = async () => {
//         try {
//             const res = await axios.post("http://localhost:8080/api/user/login", { UserName: username, Password: password });
//             console.log("Login successful"); 
//             setMsg(`hi ${username}!`);
//             saveUser(res.data);
//         } catch (error: any) {
//             // בודקים אם יש תגובה מהשרת
//             if (error.response && error.response.data) {
                
//               console.error("Server error:", error.response.data);
//               setMsg(error.response.data); // כאן מציגים את הודעת השגיאה שמגיעה מהשרת
//             } else {
//               console.error("Error:", error);
//               setMsg('Login failed, please try again.');
//             }
    
//             //כאן ינווט לעמוד ההרשמה
//           }
          
       
//         reset()
//       };
    
//       return (
//         <>
//           <input value={username}  required onChange={({ target }) => setUsername(target.value)} />
//           <input type="password" required value={password} onChange={({ target }) => setPassword(target.value)} />
//           <button type="submit" onClick={onSend}>Click</button>
          
//          { msg=="user not found!" && <Link to={"/logup"}>להרשמה הקליקו כאן👇</Link>}
//           {msg && <div>{msg}</div>}
//         </>
//       );
//     };
    
//     export default Login;
    
