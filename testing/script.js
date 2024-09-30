document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageArea = document.getElementById('message-area');

    // Example users array (replace with your own user management)
    const users = ['Syncord', 'SyncordSync', 'Lezetho'];

    // Send message function
    const sendMessage = () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Append the message to the message area
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            const randomUser = users[Math.floor(Math.random() * users.length)];
            messageElement.innerHTML = `<span class="username">${randomUser}:</span> <span class="message-content">${messageText}</span>`;
            messageArea.appendChild(messageElement);

            // Clear the input field
            messageInput.value = '';

            // Scroll to the bottom of the message area
            messageArea.scrollTop = messageArea.scrollHeight;
        }
    };

    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
