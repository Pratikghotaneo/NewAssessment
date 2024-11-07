import React from 'react'
import ReactStars from "react-rating-stars-component";

const RatingCard = ({ value, count }) => {
    return (
        <div className='flex items-center gap-2'>

            <ReactStars
                count={5}
                size={24}
                value={4}
                activeColor="#ffd700"
                edit={Math.round(value)}
            />
            <span className='font-light text-sm'>/ {count} Counts</span>
        </div>
    )
}

export default RatingCard