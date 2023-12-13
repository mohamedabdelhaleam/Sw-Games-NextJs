"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { baseurl } from "./Api";
import CatCard from "./Components/CatCard";
import axios from "axios";
import Loading from "./Components/Loading";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter()
  useEffect(() => {
    const tokenNotFound = !localStorage.getItem("userToken");
    console.log(tokenNotFound);

    // If token is not found, redirect to the login page
    if (tokenNotFound) {
      router.push("/auth/login");
    }
    axios.get(`${baseurl}/categories`).then((response) => {
      setCats(response.data.cats);
      setIsLoading(false);
    });
  }, []);
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } min-h-screen`}
    >
      <Helmet>
        <title>SW-GAMES | Home</title>
      </Helmet>
      <Navbar />
      {isLoading === true ? (
        <Loading />
      ) : (
        <div>
          <div className="m-auto max-w-[1280px]">
            <div className="py-8"></div>
            <header className="w-full bg-[#343457df] rounded-lg h-[300px] xs:w-[90%] xs:mx-auto header"></header>
            <hr
              className="w-full hr-text m-auto my-8"
              data-content="Category"
            />
          </div>
          <div className="m-auto max-w-[1280px]">
            <div className="flex justify-evenly items-center justify-items-center flex-row-reverse gap-8 flex-wrap">
              {cats.map((cat) => (
                <CatCard id={cat.id} name={cat.name} image={cat.image} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
