import api from "./api";
const cache = {};

export const getPageContent = async (pageSlug, lang) => {
  const selectedLang = lang || localStorage.getItem("language") || "en";
  const cacheKey = `${pageSlug}_${selectedLang}`;
  if (cache[cacheKey]) return cache[cacheKey];
  try {
    const res = await api.get(`/pages/${pageSlug}/${selectedLang}`);
    cache[cacheKey] = res.data;
    return res.data;
  } catch (err) {
    console.error("Failed to load page content:", err);
    throw err.response?.data || { message: "Unable to fetch page content" };
  }
};

export const setLanguage = (lang) => {
  localStorage.setItem("language", lang);
};

export const getLanguage = () => {
  return localStorage.getItem("language") || "sv";
};
