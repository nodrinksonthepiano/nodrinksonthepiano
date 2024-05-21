document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chat = document.getElementById('chat');
    let artistName = '';

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        // Check if the artist name has been set
        if (!artistName) {
            artistName = message;
            const welcomeMessage = document.querySelector('h1');
            welcomeMessage.textContent = `Welcome, ${artistName}...`;
            messageInput.placeholder = "Ask for cofront, drums, bass, guitar, keys, or fiddle...";
            messageInput.value = '';
            return;
        }

        // Display the user's message in the chat
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = `${artistName}: ${message}`;
        chat.appendChild(userMessage);

        // Simulate sending the message to the server and getting a response
        const responseMessage = document.createElement('div');
        responseMessage.classList.add('message', 'jai');
        responseMessage.textContent = `JAI: ${getResponse(message)}`;
        chat.appendChild(responseMessage);

        // Clear the input field
        messageInput.value = '';
    }

    function getResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('cofront')) {
            return 'A cofront is on the way to you!';
        } else if (lowerCaseMessage.includes('guitar')) {
            return 'A guitarist is on the way to you!';
        } else if (lowerCaseMessage.includes('bass')) {
            return 'A bassist is on the way to you!';
        } else if (lowerCaseMessage.includes('keys')) {
            return 'A keyboardist is on the way to you!';
        } else if (lowerCaseMessage.includes('fiddle')) {
            return 'A fiddler is on the way to you!';
        } else if (lowerCaseMessage.includes('drums') || lowerCaseMessage.includes('drummer')) {
            return 'A drummer is on the way to you!';
        } else {
            return "Please send 'cofront', 'fiddle', 'bass', 'guitar', 'keys', or 'drums' for a musician.";
        }
    }

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);
});
