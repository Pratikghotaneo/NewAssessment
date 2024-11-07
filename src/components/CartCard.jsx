import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';

const CartCard = ({ items, onClick }) => {
    const { products } = items

    return (
        <>
            <div className='flex border gap-3 my-3 mx-5 px-4 py-2 items-center' >
                <img src={products.image} alt={products.title} width={70} className='object-contain' loading='lazy' />
                <div>
                    <h2 className='text-lg font-semibold'>{products.title}</h2>
                    <p className='text-sm font-medium line-clamp-2'>{products.description}</p>
                    <p className='border p-3 bg-slate-200 max-w-fit mt-2'>Qtn: {items.qtn}</p>
                </div>
                <div className='max-h-fit'>
                    <AiFillDelete size={20} color='red' onClick={() => onClick(products.id)} />
                </div>

            </div>
        </>
    )
}

export default CartCard