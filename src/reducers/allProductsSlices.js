import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk('product/allProducts', async () => {
    const res = await axios.get('https://fakestoreapi.com/products/')
    return res.data
})

const paginationTotal = (items) => {

    let perPageCount = 10
    if (items.length > 10) {
        return Math.ceil(items.length / perPageCount)
    } else {
        return 0
    }
}

const paginationProducts = (items) => {
    let perPageCount = 10
    return items.slice()
}
const initialState = {
    loading: false,
    products: [],
    error: false,
    errorMessage: '',
    category: [],
    filterItems: [],
    selectedCategory: '',
    selectedOrder: '',
    totalPages: 0,
    paginationData: []
}

const AllProductsSlices = createSlice({
    name: 'allproducts',
    initialState,
    reducers: {
        getProductCategory: (state, action) => {
            let ProductsCategory = action.payload.map((item) => item.category)
            ProductsCategory = new Set(ProductsCategory)
            state.category = [...ProductsCategory]
        },
        selectFilterCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload
        },
        filterProducts: (state, action) => {
            let products = state.products
            let filteredItems = [];
            if (products.length > 0 && state.selectedCategory != '' && state.selectedCategory !== 'All') {
                filteredItems = products.filter((item) => item.category === state.selectedCategory)
                state.totalPages = paginationTotal(filteredItems)
                state.filterItems = filteredItems
            } else {
                filteredItems = [...action.payload];
                state.totalPages = paginationTotal(filteredItems)
                state.filterItems = filteredItems
            }

            if (state.selectedOrder !== "") {
                filteredItems = state.filterItems.sort((a, b) => {
                    if (state.selectedOrder === 'lowTohigh') {
                        return a.price - b.price;
                    }
                    return b.price - a.price;
                });
            }
            state.totalPages = paginationTotal(filteredItems)
            state.filterItems = filteredItems;
        },
        pagination: (state, action) => {
            let itemPerCount = 10
            if (state.totalPages > 1) {
                let paginationRes = state.filterItems.slice((action.payload - 1) * itemPerCount, itemPerCount * action.payload)
                state.paginationData = paginationRes
            } else {
                state.paginationData = state.filterItems
            }
        }




    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.errorMessage = action.error.message
            })
    }
})
export const { getProductCategory, selectFilterCategory, filterProducts, selectOrder, pagination } = AllProductsSlices.actions
export default AllProductsSlices.reducer