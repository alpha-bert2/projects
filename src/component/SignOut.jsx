import "./signOut.css";

function SignOut({ onSignOut }) {
  const handleSignOut = () => {
    localStorage.removeItem("ucook_user");
    if (onSignOut) onSignOut();
  };

  return (
    <div className="signOut-wrap">
      <button className="so-button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SignOut;
