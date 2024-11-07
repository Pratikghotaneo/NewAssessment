import React from 'react'

const PriceingCard = ({ totalquantity, price }) => {
    return (
        <div className='border p-3 rounded-lg mt-3 mx-4 py-2'>
            <h2 className='text-3xl font-semibold'>Subtotal ({totalquantity}):</h2>
            <span className='text-4xl font-extrabold'>₹{price.toFixed(2)}</span>
            <div className={`cursor-pointer border py-3 px-5 rounded-md text-center mt-4 bg-yellow-300`}>
                <button> Buy Now</button>
            </div>
        </div>
    )
}

export default PriceingCard