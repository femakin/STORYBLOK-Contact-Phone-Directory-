import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import StoryblokClient from "storyblok-js-client";

const { API_KEY_STORYBLOK_ACCESS_TOKEN, API_KEY_STORYBLOK_AUTH_TOKEN } = process.env;

storyblokInit({
    accessToken: `${API_KEY_STORYBLOK_ACCESS_TOKEN}`,
    use: [apiPlugin],
    cache: {
        clear: "auto",
        type: "memory",
    },
});

const storyblokApi = getStoryblokApi();

// const Storyblok = new StoryblokClient({
//     oauthToken: `${API_KEY_STORYBLOK_AUTH_TOKEN}`,
// });



export default async function handler(req, res) {
    try {
        const { data } = await storyblokApi.get("cdn/stories", {version: "published" });
        res.status(200).json({ data });

        console.log(data, 'dataaaa')

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
