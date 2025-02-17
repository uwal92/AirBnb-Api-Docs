import { csrfFetch } from "./csrf";

export const getReviewsAction = (reviews) => {
    return {
        type: 'reviews/get_all_reviews',
        payload: reviews,
    }
};
export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`https://airbnb-api-docs.onrender.com/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviewsAction(reviews.Reviews));
        return reviews;
    }
};

export const addReviewAction = (review) => {
    return {
        type: 'reviews/add_review',
        payload: review,
    }
};

export const addReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`https://airbnb-api-docs.onrender.com/api/spots/${spotId}/reviews`, {
        method: "POST", 
        headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(review),
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(addReviewAction(review));
        return review;
    }
};

export const deleteReviewAction = (reviewId) => {
    return {
        type: 'reviews/delete_review',
        reviewId,
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`https://airbnb-api-docs.onrender.com/api/reviews/${reviewId}`, {
        method: "DELETE", 
    })
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
    }
};

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
    if (action.type === 'reviews/get_all_reviews') {
        return { ...state, reviews: action.payload };
    }
    else if (action.type === 'reviews/add_review') {
        return { ...state, reviews: [...state.reviews, action.payload] };
    }
    else if (action.type === 'reviews/delete_review') {
        return { ...state, reviews: state.reviews.filter(
                (review) => {
                     return review.id !== action.reviewId}),
        }
    }
    else {
        return state;
    }
}
export default reviewReducer;