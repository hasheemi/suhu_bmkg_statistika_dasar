const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Lokasi folder yang berisi file XML
const folderPath = "./data/xml";
const jsonpath = "./data/json";

// Membaca isi folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Loop melalui setiap file
  files.forEach((file) => {
    // Pastikan file memiliki ekstensi .xml
    if (path.extname(file) === ".xml") {
      // Baca isi file XML
      fs.readFile(path.join(folderPath, file), "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        // Konversi XML ke JSON
        xml2js.parseString(data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            return;
          }

          // Simpan hasil ke file JSON
          const jsonFileName = file.replace(".xml", ".json");
          fs.writeFile(
            path.join(jsonpath, jsonFileName),
            JSON.stringify(result, null, 2),
            "utf8",
            (err) => {
              if (err) {
                console.error("Error writing JSON file:", err);
              } else {
                console.log(`File ${jsonFileName} berhasil disimpan.`);
              }
            }
          );
        });
      });
    }
  });
});
