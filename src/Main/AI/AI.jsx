import React, { use, useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { people } from "../../db/people";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const AI = ({ osobe, people, numOfPeople, billCount }) => {
  const [loading, setLoading] = React.useState(false);
  const [responseText, setResponseText] = useState("");

  async function main() {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    setLoading(true);
    try {
      const response = await model.generateContent([
        {
          text: `Bazirano na ukupno ${
            osobe.length
          } ljudi, gde su raspoloživi iznosi za svaku osobu dati na sledeći način: ${osobe
            .map((osoba) => `${osoba.name} ima ${osoba.money} dinara`)
            .join(
              ", "
            )}, potrebno je podeliti trošak računa od ${billCount} dinara...`,
        },
      ]);
      setResponseText(response.text || "Greska pri dobijanju podataka");
    } catch (error) {
      console.error("Error generating content:", error);
      setResponseText(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <p className="text-xl font-extralight mb-20 px-10">
        {loading ? "Učitavanje..." : responseText}
      </p>

      <div className="flex flex-row gap-4 flex-wrap px-4 max-w-md mx-auto">
        {osobe.map((osoba, index) => (
          <div
            key={index}
            className="flex-grow basis-[33%] flex justify-center items-center bg-buttonbackground rounded-xl py-2 px-8 text-center text-sm"
          >
            {osoba.name} - {osoba.money} din.
          </div>
        ))}
      </div>
    </div>
  );
};

export default AI;
