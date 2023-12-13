"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GamesCard = ({ name, image, game_id, cat_id }) => {
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  return (
    <div
      className="text-center shadow-md w-[290px] h-[290px] flex justify-between relative games-card items-center flex-col font-bold text-lg rounded-md overflow-hidden cursor-pointer hover:scale-110 ease-in-out duration-500
      "
      onClick={(e) => {
        router.push(`/home/gameDetails?category=${cat_id}&game=${game_id}`);
      }}
    >
      <div className=" h-[199px] w-[144px] rounded-xl absolute top-[46px] overflow-hidden">
        <img src={image} alt="" srcset="" className="" />
      </div>
      <div
        className={`${
          isDark === true ? "text-white" : "text-[#000062]"
        } absolute  bottom-0 py-1`}
      >
        {name}
      </div>
    </div>
  );
};

export default GamesCard;
