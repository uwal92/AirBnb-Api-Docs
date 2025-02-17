import React, { use, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getAllReviews } from "../../store/reviews";
import "./SpotReviews.css";
import ReviewForm from "./ReviewForm";

function SpotReviews({ spotId}) {
    const { setModalContent, closeModal } = useModal();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails[spotId]);
    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.reviews);
    
    
    useEffect(() => {
        dispatch(getAllReviews(spotId));
    }, [dispatch, spotId]);

    const userReview = (reviews).some((review) => user && user.id === review.userId);
    
    const dateForm = (date) => {
        if (!date) return "";
      
        const monthArr = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        const [year, month] = date.split("-");
        return `${monthArr[+month - 1]} ${year}`;
    };

    const handleDelete = (id) => {
        setModalContent(
            <div className='confirm-delete-modal'>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this review?</p>
                <div className='confirm-delete-buttons'>
                    <button
                        className='delete-button'
                        onClick={() => { dispatch(deleteReview(id)).then(() => {closeModal();});
                    }}> Yes (Delete Review) </button>
                    
                    <button
                        className='cancel-button'
                        onClick={() => {closeModal();}}
                    >
                        No (Keep Review)
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="review-wrapper">
            {user &&
                spot &&
                user.id !== spot.ownerId &&
                !userReview && (
                <div className="post-review">
                    <button
                    onClick={() =>
                        setModalContent(<ReviewForm spotId={spotId} />)
                    }
                    className="add-review-btn"
                    >
                    Post Your Review
                    </button>
                </div>
                )}
            {reviews.length > 0 ? (
                reviews
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((review) => (
                    <div key={review.id} className="review-container">
                    <h3>{review.User?.firstName}</h3>
                    <p className="review-date">{dateForm(review.createdAt)}</p>
                    <p className="actual-review">{review.review}</p>
                    {user && user.id === review.userId && (
                        <button
                        onClick={() => handleDelete(review.id)}
                        className="delete-review-btn"
                        >
                        Delete Review
                        </button>
                    )}
                    </div>
                ))
            ) : user && user.id !== spot.ownerId ? (
                <p className="no-review-p">Be the first to post a review!</p>
            ) : (
                <p className="no-review-p">No reviews yet.</p>
            )}
        </div>
    );
}

export default SpotReviews;