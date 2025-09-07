import axios from "axios";

const api = axios.create({
  baseURL: "/api", // sesuaikan dengan base URL API Anda
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function register(name, email, password) {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("gagal register:", error);
    throw error;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("gagal login:", error);
    throw error;
  }
}

export async function detailProfil({ userId, phone, alamat, role, image }) {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("phone", phone);
    formData.append("alamat", alamat);
    formData.append("role", role);

    if (image) {
      formData.append("image", image); // file dari input
    }

    const response = await api.post("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("gagal menyimpan detail profil:", error);
    throw error;
  }
}

export async function userLogin() {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("gagal mengambil data user:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await api.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error("gagal logout:", error);
    throw error;
  }
}

export async function userPending() {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("gagal mengambil user pending:", error);
    throw error;
  }
}
