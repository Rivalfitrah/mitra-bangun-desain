import axios from "axios";

const api = axios.create({
    baseURL: '/api', // sesuaikan dengan base URL API Anda
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export async function register (name, email, password) {
    try {
        const response = await api.post('/auth/register', {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("gagal register:", error);
        throw error;
    }
}

export async function login (email, password) {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("gagal login:", error);
        throw error;
    }
}