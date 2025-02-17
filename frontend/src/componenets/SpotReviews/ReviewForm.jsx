import React, { useState } from "react";
import "./ReviewForm.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews";

function ReviewForm({ spotId }) {
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const starsCnt = [1, 2, 3, 4, 5];
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = {};
        if (review.length < 10) {
            formErrors.review = 'Review must be at least 10 characters long';
        }
        if (stars < 1 || stars > 5) {
            formErrors.stars = 'Stars must be between 1 and 5';
        }
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        dispatch(addReview({ review, stars }, spotId));
        closeModal();
    }
    return (
        <div className="form">
            <h2 className="review-title-form">How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    placeholder="Leave your review here..."
                    className="review-text-area"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                {errors.review && <p className="error-message">{errors.review}</p>}
                <label className="stars-label">
                <div className="star-rating">
                    {starsCnt.map((star) => (
                        <span
                            key={star}
                            className={`star ${hover >= star || stars >= star ? 'filled' : ''}`}
                            onClick={() => setStars(star)} // 
                            onMouseEnter={() => setHover(star)} // 
                            onMouseLeave={() => setHover(0)} // 
                        >
                            ★
                        </span>
                    ))}
                    &nbsp;&nbsp;Stars
                </div>
                </label>
                {errors.stars && <p className="error-message">{errors.stars}</p>}
                <div className="button-div">
                <button 
                    className="submit-button"
                    type="submit"
                    disabled={review.length < 10 || stars < 1}
                >
                    Submit Your Review
                </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;