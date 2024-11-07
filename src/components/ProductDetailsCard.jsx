import React from 'react'
import RatingCard from './RatingCard'
import { useDispatch } from 'react-redux'
import { addToCart } from '../reducers/cartSlices'

const ProductDetailsCard = ({ product }) => {
    const dispatch = useDispatch()
    return (
        <div className='px-10 md:flex justify-center gap-6 items-center'>
            <img src={product.image} alt={product.title} width={500} loading='lazy' />
            <div>
                <h1 className='text-3xl font-bold'>{product.title}</h1>
                <p className='text-xl font-medium mt-3'>{product.description}</p>
                <span className='font-extralight mt-4'>{product.category}</span>

                <RatingCard value={product.rating?.rate} count={product.rating?.count} />


                <h2 className='text-2xl font-semibold'>₹{product.price}</h2>
                <div className='md:flex gap-3'>
                    <div className={`cursor-pointer border py-3 px-5 rounded-md text-center mt-4 bg-yellow-300`} onClick={() => dispatch(addToCart({ products: product, qtn: 1 }))}>
                        <button>Add to Cart</button>
                    </div>
                    <div className={`cursor-pointer border py-3 px-5 rounded-md text-center mt-4 bg-gray-300`}>
                        <button disabled> Buy Now</button>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default ProductDetailsCard
