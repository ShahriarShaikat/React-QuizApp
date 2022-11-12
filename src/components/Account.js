import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import classes from "../styles/account.module.css";

export default function Account() {
  const { currentUser, SignOut } = UseAuth();
  const redirect = useNavigate();

  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      {currentUser ? (
        <>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={() => {
              SignOut();
              redirect("/login");
            }}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
