// Function to scroll to the features section smoothly
function scrollToSection() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Simulating a user object in local storage
// In a real application, you would use a proper authentication system
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    // If user is logged in, show their profile picture and username
    document.getElementById('profile-pic').src = user.profilePic; // Set the profile picture URL
    document.getElementById('username').innerText = user.username; // Set the username
    document.getElementById('profile-pic').style.display = 'block'; // Show the profile picture
    document.getElementById('username').style.display = 'block'; // Show the username
} else {
    // If not logged in, redirect to login page
    window.location.href = 'https://syncord.netlify.app/login.html'; // Change this to your login page URL
}

// Chat functionality
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Load messages from local storage
const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.username}: ${message.text}`;
        chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
};

// Save messages to local storage
const saveMessage = (username, text) => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ username, text });
    localStorage.setItem('messages', JSON.stringify(messages));
};

loadMessages(); // Load messages on page load

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText) {
        saveMessage(user.username, messageText); // Save message
        const messageElement = document.createElement('div');
        messageElement.textContent = `${user.username}: ${messageText}`;
        chatContainer.appendChild(messageElement);
        messageInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }
});

// Allow sending messages with the Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
