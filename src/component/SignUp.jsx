import { useState } from "react";
import "./signIn.css";

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const user = { email };
    localStorage.setItem("ucook_user", JSON.stringify(user));
    setError("");
    if (onSignUp) onSignUp(user);
  };

  return (
    <div className="signIn-wrap">
      <form className="signIn-form" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        {error && <div className="si-error">{error}</div>}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="si-submit">Create account</button>
      </form>
    </div>
  );
}

export default SignUp;
