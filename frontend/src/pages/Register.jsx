import React, { useState, useEffect } from "react";
import "../styles/register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { registerUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { usePageContent } from "../context/PageContentContext";
import useToast from "../hooks/useToast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { content, setPageSlug, fetchContent, language } = usePageContent();
  const { showSuccess, showError } = useToast(); // Use the custom toast hook

  useEffect(() => {
    setPageSlug("register");
    fetchContent("register", language);
  }, [language]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username =
        content?.validation?.username_required || "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username =
        content?.validation?.username_too_short ||
        "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        content?.validation?.email_required || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        content?.validation?.email_invalid || "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        content?.validation?.password_required || "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        content?.validation?.password_too_short ||
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Object.values(errors).forEach(error => {
        showError(error);
      });
      return;
    }

    try {
      const res = await registerUser(formData);

      if (res.success) {
        showSuccess(
          content?.notification?.registration_success ||
            "Registration successful! Redirecting..."
        );
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showError(
          res.message ||
            content?.validation?.registration_failed ||
            "Registration failed. Try again."
        );
      }
    } catch (err) {
      showError(
        err.message ||
          content?.validation?.server_error ||
          "Server error. Try again later."
      );
    }
  };

  if (!content?.form || !content?.header) return null;

  return (
    <>
      <Header />

      <main className="register-page">
        <div className="register-card">
          <h2 className="register-title">{content.header.title}</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>{content.form.username_label}</label>
              <input
                type="text"
                name="username"
                placeholder={content.form.username_placeholder}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <small className="error">{errors.username}</small>
              )}
            </div>
            <div className="form-group">
              <label>{content.form.email_label}</label>
              <input
                type="email"
                name="email"
                placeholder={content.form.email_placeholder}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label>{content.form.password_label}</label>
              <input
                type="password"
                name="password"
                placeholder={content.form.password_placeholder}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
            </div>
            <button type="submit" className="register-btn">
              {content.form.button_submit}
            </button>
            <div className="register-links">
              <span onClick={() => navigate("/login")}>
                {content.actions?.link_login}
              </span>
              <span onClick={() => navigate("/forgot-password")}>
                {content.actions?.link_forgot_password}
              </span>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
