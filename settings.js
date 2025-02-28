document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-menu-btn').addEventListener('click', () => {
      document.getElementById('user-dropdown').classList.toggle('hidden');
  });

  document.getElementById('save-settings-btn').addEventListener('click', () => {
      showLoading('Salvando configurações...');
      setTimeout(() => hideLoading(), 1000);
  });
});
