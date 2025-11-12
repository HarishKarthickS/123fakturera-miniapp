import React,{ useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePageContent } from "../context/PageContentContext";
import "../styles/footer.css";

const Footer = () => {
  const { content, setPageSlug, fetchContent, language } = usePageContent();
  const location = useLocation();
  useEffect(() => {
    const pathSlug = location.pathname === "/" ? "home" : location.pathname.replace("/", "");
    setPageSlug(pathSlug);
    fetchContent(pathSlug, language);
  }, [language, location.pathname]);

  const brand = content?.brand?.brand_name || "123 Fakturera";
  const links = content?.links || {};
  const copyright =content.copyright.copyright_text ||"© Lättfaktura, CRO no. 638537, 2025. All rights reserved.";

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h2 className="footer-brand">{brand}</h2>
        </div>
        <div className="footer-right">
          <Link to="/">{links.nav_home || "Home"}</Link>
          <Link to="/order">{links.nav_order || "Order"}</Link>
          <Link to="/contact">{links.nav_contact || "Contact Us"}</Link>
        </div>
      </div>
      <div className="footer-bottom">{copyright}</div>
    </footer>
  );
};

export default Footer;
