import express from "express";
const router = express.Router();

// Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
  addFavorites,
  getFavorites,
  deleteFavorites
} from "../controllers/movieController.js";
// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { deleteUser, getAllUsers } from "../controllers/userController.js";

// Public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

router.delete("/favorites",authenticate, deleteFavorites);

// Restricted Routes
router.post("/:id/reviews", authenticate, checkId, movieReview);
router.post("/:id/favorites",authenticate,checkId, addFavorites);
router.get("/favorites",authenticate, getFavorites);
// Admin
router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);
router.get("/usermanagement", authenticate, authorizeAdmin, getAllUsers);
router.delete("/usermanagement/:id", authenticate, authorizeAdmin, deleteUser);

export default router;
