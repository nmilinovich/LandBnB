import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log(data)
          errors.error = data.errors
          return setErrors(errors);

        }
      });
  };

  const handleDemoUser = (e) => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
  }

  return (
    <>
      <h1>Log In</h1>
      <div className="error">{errors.error ? errors.error : null}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}

          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <span id='DemoUser' onClick={handleDemoUser}>Login as Demo User</span>
      </form>
    </>
  );
}

export default LoginFormModal;
