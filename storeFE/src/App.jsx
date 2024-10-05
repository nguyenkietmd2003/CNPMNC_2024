import React, { useState } from "react";
import { Spin } from "antd";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import CarouselComponent from "./components/Banner/banner";
const App = () => {
  return (
    <div className="">
      <></>
      <div
        className=" bg-orange-600 "
        style={{ paddingLeft: "15%", paddingRight: "15%" }}
      >
        <CarouselComponent />
        <Header />
      </div>
      <div
        style={{
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <Outlet />
      </div>
      <div className="w-full flex justify-center items-center bg-slate-400 h-24 absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
};
export default App;
