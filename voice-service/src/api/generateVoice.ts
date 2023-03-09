import axios from "axios";
import * as fs from "fs";

export const generateVoice = async (text: string): Promise<Buffer> => {
  const encodedParams = getEncodedParams(text);
  const response = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key: process.env.VOICE_TEXT_API_KEY },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  const data = Buffer.from(response.data);
  return data;
};

const getEncodedParams = (text: string) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("src", text);
  encodedParams.append("hl", "en-us");
  encodedParams.append("r", "0");
  encodedParams.append("c", "mp3");
  return encodedParams;
};
