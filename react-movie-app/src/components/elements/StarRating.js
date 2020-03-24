import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './starRating.css';

const { forwardRef, useRef, useImperativeHandle } = React;

const StarRating = forwardRef((props, ref ) => {
        const [rating, setRating] = useState(null);
        const [hover, setHover] = useState(null);
        useImperativeHandle(ref, () => ({
             resetRating() {
                setRating(null);
            }
        }));
        
    
        return (
            <div>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => { setRating(ratingValue); props.ratingFunction(ratingValue) }}
                            // onClick={ratingFunction}
                            />
                            <FaStar
                                className="starImg"
                                size={50}
                                color={ratingValue <= (hover || rating) ? "#FF6347" : "#696969"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>
        )
    });
    export default StarRating

// const { forwardRef, useRef, useImperativeHandle } = React;
// const StarRating = forwardRef(({ ratingFunction }, ref) => {
//     const [rating, setRating] = useState(null);
//     const [hover, setHover] = useState(null);
//     const resetRating = (resetValue) => {
//         setRating(resetValue);
//     }
//     return (
//         <div>
//             {[...Array(5)].map((star, index) => {
//                 const ratingValue = index + 1;
//                 return (
//                     <label key={index}>
//                         <input
//                             type="radio"
//                             name="rating"
//                             value={ratingValue}
//                             onClick={() => { setRating(ratingValue); ratingFunction(ratingValue) }}
//                         // onClick={ratingFunction}
//                         />
//                         <FaStar
//                             className="star"
//                             size={50}
//                             color={ratingValue <= (hover || rating) ? "#FF6347" : "#696969"}
//                             onMouseEnter={() => setHover(ratingValue)}
//                             onMouseLeave={() => setHover(null)}
//                         />
//                     </label>
//                 );
//             })}
//         </div>
//     )
// });

//

