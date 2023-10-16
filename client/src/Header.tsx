import "./Header.css";

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <a href="/">FlashCardSage</a>
        <a href="/">Decks</a>
        <a href="/login">login</a>
      </div>
    </div>
  );
}
