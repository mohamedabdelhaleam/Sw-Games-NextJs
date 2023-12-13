"use client";
import React, { Suspense, useEffect } from "react";
import Categories from "../Components/Categories";
import MainLayout from "./layout";

const Home = () => {
  return (
    <MainLayout>
      <div className="m-auto max-w-[1280px]">
        <header className="w-full bg-[#343457df] rounded-lg my-16 h-[300px] xs:w-[90%] xs:mx-auto"></header>
        <hr className="w-full hr-text m-auto my-16" data-content="Category" />
      </div>
      <Suspense>
        <Categories />
      </Suspense>
    </MainLayout>
  );
};

export default Home;
