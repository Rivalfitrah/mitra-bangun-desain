import axios from "axios";

const api = axios.create({
  baseURL: "/api", // sesuaikan dengan base URL API Anda
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function register( email, password, confirmPassword ) {
  try {
    const response = await api.post("/auth/register", {
      email,
      password,
      confirmPassword,
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

export async function detailProfil({ userId, nama, phone, alamat, role, image }) {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("nama", nama);
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

export async function approveUser(userId) {
  try {
    const response = await api.post(`/admin/users/${userId}/approved`);
    return response.data;
  } catch (error) {
    console.error("gagal approve user:", error);
    throw error;
  }
}

export async function rejectUser(userId) {
  try {
    const response = await api.post(`/admin/users/${userId}/rejected`);
    return response.data;
  } catch (error) {
    console.error("gagal reject user:", error);
    throw error;
  }
}

export async function removeBackground(file) {
  try {
    console.log("Sending file to remove background API:", file.name, file.type, file.size);
    
    const formData = new FormData();
    formData.append("image_file", file); // Fixed: use "image_file" to match backend

    const response = await api.post("/removebg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log("Remove background response:", response.data);
    return response.data;
  } catch (error) {
    console.error("gagal menghapus background:", error.response?.data || error);
    throw error;
  }
}

// Upload tanda tangan ke Cloudinary
export async function uploadSignature({ file, userId, type = 'manual' }) {
  try {
    const formData = new FormData();
    
    if (typeof file === 'string' && file.startsWith('data:image/')) {
      // Untuk canvas signature (data URL)
      formData.append('signature', file);
      formData.append('type', 'manual');
    } else if (file instanceof File) {
      // Untuk file upload
      formData.append('signature', file);
      formData.append('type', 'upload');
    } else {
      throw new Error('Format file tidak valid');
    }
    
    if (userId) {
      formData.append('userId', userId);
    }
    
    formData.append('type', type);

    const response = await api.post("/signature/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("gagal upload tanda tangan:", error);
    throw error;
  }
}

// Hapus tanda tangan dari Cloudinary
export async function deleteSignature(publicId) {
  try {
    const response = await api.delete(`/signature/upload?publicId=${publicId}`);
    return response.data;
  } catch (error) {
    console.error("gagal hapus tanda tangan:", error);
    throw error;
  }
}

