require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Artist schema and model
const artistSchema = new mongoose.Schema({
    name: String,
    instruments: String,
    genres: String,
    phoneNumber: String,
});

const Artist = mongoose.model('Artist', artistSchema);

// Body Parser Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // To parse JSON bodies
app.use(express.static('public')); // Serve static files from public directory

// Serve HTML page for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve HTML page for chat interaction
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Endpoint to handle SMS messages
app.post('/sms', async (req, res) => {
    const incomingMsg = req.body.Body.trim().toLowerCase();
    const response = new MessagingResponse();

    // Load artist data from MongoDB
    const artist = await Artist.findOne({ phoneNumber: req.body.From });
    if (!artist) {
        response.message("Artist not found. Please register first.");
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(response.toString());
        return;
    }

    // Handle booking requests
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

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(response.toString());
});

// Endpoint to handle artist information submission from the chat
app.post('/api/submitArtist', async (req, res) => {
    try {
        const newArtist = new Artist(req.body);
        await newArtist.save();
        console.log('Artist saved:', newArtist);
        res.status(200).end();
    } catch (err) {
        console.error('Error saving artist:', err);
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
