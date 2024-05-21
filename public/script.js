function sendChat() {
    const input = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();

    if (message) {
        const chatMessage = document.createElement('div');
        chatMessage.textContent = 'You: ' + message;
        chatBox.appendChild(chatMessage);

        // Simulate a response
        setTimeout(() => {
            const response = document.createElement('div');
            response.textContent = 'Server: ' + generateResponse(message);
            chatBox.appendChild(response);
        }, 1000);
    }
    input.value = '';  // Clear input after sending
}

function generateResponse(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('bassist')) {
        return 'A bassist is on the way to you!';
    } else {
        return "Please send 'cofront', 'fiddle', 'bass', 'guitar', 'keys', or 'drums' for a musician.";
    }
}
