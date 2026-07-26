import React, { useState } from 'react';
import './App.css';

// ===== TRANSLATIONS =====
const translations = {
  en: {
    title: "Budget Inn",
    subtitle: "Affordable stays, anywhere",
    search: "Search a city or postal code...",
    book: "Book Now",
    emergency: "Emergency",
    hourly: "Hourly",
    daily: "Daily",
    explore: "Explore",
    wishlists: "Wishlists",
    login: "Log in",
    footer: "© 2026 Budget Inn — Affordable stays",
    filters: "Filters",
    price: "Price",
    type: "Type",
    apply: "Apply",
    popular: "Popular homes",
    guestFavorite: "Guest favorite",
    individualHost: "Individual host"
  },
  fr: {
    title: "Budget Inn",
    subtitle: "Séjours abordables, partout",
    search: "Rechercher une ville ou code postal...",
    book: "Réserver",
    emergency: "Urgence",
    hourly: "À l'heure",
    daily: "Journalier",
    explore: "Explorer",
    wishlists: "Listes",
    login: "Connexion",
    footer: "© 2026 Budget Inn — Séjours abordables",
    filters: "Filtres",
    price: "Prix",
    type: "Type",
    apply: "Appliquer",
    popular: "Logements populaires",
    guestFavorite: "Coup de cœur",
    individualHost: "Hôte individuel"
  }
};

// ===== LISTINGS =====
const allListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", price: 65, type: "daily", icon: "🏠", lat: 48.8566, lng: 2.3522, rating: 4.94, host: "Individual host", date: "Mar 5 – 7", guestFavorite: true },
  { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, type: "daily", icon: "🏠", lat: 45.7640, lng: 4.8357, rating: 4.85, host: "Individual host", date: "Apr 10 – 12", guestFavorite: false },
  { id: 3, title: "Urgence Marseille", city: "Marseille", price: 30, type: "emergency", icon: "🚨", lat: 43.2965, lng: 5.3698, rating: 4.70, host: "Individual host", date: "Flexible", guestFavorite: false },
  { id: 4, title: "Vivaldi Hotel", city: "Paris", price: 220, type: "daily", icon: "🏨", lat: 48.8742, lng: 2.3215, rating: 4.85, host: "Hotel", date: "Flexible", guestFavorite: true }
];

function App() {
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const text = translations[lang];

  const filtered = allListings.filter(l =>
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo"><h1>🏨 Budget Inn</h1></div>
        <div className="header-actions">
          <button className="nav-btn">{text.explore}</button>
          <button className="nav-btn">{text.wishlists}</button>
          <button className="btn-primary">{text.login}</button>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="lang-select">
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>{text.title}</h2>
        <p>{text.subtitle}</p>
        <div className="search-box">
          <input
            type="text"
            placeholder={text.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>
      </section>

      {/* MAP */}
      <div className="map-container">
        <iframe
          title="Budget Inn Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCf8RXkdWyfiCBIOLrJfvLiPgsOkQ2Xrj4&center=48.8566,2.3522&zoom=12`}
          allowFullScreen
        />
      </div>

      {/* CARDS */}
      <section className="section">
        <h3>{text.popular}</h3>
        <div className="cards-grid">
          {filtered.map(item => (
            <div key={item.id} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-body">
                <h4>{item.title}</h4>
                <p className="host">{item.host}</p>
                <p className="date">{item.date}</p>
                <p className="price">€{item.price} total</p>
                <p className="rating">★ {item.rating}</p>
                {item.guestFavorite && <span className="badge">{text.guestFavorite}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer><p>{text.footer}</p></footer>
    </div>
  );
}

export default App;
