import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../reducers/cartSlices'

const ProductCard = ({ products }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="max-w-[250px] max-h-[500px] border shadow-lg" key={products.id} >
            <div className='cursor-pointer' onClick={() => navigate(`/product/${products.id}`)}>
                <img src={products.image} alt={products.title} width={250} className="h-[250px] object-contain" loading='lazy' />
                <div className="desc py-1 px-3">
                    <h2 className="text-xl font-semibold line-clamp-1">{products.title}</h2>
                    <p className="line-clamp-2">{products.description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3 px-3 py-2 cursor-pointer">
                <span className="text-2xl font-bold ">₹{products.price}</span>
                <span className="border rounded-2xl bg-yellow-400 py-1 px-3" onClick={() => dispatch(addToCart({ products, qtn: 1 }))}>Add to cart</span>
            </div>

        </div>
    )
}

export default ProductCard