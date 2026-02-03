import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { auth, googleProvider, facebookProvider } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import "./Register.css";

export default function Register() {
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
      const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCred.user, { displayName: data.name });
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

  if (user) return null;

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input type="text" placeholder="Name" {...register("name", { required: "Name is required", minLength: { value: 2, message: "Minimum 2 characters" } })} />
            <span className="error">{errors.name?.message}</span>
          </div>

          <div className="field">
            <input type="email" placeholder="Email" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} />
            <span className="error">{errors.email?.message}</span>
          </div>

          <div className="field">
            <input type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })} />
            <span className="error">{errors.password?.message}</span>
          </div>

          <button type="submit" className="primary-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="divider" />

        <button className="google-btn" onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button className="facebook-btn" onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      </div>
    </div>
  );
}
