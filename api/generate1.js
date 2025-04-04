// generate.js (ISPRAVLJENA VERZIJA 2 - Rukovanje Request Body-jem)
import GoogleGenAIPackage from "@google/genai"; // Importuj default export objekat
const { GoogleGenerativeAI } = GoogleGenAIPackage; // Destrukturiraj potrebnu klasu iz objekta
// Ispravljen import

export default async function handler(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "GREŠKA: GEMINI_API_KEY nije podešen u environment varijablama."
    );
    return new Response(
      JSON.stringify({
        error: "Serverska greška: Nedostaje API ključ konfiguracija.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Provera metode pre čitanja tela
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metod nije dozvoljen. Koristi POST." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", Allow: "POST" },
      }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    let bodyData;

    try {
      if (request.body) {
        // Ako request.body postoji ali nije objekat (može biti string ili buffer u nekim slučajevima)
        if (
          typeof request.body === "string" &&
          request.headers.get("content-type")?.includes("application/json")
        ) {
          bodyData = JSON.parse(request.body);
        } else if (typeof request.body === "object" && request.body !== null) {
          bodyData = request.body;
        }
        // Dodaj još provera ako je potrebno (npr. za Buffer)
      }

      // Ako bodyData još nije definisan, pokušaj sa request.json() (za Edge ili kompatibilne runtimove)
      if (!bodyData && typeof request.json === "function") {
        bodyData = await request.json();
      }
      // Ako i dalje nema bodyData, a request je stream (Node.js fallback)
      else if (!bodyData && request.readable) {
        // Provera da li je readable stream
        const buffer = [];
        // @ts-ignore - request možda nema asyncIterator, ali vredi probati
        for await (const chunk of request) {
          buffer.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
        }
        const rawBody = Buffer.concat(buffer).toString("utf8");
        if (!rawBody) {
          throw new Error("Telo zahteva je prazno.");
        }
        bodyData = JSON.parse(rawBody);
      }

      // Ako ni posle svega nismo dobili bodyData
      if (!bodyData) {
        console.error(
          "Nije uspelo čitanje tela zahteva. Request object keys:",
          Object.keys(request)
        );
        throw new Error("Nije moguće pročitati telo zahteva (body).");
      }
    } catch (parseError) {
      console.error("Greška pri čitanju/parsiranju tela zahteva:", parseError);
      // Vrati specifičnu grešku za loš JSON ili problem sa čitanjem
      return new Response(
        JSON.stringify({
          error: `Greška pri obradi podataka iz zahteva: ${parseError.message}`,
        }),
        {
          status: 400, // 400 Bad Request
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // --- KRAJ NOVOG DELA ---

    // Sada koristi bodyData umesto direktnog poziva request.json()
    const { osobe, billCount } = bodyData;

    // Validacija podataka (ostaje ista)
    if (
      !osobe ||
      !Array.isArray(osobe) ||
      osobe.length === 0 ||
      billCount == null ||
      typeof billCount !== "number" ||
      osobe.some(
        (o) => typeof o.name !== "string" || typeof o.money !== "number"
      ) // Dodatna provera tipova unutar niza
    ) {
      console.warn("Neispravni podaci primljeni:", { osobe, billCount }); // Loguj primljene podatke za debug
      return new Response(
        JSON.stringify({
          error:
            'Neispravni ili nedostajući podaci: "osobe" (mora biti niz objekata sa "name"[string] i "money"[number]) ili "billCount" (mora biti broj).',
        }),
        {
          status: 400, // 400 Bad Request
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Kreiraj prompt (ostaje isto)
    const prompt = `Bazirano na ukupno ${
      osobe.length
    } ljudi, gde su raspoloživi iznosi za svaku osobu dati na sledeći način: ${osobe
      .map(
        (osoba) =>
          `${osoba.name || "Osoba bez imena"} ima ${
            osoba.money == null ? "nepoznat iznos" : osoba.money + " dinara"
          }`
      )
      .join(", ")},
      potrebno je podeliti trošak računa od ${billCount} dinara.
      Predloži konkretno ko koliko treba da plati da bi se račun pokrio, uzimajući u obzir koliko ko ima novca. Budi jasan i koncizan.
      Vrati samo tekstualni odgovor podele. Nemoj koristiti markdown formatiranje (npr. bez **, * ili #).`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
    console.log("Šaljem prompt Gemini API-ju..."); // Log pre poziva

    const result = await model.generateContent(prompt);
    console.log("Primljen odgovor od Gemini API-ja."); // Log posle poziva

    // Sigurniji način za dobijanje teksta (ostaje isto)
    let text = "Nije dobijen odgovor od AI modela.";
    if (
      result &&
      result.response &&
      typeof result.response.text === "function"
    ) {
      text = await result.response.text(); // Čekaj text() funkciju
    } else {
      console.warn("Neočekivan format odgovora od Gemini API:", result);
      text = "Došlo je do problema pri čitanju odgovora od AI servisa.";
    }

    console.log("Generisan tekst:", text);

    // Vrati uspešan odgovor (ostaje isto)
    return new Response(JSON.stringify({ responseText: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Greška unutar /api/generate glavnog try-catch bloka:",
      error
    );

    let errorMessage = "Došlo je do neočekivane greške na serveru.";
    let statusCode = 500;

    // Bolje rukovanje greškama
    if (
      error.message.includes("API key") ||
      error.message.includes("permission denied")
    ) {
      errorMessage =
        "Problem sa pristupom AI servisu (API ključ ili dozvole). Proverite konfiguraciju.";
      statusCode = 500; // Ili 503 Service Unavailable
    } else if (error.message.includes("quota")) {
      errorMessage = "Premašena kvota za korišćenje AI servisa.";
      statusCode = 429; // Too Many Requests
    } else if (error instanceof SyntaxError) {
      errorMessage =
        "Greška u formatu podataka poslatih serveru (nije validan JSON).";
      statusCode = 400;
    } else if (
      error.message.includes("timed out") ||
      error.message.includes("deadline exceeded")
    ) {
      errorMessage = "Operacija generisanja je trajala predugo i prekinuta je.";
      statusCode = 504; // Gateway Timeout
    }
    // Možeš dodati još specifičnih provera za Gemini greške ako ih budeš nailazio

    console.log(`Šaljem error odgovor (status ${statusCode}):`, {
      error: errorMessage,
    });

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
