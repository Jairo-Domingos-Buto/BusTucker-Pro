document.addEventListener('DOMContentLoaded', () => {
  let map = null;

  function initMap() {
      map = L.map('map').setView([38.736946, -9.142685], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      addBusMarkers();
  }

  function addBusMarkers() {
      const busIcon = L.divIcon({
          html: '<div style="background: var(--primary-color); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z" /><path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" /></svg></div>',
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
      });

      const buses = [
          { id: 101, lat: 38.738, lng: -9.1427, route: 'Centro - Hospital', next: 'Hospital', eta: 5 }
      ];

      buses.forEach(bus => {
          const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(map);
          marker.bindPopup(`Ônibus ${bus.id}<br>Rota: ${bus.route}<br>Próxima: ${bus.next} (${bus.eta} min)`);
      });
  }

  document.getElementById('search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      showLoading('Buscando ônibus...');
      setTimeout(() => {
          const busList = document.getElementById('bus-list');
          const noBuses = document.getElementById('no-buses-message');
          busList.classList.remove('hidden');
          noBuses.classList.add('hidden');
          hideLoading();
      }, 1000);
  });

  document.getElementById('user-menu-btn').addEventListener('click', () => {
      document.getElementById('user-dropdown').classList.toggle('hidden');
  });

  initMap();
});
