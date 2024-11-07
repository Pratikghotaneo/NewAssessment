import { configureStore } from "@reduxjs/toolkit";
import AllProductsReducer from "./src/reducers/allProductsSlices"
import DetailsProductReducer from "./src/reducers/detailsProductSlice"
import CartReducer from "./src/reducers/cartSlices"

export const store = configureStore({
    reducer: {
        allproducts: AllProductsReducer,
        product: DetailsProductReducer,
        cart: CartReducer
    }
})