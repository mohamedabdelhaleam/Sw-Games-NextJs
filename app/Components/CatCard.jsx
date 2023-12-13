"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CatCard = ({image,name ,id}) => {
    const router = useRouter()
    const [isDark, setIsDark] = useState(true);
  return (
    
    <div
    className="text-center shadow-md w-[290px] h-[290px] flex justify-between relative cat-card items-center flex-col font-bold text-lg rounded-md overflow-hidden cursor-pointer hover:scale-110 ease-in-out duration-500
    "
    onClick={(e) => {
      router.push(`/home/categories/games?category=${id}`)
    }}
  >
    <div className=" h-[199px] w-[144px] rounded-xl absolute top-[46px] overflow-hidden">
      <img src={image} alt="" srcset="" className="" />
    </div>
    <div
      className={`${
        isDark === true ? "text-white" : "text-[#000062]"
      } absolute  bottom-0 py-0`}
    >
      {name}
    </div>
  </div>
  )
}

export default CatCard
