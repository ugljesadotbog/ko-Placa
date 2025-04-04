import React, { useEffect, useState } from "react";

const AI = ({ osobe, /* people, */ numOfPeople, billCount }) => {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  async function fetchGeneration() {
    // Preimenovano da bude jasnije
    setLoading(true);
    try {
      const numericBillCount = Number(billCount);

      if (isNaN(numericBillCount)) {
        console.error("Vrednost za billCount nije validan broj:", billCount);
        setResponseText("Greška: Iznos računa mora biti validan broj.");
        setLoading(false);
        return;
      }

      // Pozovi svoju backend API rutu
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Pošalji konvertovanu, numeričku vrednost
        body: JSON.stringify({ osobe, billCount: numericBillCount }), // Koristi numericBillCount
      });

      if (!response.ok) {
        // Pokušaj da pročitaš telo greške sa servera ako postoji
        let errorMsg = `HTTP greška! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg; // Koristi poruku iz API rute ako postoji
        } catch (e) {
          // Nije uspelo čitanje JSON-a, koristi osnovnu poruku
        }
        throw new Error(errorMsg);
      }

      // Dobij JSON odgovor od svoje API rute
      const data = await response.json();
      setResponseText(
        data.responseText || "Greška pri dobijanju podataka sa servera."
      );
    } catch (error) {
      console.error("Greška pri pozivu /api/generate:", error);
      setResponseText(
        error.message ||
          "Došlo je do neočekivane greške pri komunikaciji sa serverom."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (osobe && osobe.length > 0 && billCount != null && billCount !== "") {
      fetchGeneration();
    } else {
      if (
        osobe &&
        osobe.length > 0 &&
        (billCount == null || billCount === "")
      ) {
        setResponseText("Unesite ukupan iznos računa.");
      } else if (!osobe || osobe.length === 0) {
        setResponseText("Nedostaju podaci o osobama.");
      } else {
        setResponseText("Nedostaju podaci za pokretanje AI analize.");
      }
      setLoading(false); // Osiguraj da nije loading ako nema podataka
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osobe, billCount]); // Zavisnosti ostaju iste

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <p className="text-xl font-extralight mb-20 px-10 break-words w-full text-center">
        {" "}
        {/* Dodato break-words i text-center */}
        {loading ? "Generisanje predloga podele..." : responseText}
      </p>

      {/* Prikaz osoba ostaje isti */}
      <div className="flex flex-row gap-4 flex-wrap px-4 max-w-md mx-auto justify-center">
        {" "}
        {/* Dodato justify-center */}
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
