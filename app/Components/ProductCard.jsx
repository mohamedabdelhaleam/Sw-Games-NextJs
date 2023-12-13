"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMoneyBill } from "react-icons/fa";

const ProductCard = ({ name, game, cat, image, id, price }) => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className="w-[226px] h-[250px] overflow-hidden cursor-pointer hover:scale-110 ease-in-out duration-500"
      onClick={(e) => {
        router.push(`/home/buy-services?service=${id}&game=${game}&cat=${cat}`);
      }}
    >
      <div
        key={id}
        className="text-center shadow-md w-[226px] h-[226px] flex justify-between relative product-card items-center flex-col font-bold text-lg rounded-md overflow-hidden "
      >
        <div className=" h-[150px] w-[109px] rounded-xl absolute top-[46px] overflow-hidden">
          <img src={image} alt="" srcset="" className="" />
        </div>
        <div className="text-white w-[80%] absolute bottom-0 my-0 m-auto">
          {name}
        </div>
      </div>
      <div className="w-full flex justify-center py-1 items-center">
        <div
          className={` ${
            isDark === true ? `text-white` : `text-[#000062]`
          } flex gap-2 items-center text-sm`}
        >
          {price}
          <FaMoneyBill color="green" size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

{
  /* <div
  className="text-center shadow-md w-[290px] h-[290px] flex justify-between relative games-card items-center flex-col font-bold text-lg rounded-md overflow-hidden cursor-pointer hover:scale-110 ease-in-out duration-500
      "
  onClick={(e) => {
    router.push(`/home/categories/games?category=${id}`);
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
</div>; */
}
