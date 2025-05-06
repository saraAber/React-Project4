import { makeAutoObservable } from "mobx";
import axios from "axios";

class UserStore {
  user: any = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromSession();
  }

  setUser(user: any) {
    this.user = user;
    sessionStorage.setItem("user", JSON.stringify(user)); // שמירה ב-sessionStorage
  }

  setError(error: string | null) {
    this.error = error;
  }

  loadUserFromSession() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  async login(username: string, password: string) {
    try {
      this.logout(); // התנתקות מהמשתמש הקודם
            
      const response = await axios.post(`http://localhost:8080/api/user/login`, { UserName: username, Password: password });
  
      this.setUser(response.data); // שמירה ב-sessionStorage
      this.setError(null);
    } catch (err: any) {
      this.setError(err.message || "Error logging in");
    }
  }
  async signup(data: any) {
    try {
      const response = await axios.post("http://localhost:8080/api/user/sighin", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data && response.data.Id) {
        this.setUser(response.data);
        this.setError(null);
      } else {
        this.setError("שגיאה בהרשמה. נסה שוב.");
      }
    } catch (error: any) {
      if (error.response) {
        this.setError("😜לחץ כאן לכניסה אתה כבר רשום במאגר");
      } else {
        this.setError("שגיאה בחיבור לשרת. נסה שוב מאוחר יותר.");
      }
    }
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem("user");
  }
}
const userStore = new UserStore();
export default userStore;