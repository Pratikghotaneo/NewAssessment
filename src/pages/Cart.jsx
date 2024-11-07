import React, { lazy, startTransition, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../reducers/cartSlices'
const Loading = lazy(() => import('../components/LOading'))
const Layout = lazy(() => import('../components/Layout'))
const CartCard = lazy(() => import('../components/CartCard'))
const PriceingCard = lazy(() => import('../components/PriceingCard'))


const Cart = () => {

    const dispatch = useDispatch()

    const handleRemoveFromCart = (id) => {
        startTransition(() => {
            dispatch(removeFromCart(id))
        })
    }

    const { cart, totalPrice, totalquantity } = useSelector((state) => state.cart)
    return (
        <Suspense fallback={<h1>Loading</h1>}>
            <Layout>
                <div className='md:flex justify-center'>
                    <div className='md:max-w-[70vw]'>
                        {cart.map((item) => (

                            <CartCard items={item} key={item.products.id} onClick={() => handleRemoveFromCart(item.products.id)} />


                        ))}
                    </div>
                    <div className='flex-1'>

                        <PriceingCard totalquantity={totalquantity} price={totalPrice} />


                    </div>
                </div>

            </Layout >
        </Suspense>
    )
}

export default Cart