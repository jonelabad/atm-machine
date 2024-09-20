const balanceElement = document.getElementById("balance");
const withdrawButton = document.getElementById("withdrawButton");
const depositButton = document.getElementById("depositButton");
const withdrawAmount = document.getElementById("withdrawAmount");
const depositAmount = document.getElementById("depositAmount");
const messageElement = document.getElementById("message");
const receiptMessage = document.getElementById("receiptMessage");
const actionSelect = document.getElementById("actionSelect");
const withdrawSection = document.getElementById("withdrawSection");
const depositSection = document.getElementById("depositSection");

// Modal elements
const modal = document.getElementById("welcomeModal");
const proceedButton = document.getElementById("proceedButton");
const closeModal = document.getElementById("closeModal");
const atmContainer = document.querySelector(".atm-container");
const termsCheckbox = document.getElementById("termsCheckbox");
const userMessage = document.getElementById("userMessage");
const sendMessageButton = document.getElementById("sendMessageButton");

let balance = 10000;

function updateSection() {
    if (actionSelect.value === "withdraw") {
        withdrawSection.style.display = "block";
        depositSection.style.display = "none";
    } else {
        withdrawSection.style.display = "none";
        depositSection.style.display = "block";
    }
}

withdrawButton.addEventListener("click", () => {
    if (!termsCheckbox.checked) {
        messageElement.textContent = "You must agree to the Terms and Privacy Policy.";
        return;
    }
    const amount = parseFloat(withdrawAmount.value);
    if (isNaN(amount) || amount <= 0) {
        messageElement.textContent = "Please enter a valid amount.";
    } else if (amount > balance) {
        messageElement.textContent = "Insufficient funds.";
    } else {
        balance -= amount;
        balanceElement.textContent = balance.toFixed(2);
        messageElement.textContent = "Withdrawal successful!";
        
        const now = new Date();
        receiptMessage.textContent = `Withdrawal of ₱${amount} on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}.`;
        withdrawAmount.value = '';
    }
});

depositButton.addEventListener("click", () => {
    if (!termsCheckbox.checked) {
        messageElement.textContent = "You must agree to the Terms and Privacy Policy.";
        return;
    }
    const amount = parseFloat(depositAmount.value);
    if (isNaN(amount) || amount <= 0) {
        messageElement.textContent = "Please enter a valid amount.";
    } else {
        balance += amount;
        balanceElement.textContent = balance.toFixed(2);
        messageElement.textContent = "Deposit successful!";
        
        const now = new Date();
        receiptMessage.textContent = `Deposit of ₱${amount} on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}.`;
        depositAmount.value = '';
    }
});

// Message sending functionality
sendMessageButton.addEventListener("click", () => {
    const message = userMessage.value;
    if (message) {
        alert("Message sent: " + message);
        userMessage.value = '';
    } else {
        alert("Please enter a message.");
    }
});

// Modal functionality
window.onload = function() {
    modal.style.display = "block";
};

proceedButton.onclick = function() {
    modal.style.display = "none";
    atmContainer.style.display = "block";
};

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

updateSection();
