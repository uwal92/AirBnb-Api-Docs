import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Login.css"; // Optional for styling
import { useModal } from "../../context/Modal";

const Login = () => {
  const dispatch = useDispatch();

  // State for form fields
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const disable = {};
    if (credential.length < 4) {
      disable.credential = `Username must be longer than 4 characters`;
    }
    if (password.length < 6) {
      disable.password = `Password must be longer than 6 characters`;
    }
    setErrors(disable);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setErrors({});
    if (!credential || !password) {
      setErrors(["Username and Password are required"]);
      return;
    }

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ credential: `Invalid Credentials` });
        }
      });
  };

  const handleSubmitDemo = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setErrors({});
    return dispatch(
      sessionActions.login({ credential: `Demo-lition`, password: `password` })
    ).then(closeModal);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <label>
            Username or Email
            </label>
        <input
          type="text"
          placeholder="Username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        {errors.credential && isSubmitted && (
            <p className="error-message">{errors.credential}</p>
          )}
        <label>
            Password
            </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && isSubmitted && (
            <p className="error-message">{errors.password}</p>
          )}
        <button
            className="login-button"
            type="submit"
            disabled={Object.values(errors).length > 0}
          >
            Login
        </button>
        <a className="demo-button" onClick={handleSubmitDemo}>
            <u>Demo User</u>
        </a>
      </form>
    </div>
  );
};

export default Login;
