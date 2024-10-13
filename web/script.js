// Lakukan pengambilan data dari file JSON menggunakan fetch API
let container = document.querySelector(".container");
let minCon = document.querySelector(".countmin");
let maxCon = document.querySelector(".countmax");
fetch("jawa.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse response body as JSON
  })
  .then((data) => {
    data.forEach((e) => {
      container.innerHTML += `
    <div class="kab">
        <div class="nama">${e.kabupaten}</div>
        <div class="suhumin">${e.suhuMinimal}</div>
        <div class="suhumax">${e.suhuMaksimal}</div>
      </div>
        `;
    });

    // data
    function countSame(data, type) {
      const counts = {};
      data.forEach((item) => {
        const temp = item[type];
        if (counts[temp]) {
          counts[temp]++;
        } else {
          counts[temp] = 1;
        }
      });
      return counts;
    }

    const countMin = countSame(data, "suhuMinimal");
    const countMax = countSame(data, "suhuMaksimal");
    for (const temp in countMin) {
      minCon.innerHTML += `
      <div class="item">
      <div class="suhu">${temp}</div>
      <div class="jumlah">${countMin[temp]}</div>
    </div>
      `;
    }
    for (const temp in countMax) {
      maxCon.innerHTML += `
      <div class="item">
      <div class="suhu">${temp}</div>
      <div class="jumlah">${countMax[temp]}</div>
    </div>
        `;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
