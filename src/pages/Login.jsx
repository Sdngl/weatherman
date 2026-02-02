import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
            <span className="error">
              {errors.email?.message || ""}
            </span>
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            <span className="error">
              {errors.password?.message || ""}
            </span>
          </div>

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="divider" />

        <button className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
