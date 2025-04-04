import React, { useEffect, useState } from "react";

const AI = ({ osobe, numOfPeople, billCount }) => {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  async function geminiAI() {
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Bazirano na ukupno ${
            osobe.length
          } ljudi, gde su raspoloživi iznosi za svaku osobu dati na sledeći način: ${osobe
            .map(
              (osoba) =>
                `${osoba.name || "Osoba bez imena"} ima ${
                  osoba.money == null
                    ? "nepoznat iznos"
                    : osoba.money + " dinara"
                } i njegova stvar sa menija kosta ${osoba.costOfItem}`
            )
            .join(", ")},
      potrebno je podeliti trošak računa od ${billCount} dinara.
      Predloži konkretno ko koliko treba da plati da bi se račun pokrio, uzimajući u obzir koliko ko ima novca, koliko kosta njegova/njena stvar sa menija. Budi jasan i koncizan. Nije potrebno da se ravnomerno podeli novac, vec da se pronadje najoptimalnije resenje gde svako isplacuje svoj dug, i u zavisnosti od kusura mu se vraca novac.
      Vrati samo tekstualni odgovor podele. Nemoj koristiti markdown formatiranje (npr. bez **, * ili #).`,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();
      setResponseText(data.text);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (osobe.length > 0 && billCount > 0) {
      geminiAI();
    }
  }, [osobe, billCount]);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <p className="text-xl font-extralight mb-20 px-10 break-words w-full text-center">
        {" "}
        {loading ? "Generisanje predloga podele..." : responseText}
        {console.log("Šaljemo podatke:", JSON.stringify(osobe))}
      </p>

      <div className="flex flex-row gap-4 flex-wrap px-4 max-w-md mx-auto justify-center">
        {" "}
        {osobe.map((osoba, index) => (
          <div
            key={index}
            className="flex-grow basis-[calc(33%-1rem)] flex justify-center items-center bg-buttonbackground rounded-xl py-2 px-4 text-center text-sm" // Malo podešen basis i padding
          >
            {osoba.name} - {osoba.money} din.
          </div>
        ))}
      </div>
    </div>
  );
};

export default AI;
