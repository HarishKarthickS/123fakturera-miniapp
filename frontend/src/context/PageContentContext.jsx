import React,{ createContext, useContext, useState, useEffect } from "react";
import { getPageContent, getLanguage, setLanguage } from "../services/pageContentApi";
const PageContentContext = createContext();

export const PageContentProvider = ({ children }) => {
  const [language, setLang] = useState(getLanguage());
  const [content, setContent] = useState(null);
  const [pageSlug, setPageSlug] = useState(null);
  const fetchContent = async (slug = pageSlug || "home", lang = language) => {
    try {
      const data = await getPageContent(slug, lang);
      if (data.success) setContent(data.content);
    } catch (err) {
      console.error("Failed to fetch page content:", err);
    }
  };
  const changeLanguage = (lang) => {
    setLang(lang);
    setLanguage(lang);
  };
  useEffect(() => {
    if (pageSlug) fetchContent(pageSlug, language);
  }, [language, pageSlug]);

  return (
    <PageContentContext.Provider
      value={{language,changeLanguage,content,fetchContent,setPageSlug}}>
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => useContext(PageContentContext);