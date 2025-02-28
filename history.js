document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-menu-btn').addEventListener('click', () => {
      document.getElementById('user-dropdown').classList.toggle('hidden');
  });

  const tripsCtx = document.getElementById('trips-chart').getContext('2d');
  new Chart(tripsCtx, {
      type: 'bar',
      data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
          datasets: [{
              label: 'Viagens',
              data: [4, 3, 2, 5, 3],
              backgroundColor: 'var(--primary-color)',
              borderColor: 'var(--secondary-color)',
              borderWidth: 1
          }]
      },
      options: { scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
});
