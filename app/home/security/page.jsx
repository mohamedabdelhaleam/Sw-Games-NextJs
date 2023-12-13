"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../../Api";
import Response from "../../Components/Response";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [requestResponse, setRequestResponse] = useState({});
  const [requestResponseAccept, setRequestResponseAccept] = useState({});
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isDark, setIsDark] = useState(true);
  const data = {
    current: currentPassword,
    password: newPassword,
    password_confirmation: confirmNewPassword,
  };
  const changePassword = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/users/updatepassword`, data, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        setRequestResponseAccept(response.data);
      })
      .catch((error) => {
        setRequestResponse(error.response.data);
      });
  };
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-[calc(100vh-64px)]`}
    >
      <div className="max-w-[1280px] h-screen m-auto justify-center flex">
        <div className="flex flex-col w-full">
          <form action="" className="w-full text-center" method="POST">
            <br />
            <br />
            {requestResponseAccept.status ? (
              <Response message={"تم تغير كلمة السر بنجاح"} type={false} />
            ) : requestResponse.message ? (
              <Response message={requestResponse.message} type={true} />
            ) : (
              ""
            )}
            <br />
            <div className="w-full">
              <input
                type="password"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-right px-8 placeholder:font-normal`}
                placeholder="كلمة السر الحالية"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="w-full">
              <input
                type="password"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-right px-8 placeholder:font-normal`}
                placeholder="كلمة السر الجديدة"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="w-full">
              <input
                type="password"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-right px-8 placeholder:font-normal`}
                placeholder="تأكيد كلمة السر الجديدة"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <br />
            <button
              className={`bg-[#090931] w-3/4 rounded-full py-2 text-center text-lg font-medium text-white`}
              onClick={changePassword}
            >
              تغير كلمة السر
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
