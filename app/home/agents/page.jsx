"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";
import { baseurl } from "../../Api";
import Loading from "@/app/Components/Loading";
import { Helmet } from "react-helmet";

const orders = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

  const columns = [
    {
      name: "الصورة",
      selector: (row) => <img src={row.image} className="h-24" />,
    },
    {
      name: "الملاحظات",
      selector: (row) => row.note,
    },
    {
      name: "رقم الموبايل",
      selector: (row) => row.phone,
    },
    {
      name: "العنوان",
      selector: (row) => row.address,
    },
    {
      name: "اسم الوكيل",
      selector: (row) => row.name,
    },
  ];

  useEffect(() => {

    ordersData();
  }, []);
  const ordersData = () => {
    axios.get(`${baseurl}/agents`).then((response) => {
      setData(response.data.agents);
      setFilter(response.data.agents);
      setIsLoading(false);
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
    <div
      className={`${
        isDark === true ? `bg-[#23233C] text-[#D6D6DB]` : ""
      } h-screen`}
    >
      <Helmet>
      <title>Agents</title>
      </Helmet>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className="max-w-[1280px] m-auto">
          <div className="py-4"></div>
          <div className="w-full py-3 text-center bg-[#444D5D] rounded-md text-white text-xl">
            {" "}
            الــوكـلاء{" "}
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
          />
        </div>
      )}
    </div>
  );
};

export default orders;
