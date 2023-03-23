import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Addcontact() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [loading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const HandleImageUploaded = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageUrl(event?.target?.result);
        };
        reader.readAsDataURL(file);
    };

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/api/addcontact", {
                imageUrl,
                location,
                lastName,
                firstName,
                phoneNumber,
                email,
            })
            .then((response) => {
                router.push("/");
            })
            .catch((error) => {
                console.error(error, "errorrrr");
            });
    }

    return (
        <div>
            <div className="form_conatianer">
                <div className="contactandform">
                    <div>
                        <h1 className="title_text" onClick={() => router.push("/")}>
                            All Contacts
                        </h1>
                    </div>

                    <div>
                        <h1
                            className="title_text"
                            onClick={() => router.push("/addcontact")}
                        >
                            Add Contact
                        </h1>
                    </div>
                </div>

                <div className="form_container">
                    <form onSubmit={handleSubmit}>
                        <div className="form_body">
                            <div className="form_first_name_label">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form_first_name_label">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="form_first_name_label">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form_first_name_label">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="form_first_name_label">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="form_first_name_label">
                                <label htmlFor="location">Image</label>
                                <input
                                    type="file"
                                    id="location"
                                    required
                                    accept="image/*"
                                    onChange={HandleImageUploaded}
                                />
                            </div>

                            <div></div>

                            <div className="submit_container">
                                <div className="submit_btn">
                                    <input
                                        className="img-file"
                                        id="image-upload"
                                        type="submit"
                                        value={`${loading ? "loading..." : "Submit"}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addcontact;
