import React, { useEffect, useState } from "react";
import { createCard } from "./api/createCard";
import { useParams } from "react-router-dom";
import { TDeck } from "./api/getDecks";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import "./Deck.css";


export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();


  // -------------- 1. HANDLE CREATE CARD ------------------
  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  // -------------- 2. HANDLE DELETE CARD ------------------
  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  // -------------- 3. FETCH ALL CARDS ------------------
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);


  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      {/* map */}
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      {/* form */}
      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
