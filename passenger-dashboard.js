document.addEventListener("DOMContentLoaded", () => {
  let map = null;
  let markers = [];
  let selectedBalanceAmount = null;

  /* pegar os elementos necessarios */

  // Initialize Charts
  function initCharts() {
    // Passengers Chart
    const passengersCtx = document
      .getElementById("passengers-chart")
      .getContext("2d");
    const passengersChart = new Chart(passengersCtx, {
      type: "bar",
      data: {
        labels: ["6-8", "8-10", "10-12", "12-14", "14-16", "16-18", "18-20"],
        datasets: [
          {
            label: "Passageiros",
            data: [15, 28, 12, 22, 18, 32, 27],
            backgroundColor: "#5D5CDE",
            borderColor: "#4F4FB0",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Time Chart
    const timeCtx = document.getElementById("time-chart").getContext("2d");
    const timeChart = new Chart(timeCtx, {
      type: "line",
      data: {
        labels: ["Centro", "Hospital", "Universidade", "Shopping", "Estação"],
        datasets: [
          {
            label: "Tempo Médio (min)",
            data: [2, 4, 3, 5, 3],
            backgroundColor: "rgba(93, 92, 222, 0.2)",
            borderColor: "#5D5CDE",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Trips Chart
    const tripsCtx = document.getElementById("trips-chart").getContext("2d");
    const tripsChart = new Chart(tripsCtx, {
      type: "bar",
      data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
          {
            label: "Viagens",
            data: [4, 3, 2, 5, 3, 1, 0],
            backgroundColor: "#5D5CDE",
            borderColor: "#4F4FB0",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  // Initialize Map
  function initMap() {
    // Create map centered on a default location (Lisbon, Portugal)
    map = L.map("map").setView([38.736946, -9.142685], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add dummy bus markers
    addBusMarkers();
  }
  // Initialize map
  initMap();

  // Add bus markers to the map
  function addBusMarkers() {
    // Clear existing markers
    markers.forEach((marker) => map.removeLayer(marker));
    markers = [];

    // Bus data (would come from API in real application)
    const buses = [
      {
        id: 101,
        lat: 38.738,
        lng: -9.1427,
        route: "Centro - Hospital - Universidade",
        next: "Hospital",
        eta: 5,
      },
      {
        id: 203,
        lat: 38.7335,
        lng: -9.1485,
        route: "Estação - Shopping - Centro",
        next: "Shopping",
        eta: 10,
      },
      {
        id: 305,
        lat: 38.7415,
        lng: -9.1375,
        route: "Universidade - Hospital - Estação",
        next: "Hospital",
        eta: 3,
      },
    ];

    // Create custom bus icon
    const busIcon = L.divIcon({
      html: `<div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary-color text-white shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M13 7H7v6h6V7z" />
                 <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
               </svg>
             </div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add markers for each bus
    buses.forEach((bus) => {
      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(map);
      marker.bindPopup(`
          <div class="text-center">
              <div class="font-semibold">Ônibus ${bus.id}</div>
              <div class="text-sm">Rota: ${bus.route}</div>
              <div class="text-sm">Próxima paragem: ${bus.next} (${bus.eta} min)</div>
              <button class="mt-2 w-full px-3 py-1 bg-primary-color text-white text-sm rounded hover:bg-secondary-color">Acompanhar</button>
          </div>
      `);
      markers.push(marker);
    });

    // Simulate bus movement
    setInterval(() => {
      markers.forEach((marker, i) => {
        const latLng = marker.getLatLng();
        // Small random movement
        const newLat = latLng.lat + (Math.random() - 0.5) * 0.0003;
        const newLng = latLng.lng + (Math.random() - 0.5) * 0.0003;
        marker.setLatLng([newLat, newLng]);
      });
    }, 3000);
  }

  /* ativa o menu para baixo */
  document.getElementById("user-menu-btn").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.toggle("hidden");
  });
  // Show loading overlay
  function showLoading(text = "Carregando...") {
    elements.loadingText.textContent = text;
    elements.loadingOverlay.classList.remove("hidden");
  }
  // Hide loading overlay
  function hideLoading() {
    elements.loadingOverlay.classList.add("hidden");
  }
  // Simulate bus movement
  setInterval(() => {
    markers.forEach((marker, i) => {
      const latLng = marker.getLatLng();
      // Small random movement
      const newLat = latLng.lat + (Math.random() - 0.5) * 0.0003;
      const newLng = latLng.lng + (Math.random() - 0.5) * 0.0003;
      marker.setLatLng([newLat, newLng]);
    });
  }, 3000);


});
