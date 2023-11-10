const Movie = require("../models/Movie");
const router = require("express").Router();
const movieController = require("../controllers/movieController");

router.get("/:id", movieController.findOne);          // GET A MOVIE
router.get("/", movieController.findAll);             // GET ALL MOVIES
router.post("/", movieController.create);             // CREATE A MOVIE
router.put("/:id", movieController.update);           // UPDATE A MOVIE
router.delete("/:id", movieController.delete);        // DELETE A MOVIE

module.exports = router