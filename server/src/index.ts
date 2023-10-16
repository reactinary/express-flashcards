import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
// By default, web browsers doesn't allow to access an URL that is not the one we are on
// In that case, we are on http://127.0.0.1:5173/ (Vite) and we send requests to localhost:5000
// so we need to import cors
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

mongoose.connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });


// ------- SEND REQUESTS FROM VSCODE => THUNDER CLIENT EXTENSION -----
