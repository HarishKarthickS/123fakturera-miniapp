import api from "./api";

export const registerUser = async (data) => {
  try {
    const res = await api.post("/users/register", data);
    return res.data;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err.response?.data || { message: "Unable to register" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post("/users/login", data);
    const { user, tokens } = res.data;
    if (tokens?.accessToken && tokens?.refreshToken) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err.response?.data || { message: "Invalid credentials" };
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Missing refresh token");
    const res = await api.post("/users/refresh", { refresh_token: refreshToken });
    const { accessToken, refreshToken: newRefresh } = res.data.tokens || {};
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (newRefresh) localStorage.setItem("refreshToken", newRefresh);
    return res.data;
  } catch (err) {
    console.error("Token refresh failed:", err);
    throw err.response?.data || { message: "Unable to refresh token" };
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/users/logout");
  } catch (err) {
    console.warn("Logout request failed silently:", err);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get("/users");
    return res.data.user;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    throw err.response?.data || { message: "Unable to fetch profile" };
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await api.put("/users", data);
    if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    console.error("Profile update failed:", err);
    throw err.response?.data || { message: "Unable to update profile" };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("User deletion failed:", err);
    throw err.response?.data || { message: "Unable to delete user" };
  }
};
