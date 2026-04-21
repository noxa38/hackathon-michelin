import axios from "axios";
import fs from "fs";

const url = "https://overpass-api.de/api/interpreter";

const query = `
[out:json][timeout:50];
(
  node["tourism"="hotel"](35,-10,60,30);
  way["tourism"="hotel"](35,-10,60,30);
  relation["tourism"="hotel"](35,-10,60,30);
);
out center;
`;

async function run() {
  console.log("Scraping Europe hôtels 🌍...");

  try {
    const res = await axios.post(url, query, {
      headers: { "Content-Type": "text/plain" },
    });

    const hotels = res.data.elements.slice(0, 100); // on limite à 100

    let csv = "name,lat,lon,city,country\n";

    hotels.forEach((h) => {
      csv += `${h.tags?.name || "Unknown"},${h.lat},${h.lon},${h.tags?.["addr:city"] || ""},${h.tags?.["addr:country"] || ""}\n`;
    });

    fs.writeFileSync("hotels_europe.csv", csv);

    console.log("✅ CSV généré avec", hotels.length, "hôtels");
  } catch (err) {
    console.error("Erreur :", err.message);
  }
}

run();