"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { baseurl } from "../../Api";
import Loading from "@/app/Components/Loading";
import { Helmet } from "react-helmet";

const orders = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lastElement, setLastElement] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const dark = (dark)=>{
    if (dark === true) {
        return 'bg-[#23233c]'
    }
    else {
        return 'bg-[#21A3E5]'
    }
}


  const columns = [
    {
      name: "الملاحظات",
      selector: (row) => row.note,
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
      name: "السعر",
      selector: (row) => parseInt(row.price),
    },
    {
      name: "اللعبة",
      selector: (row) => (
        <div>
          <div className="border-b-2 border-[#444D5D] ">{row.game}</div>
          <div className="text-[#21A3E5]">{row.product}</div>
        </div>
      ),
    },
    {
      name: "الكود",
      selector: (row) => row.code,
    },
    {
      name: "رقم الفيش",
      selector: (row) => row.id,
    },
  ];

  useEffect(() => {
    ordersData();
  }, [search]);
  const ordersData = () => {
    axios
      .get(`${baseurl}/users/ordersbydate`, {
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
  };
  const searchById = (e) => {
    e.preventDefault();
    axios
      .get(`${baseurl}/users/orders?ordersid=[${search}]`, {
        headers: {
          Authorization: window.localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setFilter(response.data.data.data);
      });
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px", // override the cell padding for head cells
        paddingRight: "5px",
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
        paddingLeft: "1px", // override the cell padding for data cells
        paddingRight: "1px",
        textAlign: "center",
        backgroundColor: `${isDark === true ? "#23233C" : "white"}`,
        color: `${isDark === true ? "white" : "#23233C"}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "15px",
        //border: "1px solid #21A3E5"
      },
    },
  };
  return (
    <div className={`${
      isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
    } min-h-screen`}>
          <Helmet>
          <title>Orders</title>
          </Helmet>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={`max-w-[1280px] m-auto`}>
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
                  {parseInt(lastElement.map((res) => res.balance_after))}
                </div>
              </div>
            </div>
            <div className="w-1/3 bg-[#444D5D] h-16 rounded-full flex justify-center items-center">
              <div className="flex justify-evenly items-center w-full flex-row-reverse">
                <div>عدد العمليات</div>
                <div>{filter.length}</div>
              </div>
            </div>
            <div className="w-1/3 bg-[#444D5D] h-16 rounded-full flex justify-center items-center">
              <div className="flex justify-evenly items-center w-full flex-row-reverse">
                <div>قيمة أخر عملية</div>
                <div>{parseInt(lastElement.map((res) => res.price))}</div>
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
                <button
                  className="bg-[#444D5D] text-white text-lg font-bold rounded-md py-2 px-12"
                  onClick={searchById}
                >
                  بحث
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default orders;
