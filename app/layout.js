"use client";
import { Suspense, useEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exellans",
  description: "Exellans For Charge Games",
};

export default function RootLayout({ children }) {
  // const router = useRouter();
  // useEffect(() => {
  //   const tokenNotFound = !localStorage.getItem("userToken");
  //   console.log(tokenNotFound);

  //   // If token is not found, redirect to the login page
  //   if (tokenNotFound) {
  //     router.push("/auth/login");
  //   }
  // });
  return (
    <html lang="ar">
      <body className={inter.className}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
