import { createSlice } from "@reduxjs/toolkit";

// Helper function to get cart data from localStorage
const getLocalStorage = () => {
    const storedData = localStorage.getItem('cartData');

    try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && Array.isArray(parsedData.cart)) {
            return parsedData;
        }
    } catch (err) {
        console.error('Failed to load data', err.message);
    }


    return { cart: [], totalquantity: 0, totalPrice: 0 };
};

const initialState = getLocalStorage();
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;
            const existingProduct = state.cart.find((item) => item.products.id === newProduct.products.id);

            if (existingProduct) {
                existingProduct.qtn += newProduct.qtn;
            } else {
                state.cart.push(newProduct);
            }

            state.totalquantity += newProduct.qtn;
            state.totalPrice += newProduct.products.price * newProduct.qtn


            localStorage.setItem('cartData', JSON.stringify({
                cart: state.cart,
                totalquantity: state.totalquantity,
                totalPrice: state.totalPrice
            }));
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const removeItem = state.cart.find((item) => item.products.id === id);

            if (removeItem) {
                state.cart = state.cart.filter((item) => item.products.id !== id);
                state.totalquantity -= removeItem.qtn;
                state.totalPrice -= removeItem.products.price * removeItem.qtn
            }


            localStorage.setItem('cartData', JSON.stringify({
                cart: state.cart,
                totalquantity: state.totalquantity,
                totalPrice: state.totalPrice
            }));
        },
    }
});

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
