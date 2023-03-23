import axios from "axios";

import StoryblokClient from "storyblok-js-client";

const { API_KEY_STORYBLOK_AUTH_TOKEN, API_KEY_STORYBLOK_SPACE_ID } =
    process.env;

export default async function handler(req, res) {
    const { id } = req.body;

    const Storyblok = new StoryblokClient({
        oauthToken: `${API_KEY_STORYBLOK_AUTH_TOKEN}`,
    });


    try {

        const response = await
            Storyblok.delete(
                `spaces/${API_KEY_STORYBLOK_SPACE_ID}/stories/${id}`
            )
        if (response.status === 200) {
            res.status(200).json({ message: "Data deleted successfully." });
        } else {
            throw new Error("Unexpected response from Storyblok API");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
