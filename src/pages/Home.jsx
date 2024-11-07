import React, { lazy, Suspense, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, filterProducts, getProductCategory, pagination, selectFilterCategory, selectOrder } from '../reducers/allProductsSlices'

const Loading = lazy(() => import('../components/LOading'))
const Layout = lazy(() => import('../components/Layout'))
const ProductCard = lazy(() => import('../components/ProductCard'))
const FilterCard = lazy(() => import('../components/FilterCard'))


const Home = () => {
    const dispatch = useDispatch();

    const { products, loading, error, errormessage, category, filterItems, totalPages, paginationData } = useSelector(state => state.allproducts)

    let categories = ['All', ...category]

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    useEffect(() => {
        if (products.length > 0) {
            dispatch(getProductCategory(products));
            dispatch(filterProducts(products))
            dispatch(pagination(1))
        }
    }, [dispatch, products]);

    const handleCategoryFilter = (category) => {
        dispatch(selectFilterCategory(category))
        dispatch(filterProducts(products))
        dispatch(pagination(1))
    }

    const handleSorting = (event) => {
        dispatch(selectOrder(event.target.value))
        dispatch(filterProducts(products))
        dispatch(pagination(1))
    }

    const handlePagination = (index) => {
        dispatch(pagination(index))
        dispatch(filterProducts(products))
    }

    if (loading) {
        return (
            <Suspense fallback={<h1> loading</ h1>}>
                <Loading />
            </Suspense>
        )
    }
    if (error) {
        return (
            <h1>{errormessage}</h1>
        )
    }
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Layout>
                <div className='md:flex justify-evenly items-center gap-1 md:gap-4'>
                    <div className='flex md:gap-3 overflow-scroll'>
                        {
                            categories.map((item, index) => <FilterCard category={item} key={index} onClick={(category) => handleCategoryFilter(category)} />)
                        }
                    </div>
                    <div className='py-3 mb-5 px-3'>
                        <select name="sort" id="sort" onChange={(e) => handleSorting(e)}>
                            <option value="">Sort by price</option>
                            <option value="lowTohigh">Low to High</option>
                            <option value="highTolow">High to Low</option>
                        </select>
                    </div>
                </div>
                <div className='px-7 mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center'>
                    {
                        paginationData.map((item) => <ProductCard products={item} key={item.id} />)
                    }
                </div>
                <div className='flex mt-5 justify-end'>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <span className='text-lg font-semibold p-3 border-r-2 border-t-2 border-l-2 border-b-2  cursor-pointer' onClick={() => handlePagination(index + 1)}>
                                {index + 1}
                            </span>
                        ))
                    }
                </div>
            </Layout>
        </Suspense>
    )
}

export default Home