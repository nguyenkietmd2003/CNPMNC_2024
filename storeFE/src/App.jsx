import React, { useState } from "react";
import { Spin } from "antd";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import CarouselComponent from "./components/Banner/banner";
const App = () => {
  const { setAuth } = useContext(AuthContext);
  //
  const getInfo = localStorage.getItem("info");
  //

  const infoData = getInfo ? JSON.parse(getInfo) : null;

  useEffect(() => {
    const updateAuthAndFetchCart = async () => {
      if (infoData) {
        await setAuth({
          isAuthenticated: true,
          user: {
            id: infoData?.data?.id ?? 0,
            email: infoData?.data?.email ?? "",
            name: infoData?.data?.name ?? "",
          },
        });
        // fetchCart(); // Gọi sau khi setAuth hoàn thành
      } else {
        setAuth({
          isAuthenticated: false,
          user: {
            id: 0,
            email: "",
            name: "",
          },
        });
      }
    };

    // Chỉ gọi một lần khi component được mount
    updateAuthAndFetchCart();
  }, []); // Không có dependency nào khác, nên useEffect chỉ chạy một lần

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <div
          className="bg-orange-600"
          style={{ paddingLeft: "15%", paddingRight: "15%" }}
        >
          <CarouselComponent />
          <Header />
          <div className="h-16 w-full bg-slate-30 flex pt-4 justify-between">
            <CategoryDropDownComponent style={{ width: "20%" }} />
            <SearchComponent style={{ width: "60%" }} />
            <CartComponent />
          </div>
        </div>
      </div>
      <div
        className="flex-grow overflow-y-auto"
        style={{
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <Outlet />
      </div>
      <div className="w-full flex justify-center items-center bg-slate-200 h-24">
        <Footer />
      </div>
    </div>
  );
};

export default App;
