require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Body Parser Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files from public directory

// Serve HTML page for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/sms', (req, res) => {
    const incomingMsg = req.body.Body.trim().toLowerCase();
    const response = new MessagingResponse();

    switch (incomingMsg) {
        case 'cofront':
        case 'i need a cofront':
            response.message('A cofront is on the way to you!');
            break;
        case 'guitar':
        case 'i need a guitarist':
        case 'i need a guitar':
            response.message('A guitarist is on the way to you!');
            break;
        case 'bass':
        case 'i need a bassist':
        case 'i need a bass':
            response.message('A bassist is on the way to you!');
            break;
        case 'keys':
        case 'i need a keyboardist':
        case 'i need keys':
            response.message('A keyboardist is on the way to you!');
            break;
        case 'fiddle':
        case 'i need a fiddler':
        case 'i need a fiddle':
            response.message('A fiddler is on the way to you!');
            break;
        case 'drums':
        case 'i need a drummer':
        case 'i need drums':
            response.message('A drummer is on the way to you!');
            break;
        default:
            response.message("Please send 'cofront', 'fiddle', 'bass', 'guitar', 'keys', or 'drums' for a musician.");
            break;
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(response.toString());
});

// Serving the HTML page for chat interaction
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
