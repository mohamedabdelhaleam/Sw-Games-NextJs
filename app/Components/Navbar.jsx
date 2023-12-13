"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMenuFold,
  AiFillHome,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { MdNotificationsActive, MdSecurity, MdGroups } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  BsPersonFill,
  BsFillInfoCircleFill,
  BsTranslate,
  BsFacebook,
} from "react-icons/bs";
import { FaMoneyBill, FaUserAlt } from "react-icons/fa";
import {
  FaMoneyBillTrendUp,
  FaMoneyBillTransfer,
  FaCartShopping,
  FaTelegram,
} from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { baseurl } from "../Api";

function Navbar() {
  const [isMenu, setIsMenu] = useState(false);
  const [token, setToken] = useState();
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const pathName = usePathname("");
  const [isDark, setIsDark] = useState(true);
  const navLink = [
    {
      name: "الصفحة الرئيسية",
      link: "/",
      icon: <AiFillHome size={20} color="green" />,
    },
    {
      name: "إضافة رصيد",
      link: "/home/charge",
      icon: <FaMoneyBillTrendUp size={20} color="blue" />,
    },
    {
      name: "دفعاتي",
      link: "/home/charge/history",
      icon: <FaMoneyBillTransfer size={20} color="blue" />,
    },
    {
      name: "طلباتي",
      link: "/home/orders",
      icon: <FaCartShopping size={20} color="brown" />,
    },
    {
      name: "الوكلاء",
      link: "/home/agents",
      icon: <MdGroups size={20} color="brown" />,
    },
    {
      name: "الحماية",
      link: "/home/security",
      icon: <MdSecurity size={20} color="red" />,
    },
    {
      name: "من نحن",
      link: "/home/about-us",
      icon: <BsFillInfoCircleFill size={20} color="orange" />,
    },
  ];
  const toggleDrawer = (e) => {
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
    axios
      .get(`${baseurl}/user`, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, [token]);

  const personHandle = (e) => {
    if (token) {
      router.push("/home/profile");
    } else {
      router.push("/auth/login");
    }
  };
  const logOut = (e) => {
    window.localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <div>
      <div className={`${
            isDark === true ? `bg-[#343457df]` : "bg-[#21A3E5]"
          } `}>
        <div
          className={`${
            isDark === true ? `bg-[#343457df]` : "bg-[#21A3E5]"
          } w-full shadow-lg`}
        >
          <nav className="py-2 px-8 flex justify-between items-center">
            <div className="logo bg-white w-12 h-12 rounded-full"></div>
            <div className="text-white font-semibold text-2xl sm:hidden md:hidden">SW-GAMES</div>
            <div className="flex justify-between items-center gap-6">
              <MdNotificationsActive color="white" size={30} />
              <BsPersonFill
                color="white"
                size={30}
                className="cursor-pointer"
                onClick={personHandle}
              />
              <div className="flex justify-between items-center gap-2">
                <FaMoneyBill color="white" size={30} />
                <div className="text-white text-lg font-medium">{`${
                  parseInt(userData.balance) || 0
                } $`}</div>
              </div>
              <AiOutlineMenuFold
                color="white"
                size={30}
                onClick={toggleDrawer}
                className="cursor-pointer"
              />
            </div>
          </nav>
        </div>
        <div
          className={`${
            isMenu
              ? `right-0 top-0 w-80 px-2 shadow-xl border-l-2 border-[#34343425] z-50 h-full fixed transition-all duration-5000 ease-in-out`
              : `-right-80 top-0 w-72 shadow-md z-50 h-full fixed transition-all duration-150 ease-in-out`
          }
              ${isDark === true ? "bg-[#343457] text-white" : ""}`}
        >
          <div>
            <div className="py-4 px-4">
              <AiOutlineMenuUnfold
                color="blue"
                size={30}
                onClick={toggleDrawer}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-center flex-col items-center gap-8 mb-5">
              <div className="w-16 h-16 rounded-full bg-[#21A3E5] overflow-hidden">
                <img
                  src={userData.image || ""}
                  alt=""
                  srcset=""
                  className="w-full h-full"
                />
              </div>
              <div className="text-xl font-medium uppercase text-[#21A3E5]">
                {userData.name || ""}
              </div>
              <div className="flex justify-between flex-row-reverse items-center w-full px-4">
                <Link href="/">
                  <AiFillHome size={28} className="cursor-pointer" />
                </Link>
                <Link href="/home/profile">
                  <FaUserAlt size={28} className="cursor-pointer" />
                </Link>
                <BiLogOut
                  size={28}
                  onClick={logOut}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <hr />
            <div className="my-4">
              <ul className="flex justify-around gap-2 items-start flex-col text-white w-full text-right text-lg font-medium">
                {navLink.map((path) => (
                  <li
                    key={path.name}
                    className={` ${
                      pathName === path.link ? "bg-[#21A3E5] text-white " : " "
                    } ${isDark === true ? "text-white" :"text-black"} text-right w-full hover:bg-[#e8e8e8be] cursor-pointer text-base font-medium rounded-md py-3 px-4 flex justify-end items-center gap-8`}
                  >
                    <Link className="w-full" href={path.link}>
                      {path.name}
                    </Link>{" "}
                    {path.icon}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="my-4 flex justify-around gap-4">
              <div className="flex justify-center items-center flex-col cursor-pointer">
                <BsTranslate size={25} color="#21A3E5" />
                <div>English</div>
              </div>
              <div className="flex justify-center items-center flex-col cursor-pointer">
                <BsTranslate size={25} color="#21A3E5" />
                <div>العربية</div>
              </div>
            </div>
            <hr />
            <div className="flex justify-evenly items-center my-4">
              <BsFacebook size={30} color="blue" />
              <IoLogoWhatsapp size={35} color="green" />
              <FaTelegram size={30} color="blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
