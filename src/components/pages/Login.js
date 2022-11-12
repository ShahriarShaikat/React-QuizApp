import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/login.svg";
import { UseAuth } from "../../context/AuthContext";
import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Login() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn } = UseAuth();
  const redirect = useNavigate();

  async function formSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await SignIn(email, password);
      redirect("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("failed to logged in...!");
    }
  }

  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration src={Image} alt="Login" />
        <Form className={`${classes.login}`} onSubmit={formSubmit}>
          <TextInput
            type="text"
            placeholder="Enter email"
            iconName="alternate_email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            type="password"
            placeholder="Enter password"
            iconName="lock"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            Sign In
          </Button>

          {error && <p className="error">{error}</p>}

          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
