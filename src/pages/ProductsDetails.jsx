import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailsProduct } from '../reducers/detailsProductSlice'
const ProductDetailsCard = lazy(() => import('../components/ProductDetailsCard'))
const Loading = lazy(() => import('../components/LOading'))
const Layout = lazy(() => import('../components/Layout'))


const ProductsDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDetailsProduct(id))
    }, [dispatch, id])

    const { loading, product, error, errorMessage } = useSelector(state => state.product)

    if (loading) {
        return (
            <Suspense fallback= {<h1> loading</ h1>}>
                <Loading />
            </Suspense>
        )
    }
    if (error) {
        return (
            <h1>{errorMessage}</h1>
        )
    }

    return (
        <Suspense fallback={<h1>loading</h1>}>
            <Layout>
                <ProductDetailsCard product={product} />
            </Layout>
        </Suspense>
    )
}

export default ProductsDetails