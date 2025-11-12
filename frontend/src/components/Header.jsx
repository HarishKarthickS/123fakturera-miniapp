import React,{ useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPageContent } from "../services/pageContentApi";
import { usePageContent } from "../context/PageContentContext";
import "../styles/header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navData, setNavData] = useState({});
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const location = useLocation();
  const { language, changeLanguage } = usePageContent();

  const pathSlug = location.pathname === "/" ? "home" : location.pathname.replace("/", "");

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const data = await getPageContent(pathSlug, language);
        if (data.success) setNavData(data.content.nav);
      } catch (error) {
        console.error("Failed to load navigation:", error);
      }
    };
    fetchNav();
  }, [language, pathSlug]);

  const switchLanguage = (newLang) => {
    changeLanguage(newLang);
    setShowLangDropdown(false);
  };

  const flagMap = {
    sv: "https://storage.123fakturere.no/public/flags/SE.png",
    en: "https://storage.123fakturere.no/public/flags/GB.png",
  };

  const menuItems = [
    { name: navData.nav_home || "Home", path: "/" },
    { name: navData.nav_order || "Order", path: "/order" },
    { name: navData.nav_customers || "Our Customers", path: "/customers" },
    { name: navData.nav_about || "About us", path: "/about" },
    { name: navData.nav_contact || "Contact Us", path: "/contact" },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <div
          className="menu-toggle"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setShowLangDropdown(false);
          }}>
          <span>☰</span>
        </div>
        <div className="header-logo desktop-only">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="123 Fakturera"
            className="header-logo-img"/>
        </div>
        <div className="nav-section">
          <nav className="nav-items">
            <ul>
              {menuItems.map((item, i) => (
                <li key={i} className={location.pathname === item.path ? "active" : ""}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lang-wrapper">
            <div
              className="lang-selected"
              onClick={() => setShowLangDropdown(!showLangDropdown)}>
              {language === "sv" ? "Svenska" : "English"}
              <img src={flagMap[language]} alt="Flag" className="flag" />
            </div>

            {showLangDropdown && (
              <div className="lang-menu">
                <div
                  onClick={() => switchLanguage("sv")}
                  className={`lang-item ${language === "sv" ? "active" : ""}`}>
                  Svenska <img src={flagMap["sv"]} alt="Swedish Flag" className="flag" />
                </div>
                <div
                  onClick={() => switchLanguage("en")}
                  className={`lang-item ${language === "en" ? "active" : ""}`}>
                  English <img src={flagMap["en"]} alt="English Flag" className="flag" />
                </div>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {menuItems.map((item, i) => (
                <li key={i} onClick={() => setIsMenuOpen(false)}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
