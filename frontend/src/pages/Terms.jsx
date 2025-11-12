import React, { useEffect } from "react";
import "../styles/terms.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePageContent } from "../context/PageContentContext";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const { content, fetchContent, setPageSlug, language } = usePageContent();
  const navigate = useNavigate();
  useEffect(() => {
    setPageSlug("terms");
    fetchContent("terms", language);
  }, [language]);

  if (!content || !content.body) return null;
  const { title, button, content: termsText } = content.body;

  return (
    <>
      <Header />
      <main className="terms-page">
        <h2 className="terms-title">{title}</h2>
        <div className="terms-btn-wrapper">
          <button className="terms-btn" onClick={() => navigate(-1)}>
            {button}
          </button>
        </div>

        <div className="terms-card">
          <div
            className="terms-body"
            dangerouslySetInnerHTML={{
              __html: termsText.replace(/\r\n/g, "<br/>"),
            }}></div>
        </div>
        <div className="terms-btn-bottom">
          <button className="terms-btn" onClick={() => navigate(-1)}>
            {button}
          </button>
        </div>
      </main>
    </>
  );
};

export default Terms;
