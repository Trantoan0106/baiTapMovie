import { createSlice } from '@reduxjs/toolkit'
import listSeat from './seatPlan'
const initialState = {

listSeat,
currentPrice: 0,
selectSeat: [],
name: "",
numberOfSeat: 0,
canSelect: false,
canConfirm: false,
}

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {


handleSelectPriceSeatAction: (state, action) => {
  const { hang, soGhe } = action.payload || {};

  
  if (!hang) { 
    state.currentPrice = 0; 
    return; 
  }

  const row = state.listSeat?.find((s) => s.hang === hang);
  if (!row) { 
    state.currentPrice = 0; 
    return; 
  }

  const seat = row.danhSachGhe?.find((s) => s.soGhe === soGhe);

  if (seat) {
    state.currentPrice = Number(seat.gia) || 0;
    return;
  }

  
  state.currentPrice = (soGhe === "A11" || soGhe === "A12") ? 0 : 75000;
},




handleSelectNameAction : (state , action) => {
  state.name = action.payload;
  state.canSelect = false;
  state.selectSeat = [];
},
handleSelectNumberOfSeatAction : (state , action) => {
  let next = Number(action.payload);
 state.numberOfSeat = next;
 state.canSelect = false;
 
 if(state.selectSeat.length > next){
  state.selectSeat = state.selectSeat.slice(0,next);
 }
},
handleSelectSeatAction: (state ) => {

  let okName = state.name.trim().length
  let okNumber = Number(state.numberOfSeat)

  if(okName > 0 && okNumber > 0){
   state.canSelect = true;
  } else {
    state.canSelect = false;
  }
},


toggleSeatAction : (state , action) => {
// if (!state.canSelect) return;
let {hang , soGhe} = action.payload;
let index = state.selectSeat.findIndex((s) => s.hang === hang && s.soGhe === soGhe);

if(index !== -1){
  state.selectSeat.splice(index , 1);
} else if(state.numberOfSeat > state.selectSeat.length ){
  state.selectSeat.push({hang , soGhe});
} 

},

 
handleRenderCustomerAction: (state ) => {

if(state.selectSeat.length > 0){
  state.canConfirm = true;
  
} else {
  state.canConfirm = false;
}

}



  }
});

export const {handleSelectNameAction,handleSelectSeatAction,handleSelectPriceSeatAction,handleSelectNumberOfSeatAction,toggleSeatAction , handleRenderCustomerAction} = MovieSlice.actions

export default MovieSlice.reducer


























handleActionSelectSeat : (state,action) => {
let {hang,soGhe} = action.payload;
let index = state.selectSeat.findIndex((s) => s.hang ===hang && s.soGhe === soGhe);  


if(index !== -1){
  state.selectSeat = state.selectSeat.splice(index,1);
} else if(state.numberOfSeat > state.selectSeat.length){
  state.selectSeat.push({hang,ghe});
} else if(state.numberOfSeat < state.selectSeat.length) {
  state.selectSeat.splice(index,1);
}



}