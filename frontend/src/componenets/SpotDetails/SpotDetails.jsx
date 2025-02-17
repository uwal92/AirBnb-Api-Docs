import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css";
import SpotReviews from "../SpotReviews/SpotReviews";

function SpotDetails() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews?.reviews);
    const { spotId } = useParams();
    const spotIdInt = parseInt(spotId);
    const spot = useSelector((state) => state.spots.spotDetails[spotId]);
    
    // useEffect(() => {
    //     dispatch(getSpotDetails(spotIdInt));
    //   }, [dispatch, spotIdInt]);

    useEffect(() => {
        dispatch(getSpotDetails(spotIdInt));
    }, [dispatch, spotIdInt, reviews]);

    if (!spot || !spot.SpotImages || spot.SpotImages.length === 0) {
        return <div>Pictures Loading</div>;
      }
    const topImage = spot.SpotImages[0];
    const gridImages = spot.SpotImages.slice(1);

    const handleReservation = () => {
        alert("Feature Coming Soon...")
    }

    return (
        <div className="spot-details-wrapper">
            <div className="spot-title-header">
            <h1 className="spot-details-title">{spot.name}</h1>
            <p className="city-state">
                {spot.city}, {spot.state}, {spot.country}
            </p>
            </div>
            <div className="spot-images-wrapper">
                <div className="main-image">
                    <img
                    className="spot-main-image"
                    src={topImage.url === "No preview image available" ? "./logo.png" : topImage.url}
                    alt={`Main image ${topImage.id}`}
                    />
                </div>
                <div className="image-grid">
                    {gridImages.map((e) => (
                    <div className="spot-image" key={e.id}>
                        <img
                        className="spot-image-container"
                        src={e.url}
                        alt={`Spot image ${e.id}`}
                        />
                    </div>
                    ))}
                </div>
            </div>
            <div className="spot-details-info">
            <div className="spot-details-owner-description">
                <p className="spot-owner">
                {`Hosted by ${spot.Owner?.firstName} ${spot.Owner?.lastName}`}
                </p>
                <p className="spot-description">{spot.description}</p>
            </div>
            <div className="booking-spot-div">
                <div className="price-review-title">
                <p style={{ color: "black", textAlign: "left" }}>
                    <span className="book-price">${spot.price}</span> night
                </p>
                <p className="booking-reviews">
                <LiaStarSolid />
                    {spot.numReviews 
                    ? ` ${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} ${spot.numReviews === 1 ? "Review" : "Reviews"}` 
                    : "New"}
                </p>
                </div>
                <button onClick={handleReservation} className="booking-button">
                Reserve
                </button>
            </div>
            </div>
            <div className="line-break"></div>
            <div className="review-div">
            <div className="review-heading">
                <p className="review-title">
                <LiaStarSolid />
                
                {spot.numReviews
                    ? ` ${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} ${spot.numReviews === 1 ? "Review" : "Reviews"}`
                    : "New"}
                </p>
            </div>
            <SpotReviews spotId={spotIdInt} />
            </div>
        </div>
    )
}

export default SpotDetails;