import { useUser } from "./components/userContext";
const Profile = () => {
const { user, logout } = useUser();

  return (
    <div>         
      {user ? (
        <>    
          <h2>שלום, {user.Name}!</h2>
          <p>אימייל: {user.Email}</p>
          <p>טלפון: {user.Phone}</p>
          <button onClick={logout}>התנתק</button>
        </>
      ) : (
        <p>אנא התחבר</p>
      )}
    </div>
  );
};

export default Profile;