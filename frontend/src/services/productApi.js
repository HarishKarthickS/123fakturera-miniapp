import api from "./api";
export const getProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err.response?.data || { message: "Unable to fetch products" };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    throw err.response?.data || { message: "Unable to fetch product" };
  }
};

export const createProduct = async (data) => {
  try {
    const res = await api.post("/products", data);
    return res.data;
  } catch (err) {
    console.error("Failed to create product:", err);
    throw err.response?.data || { message: "Unable to create product" };
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Failed to update product:", err);
    throw err.response?.data || { message: "Unable to update product" };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw err.response?.data || { message: "Unable to delete product" };
  }
};
