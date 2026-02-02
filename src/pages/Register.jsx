import { useNavigate, Link } from "react-router-dom";
import React from "react";
import "./Register.css";
import { auth, googleProvider } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCred.user, {
        displayName: data.name,
      });

      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
            />
            <span className="error">{errors.name?.message || ""}</span>
          </div>

          <div className="field">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <span className="error">{errors.email?.message || ""}</span>
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Must contain letters & numbers",
                },
              })}
            />
            <span className="error">{errors.password?.message || ""}</span>
          </div>

          <button type="submit" className="primary-btn">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="divider" />

        <button className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
