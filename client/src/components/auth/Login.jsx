import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { clearUserData, setAuthToken } from "../../services/authService";
import "./login.css";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    clearUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        clearUserData();
        const data = await login(values);
        setAuthToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } catch (err) {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        {error && <div className="login-error">{error}</div>}
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.touched.username && formik.errors.username ? "error" : ""
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error-message">{formik.errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "error" : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <div className="register-link">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
