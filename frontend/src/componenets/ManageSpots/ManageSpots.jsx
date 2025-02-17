import React, { useEffect, useState } from "react";
import "./ManageSpots.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteSpot, getUserSpots } from "../../store/spots";
import { LiaStarSolid } from "react-icons/lia";

function ManageSpots() {
    const user = useSelector((state) => state.session.user);
    const userSpots = useSelector((state) => state.spots.userSpots);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState(null);
    const { setModalContent, closeModal } = useModal();

    const handleDelete = (id) => {
        setModalContent(
            <div className='confirm-delete-modal'>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot?</p>
                <div className='confirm-delete-buttons'>
                    <button
                        className='delete-button'
                        onClick={() => { dispatch(deleteSpot(id)).then(() => {closeModal();}) }}
                    >
                        Yes (Delete Spot)
                    </button>
                    <button
                        className='cancel-button'
                        onClick={() => { closeModal(); }}
                    >
                        No (Keep Spot)
                    </button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (user) {
            dispatch(getUserSpots(user.id));
        }
    }, [dispatch, user]);

    if (!userSpots.length) {
        return (
            <div className="manage-spot-wrapper">
                <div className="manage-spot-heading">
                    <h2>Manage Spots</h2>
                </div>
                <div className="no-spots">
                    <p>No spots posted yet</p>
                    <button 
                        to='/spots/new'
                        className="create-new-spot-button"
                        onClick={() => navigate('/spots/new')}
                    >
                        Create a New Spot
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='manage-spot-wrapper'>
            <div className='manage-spot-heading'>
                <h2 className='manage-spot-title'>Manage Your Spots</h2>
            </div>
            <div className='manage-spot-list'>
                {userSpots.map((spot) => (
                    <div
                        onMouseOut={() => setTooltip(null)}
                        onMouseOver={() => setTooltip(spot.id)}
                        key={spot.id}
                        className='mspot-tile'
                        onClick={() => navigate(`/spots/${spot.id}`)}
                    >
                        {tooltip === spot.id && <div id='tooltip'>{spot.name}</div>}
                        <img
                            src={spot.previewImage}
                            alt={spot.name}
                            className='manage-spot-thumbnail'
                        />
                        <div className='manage-spot-info'>
                            <div className='manage-spot-info-sub'>
                                <p className='manage-spot-location'>
                                    {spot.city}, {spot.state}
                                </p>
                                <p className='manage-spot-rating'>
                                    <LiaStarSolid />
                                    {spot.avgRating ? spot.avgRating : 'New'}
                                </p>
                            </div>
                            <p style={{ color: "black", textAlign: "left" }}>
                                <span className='manage-spot-price'>${spot.price}</span> night
                            </p>
                            <div className='mspot-actions'>
                                <button
                                    className='manage-spot-use-btn'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/spots/${spot.id}/edit`);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className='manage-spot-use-btn'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(spot.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default ManageSpots;