import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';
import  productSlice  from './Product';
import favoriteProductSlice  from './FavoriteProducts';
import  productCartSlice  from './Cart';


const reducers = {
  product : productSlice,
  favorite:favoriteProductSlice,
  productCart:productCartSlice

};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  whitelist: ['favorite','productCart'],
  blacklist: [ 'product'],
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
