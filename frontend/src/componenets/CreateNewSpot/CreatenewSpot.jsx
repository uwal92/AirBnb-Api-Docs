import React, { useEffect, useState } from "react";
import "./CreatenewSpot.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewSpot, addSpotImage } from "../../store/spots";

function CreateNewSpot() {
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
    });

    const uploadImage = async (imageUrl) => {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dhuarntif/image/upload`;
    
        const formData = new FormData();
        formData.append("file", imageUrl);
        formData.append("upload_preset", "myCloud");
    
        try {
            const response = await fetch(cloudinaryUrl, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    };
      
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
        if (!form.image1) {
            formErrors.image1 = "Preview Image URL is required";
        }
        setErrors(formErrors);
    }, [form]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);

        try {
            // Upload images to Cloudinary
            const imageUrls = await Promise.all(
            [form.image1, form.image2, form.image3, form.image4, form.image5]
                .filter(url => url)
                .map(url => uploadImage(url))
            );

            const spotDetails = {
                name: form.name,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                country: form.country,
                price: form.price,
            };

            const createSpot = await dispatch(addNewSpot(spotDetails, navigate));
            if (createSpot) {
                const images = imageUrls.map((url, index) => ({
                url,
                preview: index === 0, // First image is the preview image
                }));
                await Promise.all(images.map((image) => dispatch(addSpotImage(createSpot.id, image))));
            }
        } catch (error) {
            console.error('Error creating spot:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitted(true);
    //     if (Object.keys(errors).length > 0) return;

    //     const spotDetails = {
    //         name: form.name,
    //         description: form.description,
    //         address: form.address,
    //         city: form.city,
    //         state: form.state,
    //         country: form.country,
    //         price: form.price,
    //     };

    //     const createSpot = await dispatch(addNewSpot(spotDetails, navigate));
    //     if (createSpot) {
    //         const images = [
    //           { url: form.image1, preview: true },
    //           { url: form.image2, preview: false },
    //           { url: form.image3, preview: false },
    //           { url: form.image4, preview: false },
    //           { url: form.image5, preview: false },
    //         ].filter((image) => image.url);
    //         await Promise.all(images.map((image) => dispatch(addSpotImage(createSpot.id, image))));
    //     }
    // }
    return (
        <form className="create-spot-form" onSubmit={handleSubmit}>
            <h2>&nbsp;&nbsp;Create a new Spot</h2>

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
                {/* <div className="location-row">
                <div>
                    <label>Latitude</label>
                    <input type="text" name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
                </div>
                <div>
                    <label>Longitude</label>
                    <input type="text" name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
                </div>
                </div> */}
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
            {/* Image Upload Section */}
            <fieldset>
                <legend className="heading">Liven up your spot with photos</legend>
                <p>Submit a link to at least one photo to publish your spot.</p>
                {isSubmitted && errors.image1 && (<p className="error">{errors.image1}</p>)}
                <input
                    placeholder="Preview Image URL"
                    type="text"
                    name="image1"
                    value={form.image1}
                    onChange={handleChange}
                />
                <input
                    placeholder="Image URL"
                    type="text"
                    name="image2"
                    value={form.image2}
                    onChange={handleChange}
                />
                <input
                    placeholder="Image URL"
                    type="text"
                    name="image3"
                    value={form.image3}
                    onChange={handleChange}
                />
                <input
                    placeholder="Image URL"
                    type="text"
                    name="image4"
                    value={form.image4}
                    onChange={handleChange}
                />
                <input
                    placeholder="Image URL"
                    type="text"
                    name="image5"
                    value={form.image5}
                    onChange={handleChange}
                />
            </fieldset>
            <hr />
            {/* Submit Button */}
            {/* <button type="submit" className="submit-button">Create Spot</button> */}
            <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Creating Spot...' : 'Create Spot'}
            </button>
        </form>
    )
}

export default CreateNewSpot;