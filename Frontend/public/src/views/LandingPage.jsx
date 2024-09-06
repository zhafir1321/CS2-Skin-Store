import { Link } from "react-router-dom";
import video from "../assets/csgo.mp4";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function LandingPage() {
  const [fact, setFact] = useState("");

  async function funFact() {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API;
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
      const chatSession = model.startChat({
        generationConfig,
      });

      const result = await chatSession.sendMessage(
        "Give me one fun fact about counter strike 2 skins",
      );
      setFact(result.response.text());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-full h-screen relative">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="text-white justify-items-center align-baseline grid grid-rows-4">
            <h1 className="text-3xl font-extrabold items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              CS2 Skin Store
            </h1>
            <p className="font-semibold text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              The most trusted site to buy CS2 Skins
            </p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-300 text-white focus:outline-none transition delay-150 hover:bg-opacity-20 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                <Link to={"/register"}>Register Now</Link>
              </button>
              <button
                type="button"
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-300 text-white focus:outline-none transition delay-150 hover:bg-opacity-20 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                <Link to={"/login"}>Login Now</Link>
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={funFact}
                type="button"
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-300 text-white focus:outline-none transition delay-150 hover:bg-opacity-20 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-6 py-2.5"
              >
                Click Me!
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg border border-gray-300 max-w-md">
                {fact ? (
                  <p className="text-sm font-semibold text-center text-white">
                    {fact}
                  </p>
                ) : (
                  <p className="text-sm text-gray-300 text-center">
                    Click the button for a fun fact!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
