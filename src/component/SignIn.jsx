import { useState } from "react";
import "./signIn.css";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    // simple mock auth — replace with real auth flow as needed
    const user = { email };
    localStorage.setItem("ucook_user", JSON.stringify(user));
    setError("");
    if (onSignIn) onSignIn(user);
  };

  return (
    <div className="signIn-wrap">
      <form className="signIn-form" onSubmit={handleSubmit}>
        <h3>Sign in</h3>
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
        <button className="si-submit">Sign in</button>
      </form>
    </div>
  );
}

export default SignIn;
