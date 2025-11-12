import React,{ useEffect, useState } from "react";
import "../styles/dashboard.css";
import { usePageContent } from "../context/PageContentContext";
import { getProducts } from "../services/productApi";
import { getProfile } from "../services/userApi";
import useToast from "../hooks/useToast";
import {FileText,Users,Briefcase,Book,Tag,Layers,XCircle,FilePlus,Package,Users2,Upload,LogOut,Search,MoveDown,MoveUp,MoveRight,Plus,Printer,Pin,Ellipsis,ChevronDown,Menu,X,} from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [profile, setProfile] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { content, setPageSlug, fetchContent, language, changeLanguage } = usePageContent();
  const { showError } = useToast(); // Use the custom toast hook
  const flagMap = {
    sv: "https://storage.123fakturere.no/public/flags/SE.png",
    en: "https://storage.123fakturere.no/public/flags/GB.png",
    no: "https://flagcdn.com/w40/no.png",
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPageSlug("dashboard");
    fetchContent("dashboard", language);
  }, [language]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productsRes, profileRes] = await Promise.all([
          getProducts(),
          getProfile(),
        ]);
        setProducts(productsRes.products || []);
        setFiltered(productsRes.products || []);
        setProfile(profileRes || {});
      } catch (err) {
        console.error("Failed to load data:", err);
        showError("Failed to load dashboard data. Please refresh the page.");
      }
    };
    fetchAll();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sorted = [...products];
    if (searchArticle)
      sorted = sorted.filter((p) =>
        p.article_no.toLowerCase().includes(searchArticle.toLowerCase())
      );
    if (searchProduct)
      sorted = sorted.filter((p) =>
        p.item_name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const valA = a[sortConfig.key]?.toString().toLowerCase();
        const valB = b[sortConfig.key]?.toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFiltered(sorted);
  }, [searchArticle, searchProduct, products, sortConfig]);
  if (!content?.table || !content?.nav) return null;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className="dashboard-wrapper">
      <header className="top-bar">
        <div className="header-left">
          {(isMobile || isTablet) && (
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          )}
          <div className="user-inline">
            <div className="avatar">{profile.username?.[0]?.toUpperCase() || "U"}</div>
            <div className="user-text-inline">
              <span className="user-name">{profile.username || "User"}</span>
              <span className="user-role">{profile.role || "Role"}</span>
            </div>
          </div>
        </div>
        <div className="lang-wrapper">
          <div
            className="lang-selected"
            onClick={() => setShowLangDropdown(!showLangDropdown)}>
            {language === "sv" ? "Svenska" : language === "no" ? "Norsk Bokmål" : "English"}
            <img src={flagMap[language]} alt="Flag" className="flag" />
          </div>
          {showLangDropdown && (
            <div className="lang-menu">
              <div
                onClick={() => {
                  changeLanguage("sv");
                  setShowLangDropdown(false);
                }}
                className={`lang-item ${language === "sv" ? "active" : ""}`}>
                Svenska <img src={flagMap["sv"]} alt="Swedish" className="flag" />
              </div>
              <div
                onClick={() => {
                  changeLanguage("en");
                  setShowLangDropdown(false);
                }}
                className={`lang-item ${language === "en" ? "active" : ""}`}>
                English <img src={flagMap["en"]} alt="English" className="flag" />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-body">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <h4 className="menu-title">Menu</h4>
          <ul>
            <li><FileText /> {content.nav.nav_invoices}</li>
            <li><Users /> {content.nav.nav_customers}</li>
            <li><Briefcase /> {content.nav.nav_my_business}</li>
            <li><Book /> {content.nav.nav_invoice_journal}</li>
            <li className="active">
              <span className="green-dot"></span>
              <Tag /> {content.nav.nav_price_list}
            </li>
            <li><Layers /> {content.nav.nav_multiple_invoicing}</li>
            <li><XCircle /> {content.nav.nav_unpaid_invoices}</li>
            <li><FilePlus /> {content.nav.nav_offer}</li>
            <li><Package /> {content.nav.nav_inventory_control}</li>
            <li><Users2 /> {content.nav.nav_member_invoicing}</li>
            <li><Upload /> {content.nav.nav_import_export}</li>
            <li><LogOut /> {content.nav.nav_logout}</li>
          </ul>
        </aside>

        {(isMobile || isTablet) && sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
        )}

        <main className="main-content">
          <div className="search-section">
            <div className={`search-fields ${isMobile ? 'mobile' : ''}`}>
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search Article No..."
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}/>
                <Search size={16} />
              </div>
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}/>
                <Search size={16} />
              </div>
            </div>

            <div className={`action-buttons ${isMobile ? 'mobile' : ''}`}>
              <button className="btn green" title={content.actions.button_new_product}>
                <div className="plus-circle"><Plus size={16} color="#fff" /></div>
                {!isMobile && !isTablet && content.actions.button_new_product}
              </button>
              <button className="btn blue" title={content.actions.button_print_list}>
                <Printer size={16} color="#0076d9" />
                {!isMobile && !isTablet && content.actions.button_print_list}
              </button>
              <button className="btn gray" title="Advanced mode">
                <Pin size={16} color="#0076d9" />
                {!isMobile && !isTablet && "Advanced mode"}
              </button>
            </div>
          </div>

          <div className="product-table">
            <table>
              <thead>
                <tr>
                  {!isMobile && <th></th>}
                  {!isMobile && (
                    <th onClick={() => handleSort("article_no")} className="sortable">
                      {content.table.col_article_no}
                      {sortConfig.key === "article_no" ? (
                        sortConfig.direction === "asc" ? (
                          <MoveUp size={14} color="#0076d9" />
                        ) : (
                          <MoveDown size={14} color="#0076d9" />
                        )
                      ) : (
                        <MoveDown size={14} color="#0076d9" opacity={0.4} />
                      )}
                    </th>
                  )}

                  <th onClick={() => handleSort("item_name")} className="sortable">
                    {content.table.col_product_service}
                    {sortConfig.key === "item_name" ? (
                      sortConfig.direction === "asc" ? (
                        <MoveUp size={14} color="#00b050" />
                      ) : (
                        <MoveDown size={14} color="#00b050" />
                      )
                    ) : (
                      <MoveDown size={14} color="#00b050" opacity={0.4} />
                    )}
                  </th>

                  {!isTablet  && <th>{content.table.col_in_price}</th>}
                  {!isMobile && <th>{content.table.col_out_price}</th>}
                  {!isMobile && <th>{content.table.col_unit}</th>}
                  {!isMobile && <th>{content.table.col_in_stock}</th>}
                  {!isTablet && !isMobile && <th>{content.table.col_description}</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, index) => (
                  <tr key={p.id}>
                    {!isMobile && <td>{index === filtered.length - 1 && <MoveRight size={20} color="#003366" />}</td>}
                    {!isMobile && <td><span className="pill">{p.article_no}</span></td>}
                    <td>
                      <span className={`pill ${isMobile ? 'mobile' : ''}`}>
                        {isMobile && p.item_name.length > 30 ? `${p.item_name.substring(0, 30)}...` : p.item_name}
                      </span>
                    </td>
                    {!isTablet && !isMobile && <td><span className="pill">{p.in_price}</span></td>}
                    <td><span className="pill">{p.out_price}</span></td>
                    {!isMobile && <td><span className="pill">{p.unit}</span></td>}
                    {!isMobile && <td><span className="pill">{p.in_stock}</span></td>}
                    {!isTablet && !isMobile && <td><span className="pill desc">{p.description}</span></td>}
                    <td><Ellipsis /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;