"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import Response from "../../Components/Response";
import { baseurl } from "../../Api";

const buyServices = () => {
  const params = useSearchParams();
  const [gamesInfo, setGamesInfo] = useState({});
  const [gamerId, setGamerId] = useState("");
  const [gamerName, setGamerName] = useState({});
  const router = useRouter();
  const [gameDetails, setGameDetails] = useState([]);
  const [oneGameDetail, setOneGameDetails] = useState({});
  const service_id = params.get("service");
  const game_id = params.get("game");
  const cat_id = params.get("cat");
  const [userName, setUserName] = useState();
  const [request, setRequest] = useState(false);
  const [requestResponse, setRequestResponse] = useState({});
  const [isDark, setIsDark] = useState(true);
  const data = {
    game_id: game_id,
    service_id: service_id,
    gamer_id: gamerId,
    username: userName,
  };
  useEffect(() => {
    const tokenNotFound = !localStorage.getItem("userToken");
    console.log(tokenNotFound);
    // If token is not found, redirect to the login page
    if (tokenNotFound) {
      router.push("/auth/login");
    }
    setUserName(window.localStorage.getItem("userName"));
    axios.get(`${baseurl}/game?game_id=${game_id}`).then((response) => {
      setGamesInfo(response.data.games);
    });
    if (gamesInfo.query === "1") {
      axios
        .get(`${baseurl}/game/${game_id}/${gamerId}`)
        .then((response) => {
          if (response.data.err === false) {
            setGamerName(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    axios
      .get(`${baseurl}/products?game_id=${game_id}&categori_id=${cat_id}`)
      .then((response) => {
        function getOneGame(gamesList) {
          return (gamesList.id = service_id);
        }
        setOneGameDetails(response.data.services.find(getOneGame));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gamerId]);
  console.log(oneGameDetail);
  const requesrOrder = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/games/requestorder`, data, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setRequestResponse(response.data);
        setRequest(true);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-[calc(100vh-64px)]`}
    >
      <div className="max-w-[1280px] m-auto flex flex-col">
        {requestResponse.message === undefined ? (
          ""
        ) : (
          <Response
            message={requestResponse.message}
            type={requestResponse.err}
          />
        )}
        {gamesInfo.id_faild === "1" ? (
          <form action="" className="w-full text-center" method="POST">
            <br />
            <div className="w-full flex justify-evenly items-evenly ">
              <div
                className={`${
                  isDark === true
                    ? `bg-[#34344B] text-white`
                    : `bg-[rgba(0,0,0,.06)] text-[#34344B]`
                }  font-medium text-center rounded-full w-1/4 px-2 h-8 flex justify-center items-center gap-2`}
              >
                {oneGameDetail.price} <FaMoneyBill color="green" size={20} />
              </div>
              <div
                className={`${
                  isDark === true
                    ? `bg-[#34344B] text-white`
                    : `bg-[rgba(0,0,0,.06)] text-[#34344B]`
                }  font-medium text-center rounded-full w-1/4 px-2 h-8 flex justify-center items-center gap-2`}
              >
                {oneGameDetail.name}
              </div>
            </div>
            <br />
            <div className="w-full">
              <input
                type="text"
                className={`${
                  isDark === true
                    ? `bg-[#34344B] placeholder:text-[#DDDCE0] text-[#DDDCE0]`
                    : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)] text-[rgba(0,0,0,.6)]`
                } h-10 rounded-full w-3/4 text-center px-8 font-medium placeholder:font-normal`}
                placeholder="أدخل  الأيدي"
                onChange={(e) => setGamerId(e.target.value)}
              />
            </div>
            <br />
            {gamesInfo.query === "1" ? (
              <div className="w-full flex justify-center items-center">
                <div
                  className={`${
                    isDark === true
                      ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                      : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                  } h-10 rounded-full w-3/4 text-center text-white px-8 placeholder:font-normal`}
                >
                  {gamerName.result}
                </div>
              </div>
            ) : undefined}
            <br />
            <button
              className="h-12 rounded-full w-3/4 text-lg font-medium bg-[#090931] text-white disabled:bg-white disabled:border-2 disabled:border-[#090931] disabled:cursor-not-allowed disabled:text-[#000062]"
              onClick={requesrOrder}
              disabled={gamerId.length <= 5 || request === true}
            >
              شراء{" "}
            </button>
          </form>
        ) : undefined}
      </div>
    </div>
  );
};

export default buyServices;
