// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, onChildAdded, push } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC65ZpkXJkyVJFOGZ9dDh14jmkQsRREQko",
    authDomain: "syncordsync.firebaseapp.com",
    databaseURL: "https://syncordsync-default-rtdb.firebaseio.com/",
    projectId: "syncordsync",
    storageBucket: "syncordsync.appspot.com",
    messagingSenderId: "690747596328",
    appId: "1:690747596328:web:b169c6b54c18a8e517df1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Retrieve user data from local storage
const userData = JSON.parse(localStorage.getItem('user'));
if (userData) {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('profile-pic').src = userData.profilePic;
    document.getElementById('profile-pic').style.display = 'block';
    document.getElementById('username').style.display = 'inline';
} else {
    window.location.href = 'https://syncord.netlify.app/login.html'; // Change this to your login page URL
}

// Chat functionality
const chatContainer = document.getElementById('message-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Load messages from Firebase
function loadMessages() {
    const messagesRef = ref(database, 'messages');
    onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.username}: ${message.text}`;
        chatContainer.appendChild(messageElement);
    });
}

// Save messages to Firebase
function saveMessage(username, text) {
    const message = {
        username: username,
        text: text,
        timestamp: Date.now()
    };
    const messagesRef = ref(database, 'messages');
    push(messagesRef, message);
}

// Send message on button click
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText) {
        saveMessage(userData.username, messageText); // Save message
        messageInput.value = ''; // Clear input field
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }
});

// Allow sending messages with the Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Load messages on page load
loadMessages();
