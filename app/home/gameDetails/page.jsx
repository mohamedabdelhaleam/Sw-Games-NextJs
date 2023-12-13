"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import { baseurl } from "../../Api";
import Loading from "@/app/Components/Loading";
import { Helmet } from "react-helmet";

const GamePlans = () => {
  const [servicesList, setServicesList] = useState([]);
  const [gamesDetail, setGamesDetail] = useState({});
  const [isServiceLoading, setIsServiceLoading] = useState(true);
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const params = useSearchParams();
  const [isDark, setIsDark] = useState(true);
  const cat_id = params.get("category");
  const game_id = params.get("game");

  useEffect(() => {
    axios
      .get(`${baseurl}/products?game_id=${game_id}&categori_id=${cat_id}`)
      .then((response) => {
        setServicesList(response.data.services);
        setIsServiceLoading(false);
      });
    axios.get(`${baseurl}/game?game_id=${game_id}`).then((response) => {
      setGamesDetail(response.data.games);
      setIsGamesLoading(false);
    });
  }, []);

  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } min-h-[calc(100vh-64px)]`}
    >
      <Helmet>
        <title>SW-GAMES { ("| " + gamesDetail.name) || ""}</title>
      </Helmet>
      {" "}
      {isServiceLoading === true && isGamesLoading === true ? (
        <Loading />
      ) : (
        <div className="m-auto max-w-[1280px]">
          <div className="py-8"></div>
          <header className="w-full bg-[#343457] rounded-lg header h-[300px]"></header>
          <hr
            className="w-full hr-text m-auto my-8"
            data-content={gamesDetail.name}
          />

          <div className="flex justify-evenly items-center justify-items-center flex-row-reverse gap-8 flex-wrap">
            {servicesList.map((servic) => (
              <ProductCard
                name={servic.name}
                game={gamesDetail.id}
                image={gamesDetail.service_image}
                id={servic.id}
                price={servic.price}
                cat={cat_id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePlans;
