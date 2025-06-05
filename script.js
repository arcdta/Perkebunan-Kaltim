// Inisialisasi peta
var map = L.map('map').setView([-7.4, 109.2], 13); // Sesuaikan koordinat awal

// Tambahkan tile layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load file GeoJSON lokal
fetch('atribut.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          let popupContent = '';
          for (let key in feature.properties) {
            popupContent += `<strong>${key}:</strong> ${feature.properties[key]}<br>`;
          }
          layer.bindPopup(popupContent);
        }
      }
    }).addTo(map);
  });
