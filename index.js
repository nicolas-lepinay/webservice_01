const express = require("express"); // Framework JS
const mongoose = require("mongoose"); // MongoDB
const dotenv = require("dotenv"); // Pour stocker les variables d'environnements
const helmet = require("helmet"); // Pour la sécurité HHTPS
const morgan = require("morgan"); // Pour les logs et résultats des requêtes
const multer = require("multer"); // Pour l'upload d'images
const path = require("path");
const port = 8080

const movieRoute = require("./routes/movies")

dotenv.config();

const app = express();

// Connexion à MongoDB :
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✔️  Connected to MongoDB."))
    .catch((err) => console.log(err));

// Middleware :
app.use(express.json()); // Body parser for POST requests
app.use(helmet());
app.use(morgan("common"));

app.use(process.env.MOVIE_ROUTE, movieRoute);

app.listen(port, () => {
    console.log("✔️  Server listening on port " + port + "...")
})