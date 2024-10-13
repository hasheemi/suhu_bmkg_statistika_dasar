const fs = require("fs");
const path = require("path");
const folderPath = "./data/json";
let kabData = [];

// Membaca isi folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }
  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      fs.readFile(path.join(folderPath, file), "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        try {
          const jsonData = JSON.parse(data);
          for (let i = 0; i <= jsonData.data.forecast[0].area.length - 1; i++) {
            let kab = jsonData.data.forecast[0].area[i];
            let nama = kab["$"]["description"];
            console.log(nama);
            let minSuhu = 0;
            let maxSuhu = 0;
            if (!nama.includes("Pelabuhan")) {
              for (let j = 0; j <= 2; j++) {
                minSuhu += +kab.parameter[4].timerange[j].value[0]._ ?? 0;
                maxSuhu += +kab.parameter[2].timerange[j].value[0]._ ?? 0;
              }
            } else {
              console.log(nama + "xxxxxx");
              minSuhu = 0;
              maxSuhu = 0;
            }
            kabData.push({
              kabupaten: nama,
              suhuMinimal: Math.floor(minSuhu / 3),
              suhuMaksimal: Math.floor(maxSuhu / 3),
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    }
  });
});

setTimeout(() => {
  const newDataJson = JSON.stringify(kabData, null, 2); // Stringify newData menjadi JSON
  fs.writeFile("jawa.json", newDataJson, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data berhasil disimpan ke file jawa.json");
    }
  });
}, 5000);

// Baca isi file JSON
//   fs.readFile(path.join(folderPath, file), 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       return;
//     }

//     // Lakukan sesuatu dengan data JSON
//     console.log(data);
//   });
