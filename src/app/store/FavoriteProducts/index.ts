import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl, RequestLimit } from "../../env/constants";


export interface FavoriteProductState {
favIds:string[];
}

const initialState: FavoriteProductState = {
favIds:[]
};

export const favoriteProductSlice = createSlice({
  name: "favoriteProduct",
  initialState,
  reducers: {
    addFavProductId: (state, action: PayloadAction<string>) => {
      state.favIds = [...state.favIds,action.payload];
    },
    removeFavProductId: (state, action: PayloadAction<string>) => {
        state.favIds = state.favIds.filter(fId => fId != action.payload );
    },
  },
});


// Action creators are generated for each case reducer function
export const {
    addFavProductId,
    removeFavProductId,
  } = favoriteProductSlice.actions;
  
  export default favoriteProductSlice.reducer;
