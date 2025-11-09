import React from 'react'
import "./style.css"
import { useSelector } from 'react-redux'
export default function InformationCustomer() {

let {name , numberOfSeat , selectSeat} = useSelector((s) => s.movie);
let seats = selectSeat.map((s) => s.soGhe);
    
  return (
    <section className="ic-wrap">
      <div className="ic-card">
        <h3 className="ic-title">Booking Summary</h3>

        <div className="ic-table-wrap">
          <table className="ic-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Seats</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{numberOfSeat}</td>
                <td>{seats.length ? seats.join(", ") : "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ic-actions">
          <button className="ic-btn">Proceed to Payment</button>
        </div>
      </div>
    </section>
  )
}
