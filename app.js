require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
const port = 3000;

// Body Parser Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Add a simple GET route for basic server checks via browser
app.get('/', (req, res) => {
  res.send('Hello, your SMS server is running!');
});

app.post('/sms', (req, res) => {
    const incomingMsg = req.body.Body.trim().toLowerCase();
    const response = new MessagingResponse();

    switch (incomingMsg) {
        case 'bass':
            response.message('A bassist is on the way to you!');
            break;
        case 'guitar':
            response.message('A guitarist is on the way to you!');
            break;
        case 'drums':
            response.message('A drummer is on the way to you!');
            break;
        default:
            response.message("Please send 'bass', 'guitar', or 'drums' for a musician.");
            break;
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(response.toString());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
