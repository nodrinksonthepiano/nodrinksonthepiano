document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('artistForm');
    const messageInput = document.getElementById('messageInput');
    const chat = document.getElementById('chat');
    let artistData = {
        name: '',
        instruments: '',
        genres: '',
        phoneNumber: '',
    };
    let stage = 0;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message === '') return;

        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.textContent = `You: ${message}`;
        chat.appendChild(userMessage);

        switch (stage) {
            case 0:
                artistData.name = message;
                stage = 1;
                messageInput.placeholder = "What instruments do you play?";
                break;
            case 1:
                artistData.instruments = message;
                stage = 2;
                messageInput.placeholder = "What genres do you play?";
                break;
            case 2:
                artistData.genres = message;
                stage = 3;
                messageInput.placeholder = "What is your phone number?";
                break;
            case 3:
                artistData.phoneNumber = message;
                stage = 4;
                messageInput.placeholder = "You can now book or chat...";
                try {
                    const response = await fetch('/api/submitArtist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(artistData),
                    });
                    console.log('Artist data submitted successfully');
                } catch (error) {
                    console.error('Error:', error);
                }
                break;
            default:
                if (stage === 4) {
                    // Continue handling booking requests
                    const responseMessage = document.createElement('div');
                    responseMessage.classList.add('message', 'jai');
                    responseMessage.textContent = `JAI: ${handleBookingRequests(message)}`;
                    chat.appendChild(responseMessage);
                }
                break;
        }

        if (stage !== 4) {
            const responseMessage = document.createElement('div');
            responseMessage.classList.add('message', 'jai');
            responseMessage.textContent = `JAI: ${getResponse(stage)}`;
            chat.appendChild(responseMessage);
        }

        messageInput.value = '';
    });

    function getResponse(stage) {
        switch (stage) {
            case 1:
                return 'What instruments do you play?';
            case 2:
                return 'What genres do you play?';
            case 3:
                return 'What is your phone number?';
            case 4:
                return 'Thank you! Your information has been saved.';
            default:
                return '';
        }
    }

    function handleBookingRequests(message) {
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
});
