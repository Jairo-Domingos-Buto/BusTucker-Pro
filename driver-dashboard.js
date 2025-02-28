document.addEventListener('DOMContentLoaded', () => {
  function initCharts() {
      const passengersCtx = document.getElementById('passengers-chart').getContext('2d');
      new Chart(passengersCtx, {
          type: 'bar',
          data: {
              labels: ['6-8', '8-10', '10-12', '12-14', '14-16'],
              datasets: [{
                  label: 'Passageiros',
                  data: [15, 28, 12, 22, 18],
                  backgroundColor: 'var(--primary-color)',
                  borderColor: 'var(--secondary-color)',
                  borderWidth: 1
              }]
          },
          options: { scales: { y: { beginAtZero: true } } }
      });

      const timeCtx = document.getElementById('time-chart').getContext('2d');
      new Chart(timeCtx, {
          type: 'line',
          data: {
              labels: ['Centro', 'Hospital', 'Universidade'],
              datasets: [{
                  label: 'Tempo Médio (min)',
                  data: [2, 4, 3],
                  borderColor: 'var(--primary-color)',
                  borderWidth: 2
              }]
          },
          options: { scales: { y: { beginAtZero: true } } }
      });
  }

  document.getElementById('user-menu-btn').addEventListener('click', () => {
      document.getElementById('user-dropdown').classList.toggle('hidden');
  });

  document.getElementById('increment').addEventListener('click', () => {
      const count = parseInt(document.getElementById('passenger-count').textContent);
      document.getElementById('passenger-count').textContent = count + 1;
  });

  document.getElementById('decrement').addEventListener('click', () => {
      const count = parseInt(document.getElementById('passenger-count').textContent);
      if (count > 0) document.getElementById('passenger-count').textContent = count - 1;
  });

  document.getElementById('update-status-btn').addEventListener('click', () => {
      showLoading('Atualizando status...');
      setTimeout(() => hideLoading(), 1000);
  });

  document.getElementById('service-status').addEventListener('change', () => {
      document.getElementById('status-text').textContent = 
          document.getElementById('service-status').checked ? 'Em serviço' : 'Fora de serviço';
  });

  initCharts();
});
