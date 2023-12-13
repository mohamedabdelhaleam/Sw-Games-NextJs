"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../Api";
import Response from "../../Components/Response";
import Logo from "../../assets/logo.png";
import Image from "next/image";

export const metadata = {
  title: "Exellans Login",
  description: "Exellans For Charge Games",
};

const page = () => {
  const [email, setEmail] = useState("");
  const [requestResponse, setRequestResponse] = useState({});
  const [password, setPassword] = useState("");
  const [isToken, setIsToken] = useState();
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const tokenNotFound = !localStorage.getItem("userToken");
    setIsToken(!tokenNotFound);
    if (!tokenNotFound) {
      router.push("/");
    }
  });
  const loginRequest = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        window.localStorage.setItem("userToken", response.data.token);
        window.localStorage.setItem("userName", response.data.data.name);
        router.push("/");
      })
      .catch((error) => {
        setRequestResponse(error.response.data);
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
          <form action="" className="w-full text-center" method="POST">
            <br />
            <br />
            {requestResponse.message ? (
              <Response message={requestResponse.message} type={true} />
            ) : (
              ""
            )}
            <div className="w-full">
              <input
                type="text"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="البريد الإلكتروني"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button
              className="h-12 rounded-full w-3/4 text-lg font-medium bg-[#090931] text-white disabled:bg-white disabled:border-2 disabled:border-[#090931] disabled:cursor-not-allowed disabled:text-[#000062]"
              onClick={loginRequest}
            >
              تسجيل الدخول
            </button>
            <br />
            <br />
            <div className="w-full justify-items-center flex justify-center">
              <div className="flex justify-between items-center w-3/4 flex-row-reverse">
                <Link href="/auth/reset-password">
                  <div className="cursor-pointer">هل نسيت كلمة السر ؟</div>
                </Link>
                <Link href="/auth/signup">
                  <div className="cursor-pointer">تسجيل حساب جديد</div>
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
