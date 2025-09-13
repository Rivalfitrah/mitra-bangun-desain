import axios from "axios";

const api = axios.create({
  baseURL: "/api", // sesuaikan dengan base URL API Anda
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// register
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

// login
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

// simpan detail profil
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

// ambil data user saat ini
export async function userLogin() {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("gagal mengambil data user:", error);
    throw error;
  }
}

// logout
export async function logoutUser() {
  try {
    const response = await api.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error("gagal logout:", error);
    throw error;
  }
}

// ambil data user pending (admin)
export async function userPending() {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("gagal mengambil user pending:", error);
    throw error;
  }
}

export async function userActive() {
  try {
    const response = await api.get("/user/active");
    return response.data;
  } catch (error) {
    console.error("gagal mengambil user aktif:", error);
    throw error;
  }
}

// approve user (admin)
export async function approveUser(userId) {
  try {
    const response = await api.post(`/admin/users/${userId}/approved`);
    return response.data;
  } catch (error) {
    console.error("gagal approve user:", error);
    throw error;
  }
}

// reject user (admin)
export async function rejectUser(userId) {
  try {
    const response = await api.post(`/admin/users/${userId}/rejected`);
    return response.data;
  } catch (error) {
    console.error("gagal reject user:", error);
    throw error;
  }
}

// hapus background gambar
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

// Ambil signature user saat ini
export async function getSignature() {
  try {
    const response = await api.get('/signature');
    return response.data;
  } catch (error) {
    console.error('gagal mengambil signature:', error);
    throw error;
  }
}

// Upload tanda tangan ke Cloudinary
export async function uploadSignature({ file, userId, type = 'manual' }) {
  try {
    const formData = new FormData();
    // Append signature content (can be data URL string or File)
    if (typeof file === 'string' && file.startsWith('data:image/')) {
      formData.append('signature', file);
    } else if (file instanceof File) {
      formData.append('signature', file);
    } else {
      throw new Error('Format file tidak valid');
    }

    if (userId) {
      formData.append('userId', userId);
    }

    // Always trust the caller-provided `type` ("manual" or "upload")
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
    // publicId param is no longer used; expect caller to pass type via query
    const response = await api.delete(`/signature/upload?type=${publicId}`);
    return response.data;
  } catch (error) {
    console.error("gagal hapus tanda tangan:", error);
    throw error;
  }
}

export async function uploadDocument({ file, title, customId, signers, docType }) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (customId) formData.append('customId', customId);
    if (docType) formData.append('docType', docType);
    // kirim daftar penandatangan sebagai JSON
    if (signers) {
      formData.append('signers', JSON.stringify(signers));
    }

    const response = await api.post('/document/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('gagal upload dokumen:', error.response?.data || error);
    throw error;
  }
}


// Ambil daftar dokumen
export async function getDocuments() {
  try {
    // ensure leading slash and correct singular 'document' to match server route
    const response = await api.get('/document/assigned');
    return response.data;
  } catch (error) {
    console.error('gagal mengambil dokumen:', error.response?.status, error.response?.data || error.message || error);
    throw error;
  }
}

export async function getUploadedDocuments() {
  try {
    // ensure leading slash and correct singular 'document' to match server route
    const response = await api.get('/document/diunggah');
    return response.data;
  } catch (error) {
    console.error('gagal mengambil dokumen yang diunggah:', error.response?.status, error.response?.data || error.message || error);
    throw error;
  }
}

// Ambil data semua dokumen
export async function getAllDocuments() {
  try {
    const response = await api.get('/document/jenis');
    return response.data;
  } catch (error) {
    console.error('gagal mengambil semua dokumen:', error.response?.data || error);
    throw error;
  }
}