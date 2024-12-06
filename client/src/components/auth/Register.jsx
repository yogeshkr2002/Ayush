import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./register.css"; // Import the new CSS file
import { toast } from "react-hot-toast";
import { register } from "../services/api";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await register(values);
        toast.success("Registration successful!");
        navigate("/login");
      } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
        console.error("Registration error:", err);
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Register</h1>
        {error && <div className="register-error">{error}</div>}
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
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
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "error" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
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
            Register
          </button>
          <div className="register-link">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
