import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotDetails, updateSpot } from "../../store/spots";

function UpdateSpots() {
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        country: "",
        price: "",
    });

    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.spotDetails[spotId]);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            setForm({
                name: spot.name || "",
                description: spot.description || "",
                address: spot.address || "",
                city: spot.city || "",
                state: spot.state || "",
                country: spot.country || "",
                price: spot.price || "",
            });
        }
    }, [spot]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
    };

    useEffect(() => {
        const formErrors = {};
        if (!form.name) {
            formErrors.name = "Name is required";
        }
        if (!form.description) {
            formErrors.description = "Description is required, and should be more than 30 characters";
        }
        if (!form.address) {
            formErrors.address = "Address is required";
        }
        if (!form.city) {
            formErrors.city = "City is required";
        }
        if (!form.state) {
            formErrors.state = "State is required";
        }
        if (!form.country) {
            formErrors.country = "Country is required";
        }
        if (!form.price) {
            formErrors.price = "Price is required";
        }
        setErrors(formErrors);
    }, [form]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (Object.keys(errors).length > 0) return;

        try {
            const spotDetails = {
                name: form.name,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                country: form.country,
                price: form.price,
            };
            dispatch(updateSpot(spotId, spotDetails));
            navigate(`/spots/${spotId}`);
        } catch (err) {
            const data = await err.json();
            if (data?.errors) {
                setErrors(data.errors);
            }
        }
    };

    return (
        <form className="create-spot-form" onSubmit={handleSubmit}>
            <h2>&nbsp;&nbsp;Update Your Spot</h2>

            {/* Location Section */}
            <fieldset>
                <legend>Where's your place located?</legend>
                <p>
                    Guests will only get your exact address once they&apos;ve booked a
                    reservation.
                </p>
                <label>Country</label>
                {isSubmitted && errors.country && (<p className="error">{errors.country}</p>)}
                <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange}  />

                <label>Street Address</label>
                {isSubmitted && errors.address && (<p className="error">{errors.address}</p>)}
                <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange}  />

                <div className="location-row">
                <div>
                    <label>City</label>
                    {isSubmitted && errors.city && (<p className="error">{errors.city}</p>)}
                    <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange}  />
                </div>
                <div>
                    <label>State</label>
                    {isSubmitted && errors.state && (<p className="error">{errors.state}</p>)}
                    <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange}  />
                </div>
                </div>
            </fieldset>
            <hr />
            {/* Description Section */}
            <fieldset>
                <legend className="heading">Describe your place to guests</legend>
                <p>
                    Mention the best features of your space, any special amenitites
                    like fast wifi or parking, and what you love about the
                    neighborhood.
                </p>
                {isSubmitted && errors.description && (<p className="error">{errors.description}</p>)}
                <textarea
                name="description"
                placeholder="Please write at least 30 characters"
                value={form.description}
                onChange={handleChange}
                
                ></textarea>
            </fieldset>
            <hr />
            {/* Title Section */}
            <fieldset>
                <legend className="heading">Create a title for your spot</legend>
                <p>
                    Catch guests&apos; attention with a spot title that highlights what
                    makes your place special.
                </p>
                {isSubmitted && errors.name && (<p className="error">{errors.name}</p>)}
                <input type="text" name="name" placeholder="Name of your spot" value={form.name} onChange={handleChange}  />
            </fieldset>

            <hr />
            {/* Price Section */}
            <fieldset>
                <legend className="heading">Set a base price for your spot</legend>
                <p>
                    Competitive pricing can help your listing stand out and rank
                    higher in search results.
                </p>
                {isSubmitted && errors.price && (<p className="error">{errors.price}</p>)}
                <input type="number" name="price" placeholder="Price per night (USD)" value={form.price} onChange={handleChange}  />
            </fieldset>
            <hr />
            {/* Submit Button */}
            <button type="submit" className="submit-button">Update Spot</button>
        </form>
    )
}

export default UpdateSpots;