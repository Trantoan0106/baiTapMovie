import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRenderCustomerAction,
  handleSelectPriceSeatAction,
  toggleSeatAction,
} from "../redux/MovieSlice";
export default function ChoosePosition() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 12;
  const groupSize = 3;
  const groups = seatsPerRow / groupSize;
  const vipFromRow = "F";
  const isVip = (r) => rows.indexOf(r) >= rows.indexOf(vipFromRow);

  let dispatch = useDispatch();

  let toggleSeat = (payload) => {
    let action = toggleSeatAction(payload);
    dispatch(action);
  };

  let handleSelectPrice = (payload) => {
    let action = handleSelectPriceSeatAction(payload);
    dispatch(action);
  };

  const { selectSeat, canSelect, name, numberOfSeat } = useSelector(
    (s) => s.movie
  );
  console.log({ canSelect, name, numberOfSeat, selectSeat });

  const isSelectedSeat = (r, c) =>
    selectSeat.some((s) => s.hang === r && s.soGhe === `${r}${c}`);
   

let handleRenderCustomer = (payload) => {
let action = handleRenderCustomerAction(payload);
dispatch(action)
}


  return (
    <section className="cp-page">
      <div className="cp-bg" aria-hidden />
      <div className="cp-card">
        {/* header */}
        <div className="cp-header">
          <h1 className="cp-title">🎬 MOVIE SEAT – DELUXE</h1>
          <div className="cp-chips">
            <span className="cp-chip">
              Rạp: <b>Room 3</b>
            </span>
            <span className="cp-chip">
              Suất: <b>19:30</b>
            </span>
            <span className="cp-chip">
              Giá: <b>90.000₫</b> / VIP <b>120.000₫</b>
            </span>
          </div>
        </div>

        {/* screen */}
        <div className="cp-screen-wrap">
          <div className="cp-screen">SCREEN THIS WAY</div>
          <div className="cp-screen-glow" />
        </div>

        {/* column numbers */}
        <div className="cp-col-head">
          <div />
          {Array.from({ length: groups }).map((_, g) => (
            <div key={g} className="cp-col-head-group">
              {Array.from({ length: groupSize }).map((__, i) => (
                <div key={i}>{g * groupSize + (i + 1)}</div>
              ))}
            </div>
          ))}
        </div>

        {/* seats */}
        <div className="cp-grid">
          {rows.map((r) => (
            <div key={r} className="cp-row">
              <div className="cp-row-label">{r}</div>
              <div className="cp-row-blocks">
                {Array.from({ length: groups }).map((_, g) => (
                  <div key={g} className="cp-block">
                    {Array.from({ length: groupSize }).map((__, i) => {
                      const c = g * groupSize + (i + 1);
                      const vip = isVip(r);
                      const selected = isSelectedSeat(r, c);
                      const disabled = false;

                      return (
                        <button
                          type="button"
                          key={`${r}-${c}`}
                          className={`cp-seat ${vip ? "cp-seat--vip" : ""} ${
                            selected ? "cp-seat--selected" : ""
                          }`}
                          disabled={disabled}
                          onClick={() => {
                            const payload = { hang: r, soGhe: `${r}${c}` };
                            toggleSeat(payload);
                            handleSelectPrice(payload);
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* legend + button (chỉ UI) */}
        <div className="cp-legend">
          <span className="cp-legend-item">
            <span className="cp-dot cp-dot--empty" />
            Ghế trống
          </span>
          <span className="cp-legend-item">
            <span className="cp-dot cp-dot--selected" />
            Đang chọn
          </span>
          <span className="cp-legend-item">
            <span className="cp-dot cp-dot--reserved" />
            Đã đặt
          </span>
          <span className="cp-legend-item">
            <span className="cp-dot cp-dot--vip" />
            VIP
          </span>
        </div>

        <button onClick={ handleRenderCustomerAction} className="cp-confirm">Confirm Selection</button>
      </div>
    </section>
  );
}
