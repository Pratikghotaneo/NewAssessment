import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetailsProduct = createAsyncThunk('product', async (id) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return res.data
})

const initialState = {
    loading: false,
    product: {},
    error: false,
    errorMessage: ''
}

const DetailsProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailsProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDetailsProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(fetchDetailsProduct.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.error.message
            })
    }
})

export default DetailsProductSlice.reducer