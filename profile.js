
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-menu-btn').addEventListener('click', () => {
      document.getElementById('user-dropdown').classList.toggle('hidden');
  });

  document.getElementById('refresh-code-btn').addEventListener('click', () => {
      const newCode = generatePaymentCode();
      document.getElementById('payment-code').textContent = newCode;
  });

  document.getElementById('save-profile-btn').addEventListener('click', () => {
      showLoading('Salvando alterações...');
      setTimeout(() => {
          document.getElementById('profile-name').textContent = document.getElementById('profile-name-input').value;
          document.getElementById('profile-email').textContent = document.getElementById('profile-email-input').value;
          hideLoading();
      }, 1000);
  });

  document.getElementById('add-balance-btn').addEventListener('click', () => {
      alert('Funcionalidade de adicionar saldo ainda não implementada.');
  });
});
