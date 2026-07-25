import React, { useState } from 'react';
import './App.css';

const translations = {
  fr: {
    title: "Budget Inn",
    subtitle: "Séjours abordables, partout",
    search: "Rechercher une ville...",
    book: "Réserver",
    emergency: "Urgence",
    hourly: "À l'heure",
    daily: "Journalier",
    signin: "Se connecter",
    join: "S'inscrire",
    footer: "© 2026 Budget Inn — Séjours abordables"
  },
  en: {
    title: "Budget Inn",
    subtitle: "Affordable stays, anywhere",
    search: "Search a city...",
    book: "Book Now",
    emergency: "Emergency",
    hourly: "Hourly",
    daily: "Daily",
    signin: "Sign In",
    join: "Join",
    footer: "© 2026 Budget Inn — Affordable stays"
  },
  es: {
    title: "Budget Inn",
    subtitle: "Estancias asequibles, en cualquier lugar",
    search: "Buscar una ciudad...",
    book: "Reservar",
    emergency: "Emergencia",
    hourly: "Por horas",
    daily: "Diario",
    signin: "Iniciar sesión",
    join: "Unirse",
    footer: "© 2026 Budget Inn — Estancias asequibles"
  },
  de: {
    title: "Budget Inn",
    subtitle: "Erschwingliche Unterkünfte, überall",
    search: "Stadt suchen...",
    book: "Jetzt buchen",
    emergency: "Notfall",
    hourly: "Stündlich",
    daily: "Täglich",
    signin: "Anmelden",
    join: "Beitreten",
    footer: "© 2026 Budget Inn — Erschwingliche Unterkünfte"
  }
};

const allListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", price: 65, type: "daily", icon: "🏠" },
  { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, type: "daily", icon: "🏠" },
  { id: 3, title: "Urgence Marseille", city: "Marseille", price: 30, type: "emergency", icon: "🚨" },
  { id: 4, title: "Hourly Nice", city: "Nice", price: 20, type: "hourly", icon: "⏰" },
  { id: 5, title: "Bordeaux Budget", city: "Bordeaux", price: 45, type: "daily", icon: "🏠" },
  { id: 6, title: "Strasbourg Shelter", city: "Strasbourg", price: 28, type: "emergency", icon: "🚨" },
  { id: 7, title: "Lille Hourly", city: "Lille", price: 18, type: "hourly", icon: "⏰" },
  { id: 8, title: "Le Marais Paris", city: "Paris", price: 75, type: "daily", icon: "🏠" }
];

function App() {
  const [lang, setLang] = useState('fr');
  const [search, setSearch] = useState('');
  const t = translations[lang];

  const filtered = allListings.filter(l =>
    l.city.toLowerCase().includes(search.toLowerCase()) ||
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) => {
    const symbols = { fr: '€', en: '$', es: '€', de: '€' };
    const symbol = symbols[lang] || '€';
    return lang === 'fr' ? `${price} ${symbol}` : `${symbol}${price}`;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <h1>🏨 Budget Inn</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="controls">
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="de">🇩🇪 Deutsch</option>
          </select>
          <div className="auth-buttons">
            <button>{t.signin}</button>
            <button className="btn-primary">{t.join}</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <div className="search-box">
          <input type="text" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} />
          <button>🔍</button>
        </div>
      </section>

      <div className="filters">
        <button className="filter-btn active">{t.daily}</button>
        <button className="filter-btn">{t.hourly}</button>
        <button className="filter-btn">{t.emergency}</button>
      </div>

      <div className="listings-grid">
        {filtered.map(item => (
          <div key={item.id} className="listing-card">
            <div className="listing-icon">{item.icon}</div>
            <div className="listing-info">
              <h3>{item.title}</h3>
              <p className="city">📍 {item.city}</p>
              <p className="price">{formatPrice(item.price)}</p>
              <span className={`tag ${item.type}`}>{t[item.type]}</span>
              <button className="book-btn">{t.book}</button>
            </div>
          </div>
        ))}
      </div>

      <footer><p>{t.footer}</p></footer>
    </div>
  );
}

export default App;
import React from 'react';

function App() {
  return <h1>🏨 Budget Inn</h1>;
}

export default App;
