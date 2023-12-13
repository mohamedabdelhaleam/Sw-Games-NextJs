"use client";
import { baseurl } from "@/app/Api";
import GamesCard from "@/app/Components/GamesCard";
import Loading from "../../../Components/Loading";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const params = useSearchParams()
  const category_id = params.get("category")
  useEffect(() => {
    axios
      .get(`${baseurl}/allgames?categori_id=${category_id}`)
      .then((response) => {
        setCats(response.data.games);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } min-h-[calc(100vh-64px)]`}
    >
      {loading === true ? (
        <Loading />
      ) : (
        <div className="m-auto max-w-[1280px]">
          <div className="py-8"></div>
          <header className="w-full bg-[#343457] rounded-lg header h-[300px]"></header>
          <hr className="w-full hr-text m-auto my-8" data-content="Category" />
          <div className="flex justify-evenly items-center justify-items-center flex-row-reverse gap-8 flex-wrap">
            {cats.map((cat) => (
              <GamesCard
                game_id={cat.id}
                cat_id={category_id}
                name={cat.name}
                image={cat.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
