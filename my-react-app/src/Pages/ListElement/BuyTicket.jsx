import React from "react";
import ChoosePosition from "../ComponentBuyTicket/ChoosePosition/ChoosePosition";
import InformationCustomer from "../ComponentBuyTicket/InformationCustomer/InformationCustomer";
import RegisterSeat from "../ComponentBuyTicket/Register/RegisterSeat";

export default function BuyTicket() {
  return (
    <main style={{ width: "100%" }}>
      {/* bỏ .banner-shell để tràn hết chiều ngang */}
      <div style={{ paddingInline: 16, width: "100%" }}>
        <h2 style={{ margin: "16px 0" }}>Mời các bạn đặt vé</h2>
        <RegisterSeat />
        <ChoosePosition />
        <InformationCustomer />
      </div>
    </main>
  );
}
