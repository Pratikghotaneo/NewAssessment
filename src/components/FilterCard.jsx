import React from 'react'

const FilterCard = ({ category, onClick }) => {
    return (
        <div className='border mx-3 md:mx-0 py-1 px-1 md:py-3 md:px-4 rounded-xl mb-5 cursor-pointer' onClick={() => onClick(category)}>
            <h1>{category}</h1>
        </div>
    )
}

export default FilterCard