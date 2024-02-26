import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiUrl, RequestLimit} from '../../env/constants';
import {Product} from '../Product';

export type ProductsWithCounts = {
  product: Product;
  count: number;
};
export interface ProductCartState {
  productsWithCounts: ProductsWithCounts[];
}
const initialState: ProductCartState = {
  productsWithCounts: [],
};

export const productCartSlice = createSlice({
  name: 'productCartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.productsWithCounts = [
        ...state.productsWithCounts,
        {product: action.payload, count: 1},
      ];
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      state.productsWithCounts = state.productsWithCounts.filter(
        f => f.product.id != action.payload.id,
      );
    },
    increaseProductCount: (state, action: PayloadAction<Product>) => {
      state.productsWithCounts.find(p => p.product.id == action.payload.id)!
        .count++;
    },

    decreaseProductCount: (state, action: PayloadAction<Product>) => {
      state.productsWithCounts.find(p => p.product.id == action.payload.id)!
        .count--;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addProductToCart,removeProductFromCart,increaseProductCount,decreaseProductCount} = productCartSlice.actions;

export default productCartSlice.reducer;
