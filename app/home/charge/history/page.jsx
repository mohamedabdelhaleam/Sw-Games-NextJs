"use client";
import { baseurl } from "@/app/Api";
import Loading from "@/app/Components/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";

const chargeHistory = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lastElement, setLastElement] = useState([]);
  const [isDark, setIsDark] = useState(true);
  const columns = [
    {
      name: "القيمة",
      selector: (row) => parseInt(row.amount),
    },
    {
      name: "الحالة",
      selector: (row) => row.status,
    },
    {
      name: "التاريخ",
      selector: (row) => row.created_at,
    },
    {
      name: "الدين",
      selector: (row) => "0",
    },
    {
      name: "الرصيد",
      selector: (row) => (
        <div>
          <div className="border-b-2 border-[#444D5D] ">
            {parseInt(row.balance_after)}
          </div>
          <div className="text-[#21A3E5]">{parseInt(row.balance_before)}</div>
        </div>
      ),
    },
    {
      name: "نوع العملية",
      selector: (row) => "balance",
    },
    {
      name: "رقم الفيش",
      selector: (row) => row.payment_number,
    },
  ];

  useEffect(() => {
    axios
      .get(`${baseurl}/users/payments`, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setData(response.data.data.data);
        setFilter(response.data.data.data);
        setLastElement(response.data.data.data.slice(0, 1));
        setIsLoading(false);
      });
  }, [search]);
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: `${isDark === true ? "#23233C" : "white"}`,
        color: `${isDark === true ? "white" : "#23233C"}`,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        textAlign: "center",
        backgroundColor: `${isDark === true ? "#23233C" : "white"}`,
        color: `${isDark === true ? "white" : "#23233C"}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        //border: "1px solid #21A3E5"
      },
    },
  };
  return (
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-screen`}
    >
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className="max-w-[1280px] m-auto">
          <Helmet>
            <title>Charge History</title>
          </Helmet>
          <div className="py-4"></div>
          <div className="w-full py-3 text-center bg-[#444D5D] rounded-md text-white text-xl">
            {" "}
            عمليات الرصيد{" "}
          </div>
          <div className=" mt-4 text-white flex justify-between items-center text-xl font-medium gap-6 flex-row-reverse text-center w-full py-3 rounded-t-md">
            <div className="w-1/3 bg-[#444D5D] h-16 rounded-full flex justify-center items-center">
              <div className="flex justify-evenly items-center w-full flex-row-reverse">
                <div>رصيدك الحالي</div>
                <div>
                  {parseInt(lastElement.map((res) => res.balance_after || 0))}
                </div>
              </div>
            </div>
            <div className="w-1/3 bg-[#444D5D] h-16 rounded-full flex justify-center items-center">
              <div className="flex justify-evenly items-center w-full flex-row-reverse">
                <div>عدد العمليات</div>
                <div>{filter.length || 0}</div>
              </div>
            </div>
            <div className="w-1/3 bg-[#444D5D] h-16 rounded-full flex justify-center items-center">
              <div className="flex justify-evenly items-center w-full flex-row-reverse">
                <div>قيمة أخر عملية</div>
                <div>
                  {parseInt(lastElement.map((res) => res.balance_before || 0))}
                </div>
              </div>
            </div>
          </div>

          <div className="my-4"></div>
          <DataTable
            columns={columns}
            data={filter}
            pagination={true}
            className="max-w-[1280px] text-center"
            customStyles={customStyles}
            fixedHeader
            subHeader
            subHeaderComponent={
              <div className="flex justify-between w-full items-center flex-row-reverse">
                <div className="text-xl">البحث عن عملية</div>
                <input
                  type="number"
                  className=" border-2 border-[#3c3c3c83] placeholder:text-center w-[80%] text-center rounded-md py-2 px-1 my-4"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="أدخل رقم الفيش"
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default chargeHistory;
