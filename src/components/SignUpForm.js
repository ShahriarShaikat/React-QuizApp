import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignUpForm() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [agree, setAgree] = useState("");

  const { SignUp } = UseAuth();
  const redirect = useNavigate();

  //useEffect(() => {}, []);

  async function formSubmit(e) {
    e.preventDefault();
    //
    if (password !== conPassword) {
      return setError("Password does't match!");
    }
    try {
      setLoading(true);
      setError("");
      await SignUp(email, password, name);
      redirect("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("failed to create accoun...!");
    }
  }

  return (
    <Form className={classes.signup} onSubmit={formSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        iconName="person"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <TextInput
        type="password"
        placeholder="Confirm password"
        iconName="lock_clock"
        required
        value={conPassword}
        onChange={(e) => setConPassword(e.target.value)}
      />

      <Checkbox
        className={null}
        text="I agree to the Terms &amp; Conditions"
        required
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />

      <Button type="submit" disabled={loading}>
        Register
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
