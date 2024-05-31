import { configureStore } from '@reduxjs/toolkit'
import pizzaReducer from '../state/pizzaSlice';
import { pizzaApi } from './pizzaApi';

export const resetStore = () => configureStore({
  reducer: {
    pizzaState: pizzaReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    // Add more reducers as needed
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
