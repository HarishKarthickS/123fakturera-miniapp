import React, { useState, useEffect } from "react";
import "../styles/login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { usePageContent } from "../context/PageContentContext";
import useToast from "../hooks/useToast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { content, setPageSlug, fetchContent, language } = usePageContent();
  const { showSuccess, showError } = useToast(); // Use the custom toast hook

  useEffect(() => {
    setPageSlug("login");
    fetchContent("login", language);
  }, [language]);
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = content.validation.email_required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.validation.email_invalid;
    }

    if (!formData.password.trim()) {
      newErrors.password = content.validation.password_required;
    } else if (formData.password.length < 6) {
      newErrors.password = content.validation.password_too_short;
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

    if (!validateForm()) return;

    try {
      const res = await loginUser(formData);
      if (res.success) {
        showSuccess("Login successful!");
        navigate("/dashboard");
      } else {
        showError(res.message || "Invalid credentials");
      }
    } catch (err) {
      showError(err.message || "Server error, please try again later");
    }
  };

  if (!content?.form || !content?.header) return null;

  return (
    <>
      <Header />
      <main className="login-page">
        <div className="login-card">
          <h2 className="login-title">{content.header.title}</h2>

          <form onSubmit={handleSubmit} noValidate>
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
              {errors.password && <small className="error">{errors.password}</small>}
            </div>
            <button type="submit" className="login-btn">
              {content.form.button_submit}
            </button>
            <div className="login-links">
              <span onClick={() => navigate("/register")}>
                {content.actions?.link_register}
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

export default Login;
