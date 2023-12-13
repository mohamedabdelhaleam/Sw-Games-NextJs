"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../Api";
import Loading from "@/app/Components/Loading";

const profile = () => {
  const [userData, setUserData] = useState({});
  const [mobile, setMobile] = useState(userData.mobile);
  const [name, setName] = useState(userData.name);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(userData.email);
  const [image, setImage] = useState(userData.image);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    axios
      .get(`${baseurl}/user`, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseurl}/users/updatedata`,
        {
          name: name || userData.name,
          email: email || userData.email,
          phone: mobile || userData.mobile,
          profile: userData.image,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.msg);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-[calc(100vh-64px)]`}
    >
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className="max-w-[1280px] m-auto">
          <div className="py-4"></div>
          <div
            className={`${
              isDark === true ? `bg-[#0F0D26]` : `bg-[#21A3E5]`
            } text-white text-lg font-medium text-center w-full py-3 rounded-md`}
          >
            {" "}
            تعديل بيانات الصفحة الشخصية
          </div>
          <div className="w-full flex justify-center my-0">
            <div className=" rounded-md px-8 py-6 w-[70%] sm:w-[90%]">
              <div className="w-full">
                <form action="" className="text-right my-6 w-full rounded-md border-2 py-3 pb-5 px-4 border-[#0F0D26]">
                  <br />
                  <div className="py-2"></div>
                  <label htmlFor="name" className="mx-8">
                    اسم المستخدم
                  </label>
                  <br />
                  <div className="py-2"></div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={userData.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className={`${
                      isDark === true
                        ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                        : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                    } h-10 rounded-full w-full text-right px-8 placeholder:font-normal`}
                  />
                  <br />
                  <div className="py-2"></div>
                  <label htmlFor="email" className="mx-8">
                    البريد الإلكتروني
                  </label>
                  <br />
                  <div className="py-2"></div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={userData.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className={`${
                      isDark === true
                        ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                        : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                    } h-10 rounded-full w-full text-right px-8 placeholder:font-normal`}
                  />
                  <br />
                  <div className="py-2"></div>
                  <label htmlFor="phone" className="mx-8">
                    رقم الموبايل
                  </label>
                  <br />
                  <div className="py-2"></div>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={userData.mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    className={`${
                      isDark === true
                        ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                        : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                    } h-10 rounded-full w-full text-right px-8 placeholder:font-normal`}
                  />
                  <br />
                  <br />
                  <button
                    className={`bg-[#090931] w-full rounded-full py-2 text-center text-lg font-medium text-white`}
                    onClick={handleUpdate}
                  >
                    تعديل البيانات
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default profile;
