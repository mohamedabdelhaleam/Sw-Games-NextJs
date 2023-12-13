"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Response from "../../Components/Response";
import { baseurl } from "../../Api";
import Image from "next/image";
import Logo from "../../assets/logo.png";

const charge = () => {
  const [currencies, setCurrencies] = useState([]);
  const [requestResponse, setRequestResponse] = useState({});
  const [chargeValue, setChargeValue] = useState("");
  const [currenciesValue, setCurrenciesValue] = useState("");
  const [isDark, setIsDark] = useState(true);

  const [selectedOptionKey, setSelectedOptionKey] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseurl}/clients/currencies`, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setCurrencies(response.data.data.Currences);
      })
      .catch((error) => console.log(error));
  }, []);

  const allPrice = () => {
    return chargeValue * currenciesValue;
  };

  const chargeRequest = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append key-value pairs to the FormData object
    formData.append("amount", chargeValue);
    formData.append("currency_id", selectedOptionKey);
    axios
      .post(`${baseurl}/users/requestcredit`, formData, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setRequestResponse(response.data);
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
      <div>
        <div className="max-w-[1280px] m-auto px-2">
          <div className="py-4"></div>
          <div
            className={`${
              isDark === true ? `bg-[#0F0D26]` : `bg-[#21A3E5]`
            } text-white text-lg font-medium text-center w-full py-3 rounded-md`}
          >
            {" "}
            إتمام عملية طلب إضافة رصيد
          </div>
          <div className="w-full flex justify-center my-12">
            <div className=" rounded-md px-8 py-12 w-[70%] sm:w-[90%]">
              <div className="w-full">
                <form action="" method="post" className="text-center w-full">
                  <div className="w-full  flex justify-center items-center">
                    <Image
                      src={Logo}
                      className="bg-[#ffff] w-28 h-28 rounded-full overflow-hidden flex justify-center items-center"
                    />
                  </div>
                  <br />
                  {requestResponse.msg === undefined ? (
                    ""
                  ) : (
                    <Response
                      message={requestResponse.msg}
                      type={requestResponse.err}
                    />
                  )}
                  <br />
                  <input
                    type="text"
                    className={`${
                      isDark === true
                        ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                        : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                    } h-10 rounded-full w-full text-center px-8 placeholder:font-normal`}
                    placeholder="أدخل القيمة "
                    onChange={(e) => setChargeValue(e.target.value)}
                  />
                  <br />
                  <br />
                  <select
                    name=""
                    id="currencySelect"
                    className={`${
                      isDark === true
                        ? `bg-[#34344B] placeholder:text-[#DDDCE0]`
                        : `bg-[rgba(0,0,0,.06)] placeholder:text-[rgba(0,0,0,.6)]`
                    } h-10 rounded-full w-full text-center px-8 placeholder:font-normal`}
                    onChange={(e) => {
                      setCurrenciesValue(e.target.value);
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const aKey = selectedOption.getAttribute("a-key");
                      setSelectedOptionKey(aKey);
                    }}
                  >
                    <option value="0">أختر العملة</option>
                    {currencies.map((currence) => (
                      <option
                        key={currence.id}
                        a-key={currence.id}
                        value={currence.price}
                      >
                        {currence.name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <button
                    className={`bg-[#090931] w-full rounded-full py-2 text-center text-lg font-medium text-white`}
                    onClick={chargeRequest}
                  >
                    إرسال طلب
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default charge;
