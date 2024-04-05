import { json } from "express";

const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    const apiResult = await fetch(API_URL);
    const jsonResult = await apiResult.json();
    return jsonResult.content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    return content.match(/<s>([\w ,.]*)?<\/s>/g);
};

export { fetchContent, parseContentIntoSentences };
