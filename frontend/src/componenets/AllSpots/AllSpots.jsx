import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { LiaStarSolid } from "react-icons/lia";
import "./AllSpots.css";

function AllSpots() {
    const spots = useSelector((state) => state.spots?.allSpots);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    const allSpotsAsObject = Object.values(spots);

    const handleSpotClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    }

    return (
         <div className="spots-padding">
            <div>
                <div className="spots-images">
                    {allSpotsAsObject && allSpotsAsObject
                        .sort((a, b) => b.id - a.id)
                        .map((spot) => (
                        <div key={spot.id} className="spot-div" value={text} onMouseOut={() => setText(null)} onMouseOver={() => setText(spot.id)} onClick={() => handleSpotClick(spot.id)}>
                            {text === spot.id && <div id="tooltip">{spot.name}
                        </div>}
                            <img 
                                className="spot-image" 
                                src={spot.previewImage === "No preview image available" ? "./logo.png" : spot.previewImage} 
                                alt="./logo.png"
                            />
                            <div className="spot-star">
                                <p>
                                    {spot.city}, {spot.state}
                                </p>
                                <p className="spot-rating">
                                    <LiaStarSolid />
                                    {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
                                </p>
                            </div>
                            <p style={{ color: "black", textAlign: "left" }}>
                                <span className="spot-price">${spot.price}</span> night
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllSpots;