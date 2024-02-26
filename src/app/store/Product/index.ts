import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiUrl, RequestLimit} from '../../env/constants';

export interface Product {
  id: string;
  brand: string;
  model: string;
  description: string;
  price: string;
  image: string;
  name: string;
  createdAt: string;
}

export interface ProductState {
  products: Product[];
  currentPage: number;
  hasMoreProduct: boolean;
  searchValue: '';
}
type FilterProduct = {
  name?: string;
  brand?: string;
  model?: string;
};

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  hasMoreProduct: true,
  searchValue: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasMoreProduct: (state, action: PayloadAction<boolean>) => {
      state.hasMoreProduct = action.payload;
    },
  },
});

export const getProductList = createAsyncThunk(
  'products/getProductList',
  async (
    params: {query?: string; filter?: FilterProduct} | undefined,
    {dispatch, getState},
  ) => {
    try {
      const {
        product: {currentPage, products, hasMoreProduct},
      } = getState() as any;
      if (!hasMoreProduct) {
        return;
      }
      let urlString = `${ApiUrl}?`;
      if (params) {
        if (params.query) {
          urlString = `${urlString}search=${params.query}&`;
        }
        if (params.filter?.brand) {
          urlString = `${urlString}brand=${params.filter.brand}&`;
        }
        if (params.filter?.model) {
          urlString = `${urlString}model=${params.filter.model}&`;
        }
        if (params.filter?.name) {
          urlString = `${urlString}name=${params.filter.name}&`;
        }
      }
      const pageAndLimitUrl = `page=${currentPage}&limit=${RequestLimit}`;
      urlString = `${urlString}${pageAndLimitUrl}`;
      const response = await axios.get<Product[]>(
        urlString.replaceAll(' ', '%20'),
      );
      dispatch(setProductList([...products, ...response.data]));
      dispatch(setHasMoreProduct(response.data.length == RequestLimit));
      dispatch(setCurrentPage(currentPage + 1));
    } catch (error) {
      console.log('error', error);
    }
  },
);
// Action creators are generated for each case reducer function
export const {setProductList, setCurrentPage, setHasMoreProduct} =
  productSlice.actions;

export default productSlice.reducer;
