const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http")
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tmdbRoutes = require('./routes/tmdbRoutes.js')

dotenv.config();

const { setupSocket } = require("./socket");

const app = express();
app.use(express.json());  
const server = http.createServer(app); // Create HTTP server

app.use(cors({ origin: "*" }));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.get("/api/config/tmdb", (req, res) => {
    res.json({ TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN });
});

app.use('/api/auth', authRoutes);
app.use("/api/tmdb", tmdbRoutes);

setupSocket(server);

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});
