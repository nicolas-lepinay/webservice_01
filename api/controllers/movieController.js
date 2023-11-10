const mongoose = require("mongoose");
const Movie = require("../models/Movie");

// * GET A MOVIE *
module.exports.findOne = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
         // Si aucun film n'a été trouvé
         if (!movie) {
            return res.status(404).json({success: false, error: { code: 404, message: "Aucun film correspondant n'a été trouvé."}});
        }
        res.status(200).json({success: true, result: movie});
    } catch (err) {
         // Si l'erreur est due à un mauvais format d'ID :
         if (err instanceof mongoose.Error.CastError) {
            return res.status(400).json({success: false, error: { code: 400, message: "L'identifiant saisi est invalide."}});
        }
        // Autres erreurs serveur
        return res.status(500).json({success: false, error: { code: 500, message: err}});
    }
}

// * GET ALL MOVIES *
module.exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({success: true, result: movies});
    } catch (err) {
        res.status(404).json(err);
    }
}

// * CREATE A MOVIE *
module.exports.create = async (req, res) => {
    const newMovie = new Movie(req.body)
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json({success: true, result: savedMovie});
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({success: false, error: { code: 422, message: err.message}});
        }
        // Pour les autres types d'erreurs
        return res.status(500).json({success: false, error: { code: 500, message: err}});
    }   
}

// * UPDATE A MOVIE *
module.exports.update = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) {
            return res.status(404).json({success: false, error: { code: 404, message: "Aucun film correspondant n'a été trouvé."}});
        }
        await movie.updateOne({ $set: req.body });
        const updatedMovie = await Movie.findById(req.params.id);
        res.status(200).json({success: true, result: updatedMovie});
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(422).json({success: false, error: { code: 422, message: err.message}});
        }
        return res.status(500).json({success: false, error: { code: 500, message: err}});
    }
}

// * DELETE A MOVIE *
module.exports.delete = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) {
            return res.status(404).json({success: false, error: { code: 404, message: "Aucun film correspondant n'a été trouvé."}});
        }
        await movie.deleteOne();
        res.status(204).json({success: true});
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(422).json({success: false, error: { code: 422, message: err.message}});
        }
        return res.status(500).json({success: false, error: { code: 500, message: err}});
    }
}