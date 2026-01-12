import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";

const router = express.Router();
router.use(auth);

router.get("/", getClients);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
