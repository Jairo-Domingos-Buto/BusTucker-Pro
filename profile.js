const elements = {
  // Profile
  profileAvatar: document.getElementById("profile-avatar"),
  profileName: document.getElementById("profile-name"),
  profileEmail: document.getElementById("profile-email"),
  balanceAmount: document.getElementById("balance-amount"),
  paymentCode: document.getElementById("payment-code"),
  refreshCodeBtn: document.getElementById("refresh-code-btn"),
  profileNameInput: document.getElementById("profile-name-input"),
  profileEmailInput: document.getElementById("profile-email-input"),
  saveProfileBtn: document.getElementById("save-profile-btn"),

  // Notifications
  notificationBtn: document.getElementById("notification-btn"),
  notificationBadge: document.getElementById("notification-badge"),
  notificationPanel: document.getElementById("notification-panel"),
  notificationBackdrop: document.getElementById("notification-backdrop"),
  closeNotificationPanel: document.getElementById("close-notification-panel"),
  notificationList: document.getElementById("notification-list"),
  noNotifications: document.getElementById("no-notifications"),
  clearNotifications: document.getElementById("clear-notifications"),

  // Add Balance
  addBalanceBtn: document.getElementById("add-balance-btn"),
  addBalanceModal: document.getElementById("add-balance-modal"),
  addBalanceBackdrop: document.getElementById("add-balance-backdrop"),
  balanceOptions: document.querySelectorAll(".balance-option"),
  customAmount: document.getElementById("custom-amount"),
  confirmAddBalance: document.getElementById("confirm-add-balance"),
  cancelAddBalance: document.getElementById("cancel-add-balance"),

  // Loading
  loadingOverlay: document.getElementById("loading-overlay"),
  loadingText: document.getElementById("loading-text"),
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.getElementById("user-menu-btn").addEventListener("click", () => {
      document.getElementById("user-dropdown").classList.toggle("hidden");
    });

    document
      .getElementById("refresh-code-btn")
      .addEventListener("click", () => {
        const newCode = generatePaymentCode();
        document.getElementById("payment-code").textContent = newCode;
      });

    document
      .getElementById("save-profile-btn")
      .addEventListener("click", () => {
        showLoading("Salvando alterações...");
        setTimeout(() => {
          document.getElementById("profile-name").textContent =
            document.getElementById("profile-name-input").value;
          document.getElementById("profile-email").textContent =
            document.getElementById("profile-email-input").value;
          hideLoading();
        }, 1000);
      });

    // Generate random payment code
    function generatePaymentCode() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "BTRK-";
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      code += "-";
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }

  // Simulate API call
  setTimeout(() => {
    // Show success notification
    const notification = document.createElement("div");
    notification.classList.add(
      "bg-white",
      "dark:bg-gray-800",
      "p-4",
      "rounded-lg",
      "shadow",
      "border-l-4",
      "border-green-500",
      "fade-in"
    );
    notification.innerHTML = `
                  <div class="flex items-start">
                      <div class="flex-shrink-0">
                          <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                      </div>
                      <div class="ml-3 w-0 flex-1">
                          <p class="text-sm font-medium text-gray-900 dark:text-white">Configurações salvas</p>
                          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Suas preferências foram atualizadas com sucesso.</p>
                          <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">Agora mesmo</p>
                      </div>
                  </div>
              `;
    elements.notificationList.prepend(notification);
    updateNotificationCount(
      parseInt(elements.notificationBadge.textContent || "0") + 1
    );

    hideLoading();
  }, 1000);
});

// Add Balance
elements.addBalanceBtn.addEventListener("click", () => {
  elements.addBalanceModal.classList.remove("hidden");
  selectedBalanceAmount = null;
  elements.customAmount.value = "";

  // Remove selection from all options
  elements.balanceOptions.forEach((option) => {
    option.classList.remove("bg-primary-color", "text-white");
  });
});

elements.addBalanceBackdrop.addEventListener("click", () => {
  elements.addBalanceModal.classList.add("hidden");
});

elements.cancelAddBalance.addEventListener("click", () => {
  elements.addBalanceModal.classList.add("hidden");
});

// Balance options
elements.balanceOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Clear selection from all options
    elements.balanceOptions.forEach((opt) => {
      opt.classList.remove("bg-primary-color", "text-white");
    });

    // Select this option
    option.classList.add("bg-primary-color", "text-white");

    // Store selected amount
    selectedBalanceAmount = parseInt(option.textContent.replace("€", ""));

    // Clear custom amount
    elements.customAmount.value = "";
  });
});

// Custom amount input
elements.customAmount.addEventListener("input", () => {
  if (elements.customAmount.value) {
    // Clear selection from preset options
    elements.balanceOptions.forEach((option) => {
      option.classList.remove("bg-primary-color", "text-white");
    });
    selectedBalanceAmount = null;
  }
});

// Confirm add balance
elements.confirmAddBalance.addEventListener("click", () => {
  const amount =
    selectedBalanceAmount || parseFloat(elements.customAmount.value);

  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Por favor, selecione ou insira um valor válido.");
    return;
  }

  showLoading("Processando pagamento...");
  elements.addBalanceModal.classList.add("hidden");

  // Simulate API call
  setTimeout(() => {
    // Update balance
    currentUser.balance += amount;
    elements.balanceAmount.textContent = `${currentUser.balance.toFixed(2)} KZ`;

    // Show success notification
    const notification = document.createElement("div");
    notification.classList.add(
      "bg-white",
      "dark:bg-gray-800",
      "p-4",
      "rounded-lg",
      "shadow",
      "border-l-4",
      "border-green-500",
      "fade-in"
    );
    notification.innerHTML = `
                  <div class="flex items-start">
                      <div class="flex-shrink-0">
                          <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                      </div>
                      <div class="ml-3 w-0 flex-1">
                          <p class="text-sm font-medium text-gray-900 dark:text-white">Saldo atualizado</p>
                          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Seu saldo foi recarregado com ${amount.toFixed(
                            2
                          )} kz. Novo saldo: ${currentUser.balance.toFixed(
      2
    )} kz</p>
                          <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">Agora mesmo</p>
                      </div>
                  </div>
              `;
    elements.notificationList.prepend(notification);
    updateNotificationCount(
      parseInt(elements.notificationBadge.textContent || "0") + 1
    );

    hideLoading();
  }, 1500);
});
