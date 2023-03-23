import axios from "axios";

const { API_KEY_STORYBLOK_AUTH_TOKEN, API_KEY_STORYBLOK_SPACE_ID } =
    process.env;

export default async function addcontact(req, res) {
    const { imageUrl, location, lastName, firstName, phoneNumber, email, id } =
        req.body;

    const payload = {
        story: {
            name: firstName,
            slug: lastName,
            content: {
                imagetwo: imageUrl,
                location: location,
                component: "ContactForm",
                image_one: imageUrl,
                last_name: lastName?.toLowerCase(),
                first_name: firstName?.toLowerCase(),
                phone_number: phoneNumber,
                email_address: email,
                body: [],
            },
        },
        publish: 1,
    };
    try {
        const response = await axios.put(
            `https://mapi.storyblok.com/v1/spaces/${API_KEY_STORYBLOK_SPACE_ID}/stories/${id}`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: API_KEY_STORYBLOK_AUTH_TOKEN,
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return res.status(200).json({ message: "success." });
        } else {
            return res.status;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
