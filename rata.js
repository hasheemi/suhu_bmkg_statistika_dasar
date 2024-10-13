const fs = require("fs");

// Baca file JSON
fs.readFile("forecast.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse data JSON
    const jsonData = JSON.parse(data);
    let kabData = [];
    for (let i = 0; i <= 37; i++) {
      let kab = jsonData.data.forecast[0].area[i];
      let nama = kab.$["description"];
      let minSuhu = 0;
      let maxSuhu = 0;
      for (let j = 0; j <= 2; j++) {
        // console.log(kab.parameter[4].timerange[j].value[0]._);
        minSuhu += +kab.parameter[4].timerange[j].value[0]._;
        maxSuhu += +kab.parameter[2].timerange[j].value[0]._;
      }
      console.log(minSuhu);
      kabData.push({
        kabupaten: nama,
        index: i + 1,
        suhuMinimal: Math.floor(minSuhu / 3),
        suhuMaksimal: Math.floor(maxSuhu / 3),
      });
    }
    const newDataJson = JSON.stringify(kabData, null, 2); // Stringify newData menjadi JSON
    fs.writeFile("rata.json", newDataJson, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data berhasil disimpan ke file rata.json");
      }
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
