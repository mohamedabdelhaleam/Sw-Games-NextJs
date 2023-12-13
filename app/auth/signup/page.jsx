"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { baseurl } from "../../Api";
import { Helmet } from "react-helmet";
import Logo from "../../assets/logo.png";
import Image from "next/image";

export const metadata = {
  title: "Exellans Register",
  description: "Exellans For Charge Games",
};

const page = () => {
  const router = useRouter("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [requestResponse, setRequestRespone] = useState({});
  const [isDark, setIsDark] = useState(true);

  const Signup = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/register`, {
        name: userName,
        email: email,
        mobile: phone,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem("userToken", response.data.token);
        router.push("/auth/signup/verfication");
      })
      .catch((error) => {
        setRequestRespone(error.response.data);
      });
  };
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-screen`}
    >
      <div className="max-w-[1280px] h-screen m-auto justify-center items-center flex">
        <div className="flex justify-around items-center flex-col w-full">
          <Image
            src={Logo}
            className="bg-[#ffff] w-28 h-28 rounded-full overflow-hidden flex justify-center items-center"
          />
          <form action="" className="w-full text-center">
            <br />
            <br />
            {requestResponse.message ? (
              <Response message={requestResponse.message} type={true} />
            ) : (
              ""
            )}
            <br />
            <div className="w-full">
              <input
                type="text"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="اسم المستخدم"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <br />
            <div className="w-full">
              <input
                type="email"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="البريد الإلكتروني"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="w-full">
              <input
                type="text"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="رقم الموبايل"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <br />
            <div className="w-full">
              <input
                type="password"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="كلمة السر "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button
              className="h-12 rounded-full shadow-md w-3/4 text-lg font-medium bg-[#000062] text-white"
              onClick={Signup}
            >
              إنشاء حساب
            </button>
            <br />
            <br />
            <div className="w-full justify-items-center flex justify-center">
              <div className="flex justify-center items-center w-3/4 flex-row-reverse">
                <Link href="/auth/login">
                  <div className="cursor-pointer">تسجيل الدخول</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
