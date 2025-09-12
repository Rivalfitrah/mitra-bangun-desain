'use client';
import React, { Children, useEffect, useState } from 'react'
import { Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { userLogin, logoutUser } from '@/lib/api';
import Swal from 'sweetalert2';


function HeaderDashboard({children}) {
  const router = useRouter();
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch user data from API or context
    const fetchUser = async () => {
      try {
        const userData = await userLogin();
        setUser(userData);
        console.log("Fetched user data:", userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: 'Apakah kamu ingin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, keluar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Kamu telah keluar.',
            icon: 'success',
            showConfirmButton: false,
          });
          localStorage.removeItem("userId");
          await logoutUser();
          router.push("/login");
        }
      });
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };



  return (
        <header className="flex justify-end items-center gap-4 mb-6">
            <button className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <Bell size={22} />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-full bg-[#243B83] hover:bg-blue-700">
              <LogOut size={22} />
            </button>
            <div onClick={() => router.push("/dashboard/profil")} className="flex items-center gap-2 cursor-pointer">
              {children}
            </div>
          </header>
  )
}

export default HeaderDashboard