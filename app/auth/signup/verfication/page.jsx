"use client";
import { baseurl } from "@/app/Api";
import Response from "@/app/Components/Response";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Image from "next/image";

export const metadata = {
  title: "Exellans Register",
  description: "Exellans For Charge Games",
};

const page = () => {
  const [code, setCode] = useState(0);
  const router = useRouter();
  const [requestResponse, setRequestRespone] = useState({});
  const [isDark, setIsDark] = useState(true);
  const data = {
    code: code,
  };
  const SignupVerfication = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/users/completRegister`, data, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        router.push("/");
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
          />{" "}
          <form action="" className="w-full text-center">
            <br />
            <br />
            {requestResponse.message ? (
              <Response message={requestResponse.msg} type={true} />
            ) : (
              ""
            )}
            <br />
            <div className="w-full">
              <input
                type="number"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="أدخل الكود"
                minLength={4}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <br />
            <button
              className="h-12 rounded-full shadow-md w-3/4 text-lg font-medium bg-[#000062] text-white"
              onClick={SignupVerfication}
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
