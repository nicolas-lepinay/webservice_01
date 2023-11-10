const mongoose = require("mongoose");
const Movie = require("../models/Movie");

// * GET A MOVIE *
module.exports.findOne = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
         // Si aucun film n'a été trouvé
         if (!movie) {
            return res.status(404).json(`Aucun film trouvé avec l'ID '${req.params.id}'.`);
        }
        res.status(200).json(movie);
    } catch (err) {
         // Si l'erreur est due à un mauvais format d'ID :
         if (err instanceof mongoose.Error.CastError) {
            return res.status(422).json(`L'ID '${req.params.id}' est invalide.`);
        }
        // Autres erreurs serveur
        res.status(500).json(`Erreur serveur : ${err}`);
    }
}

// * GET ALL MOVIES *
module.exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies)
    } catch (err) {
        res.status(404).json(err);
    }
}

// * CREATE A MOVIE *
module.exports.create = async (req, res) => {
    const newMovie = new Movie(req.body)
    try {
        const savedMovie = await newMovie.save();
        res.status(200).json(savedMovie)
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json(`L'objet envoyé est invalide : ${err.message}`);
        }
        // Pour les autres types d'erreurs
        res.status(500).json(`Erreur serveur : ${err}`);
    }   
}

// * UPDATE A MOVIE *
module.exports.update = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        await movie.updateOne({ $set: req.body })
        res.status(200).json("Le film a été mis à jour.")
    } catch (err) {
        res.status(500).json(err);
    }
}

// * DELETE A MOVIE *
module.exports.delete = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        await movie.deleteOne();
        res.status(200).json("Le film a été supprimé.")
    } catch (err) {
        res.status(500).json(err);
    }
}