import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { auth, googleProvider, facebookProvider } from "../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate("/"); // redirect if logged in
    });
    return () => unsubscribe();
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  if (user) return null; // hide login form if already logged in

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
            <span className="error">{errors.email?.message}</span>
          </div>

          <div className="field">
            <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
            <span className="error">{errors.password?.message}</span>
          </div>

          <button type="submit" className="primary-btn">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="divider" />

        <button className="google-btn" onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button className="facebook-btn" onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      </div>
    </div>
  );
}
