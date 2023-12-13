// components/Layout/MainLayout.js
"use client"
import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
  const router = useRouter()

  useEffect(()=>{
    const tokenNotFound = !localStorage.getItem("userToken");
    console.log(tokenNotFound);

    // If token is not found, redirect to the login page
    if (tokenNotFound) {
      router.push("/auth/login");
    }
  })
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
