import React from 'react'
import "./style.css"
import {useDispatch, useSelector} from "react-redux"
import { handleSelectNameAction, handleSelectNumberOfSeatAction, handleSelectSeatAction } from '../redux/MovieSlice';



export default function RegisterSeat() {
  let dispatch = useDispatch();
  let {name , numberOfSeat , canSelect} = useSelector((store) => store.movie);

  let handleSelectName = (e) => {
let action = handleSelectNameAction(e.target.value);
dispatch(action);
  }

let handleSelectNumberOfSeat = (e) => {
  let action = handleSelectNumberOfSeatAction(e.target.value);
  dispatch(action);
}

let handleSelectSeat = () => {
  let action = handleSelectSeatAction();
  dispatch(action);
}



  return (
   <section className="rs-wrap">
      <div className="rs-card">
        <h2 className="rs-title">MOVIE SEAT SELECTION</h2>
        <p className="rs-sub">Fill The Required Details Below And Select Your Seats</p>

        <div className="rs-form">
          <label className="rs-field">
            <span className="rs-label">Name <span className="rs-req">*</span></span>
            <input className="rs-input" placeholder="Your name" value={name} onChange={handleSelectName} />
          </label>

          <label className="rs-field">
            <span className="rs-label">Number of Seats <span className="rs-req">*</span></span>
            <input type="number" className="rs-input" placeholder="0" value={numberOfSeat} onChange={handleSelectNumberOfSeat} />
          </label>

          <div className="rs-actions">
            <button onClick={handleSelectSeat} className="rs-btn">Start Selecting</button>
          </div>
        </div>


        <div className="rs-legend">
          <span className="rs-legend-item"><span className="rs-dot rs-dot--selected" /> Selected Seat</span>
          <span className="rs-legend-item"><span className="rs-dot rs-dot--reserved" /> Reserved Seat</span>
          <span className="rs-legend-item"><span className="rs-dot rs-dot--empty" /> Empty Seat</span>
        </div>
      </div>
    </section>
  )
}

