import React, { useState } from 'react';
import './App.css';

const translations = {
  en: {
    title: "Budget Inn",
    subtitle: "Affordable stays, anywhere",
    search: "Search a city...",
    book: "Book Now",
    signin: "Sign In",
    join: "Join",
    footer: "© 2026 Budget Inn — Affordable stays",
    categories: {
      short: "🏠 Short Term Rent",
      long: "🏡 Long Duration",
      emergency: "🚨 Urgence Abri",
      vacation: "🌴 Vacations"
    }
  },
  fr: {
    title: "Budget Inn",
    subtitle: "Séjours abordables, partout",
    search: "Rechercher une ville...",
    book: "Réserver",
    signin: "Se connecter",
    join: "Rejoindre",
    footer: "© 2026 Budget Inn — Séjours abordables",
    categories: {
      short: "🏠 Location courte durée",
      long: "🏡 Longue durée",
      emergency: "🚨 Urgence Abri",
      vacation: "🌴 Vacances"
    }
  }
};

const allListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", price: 65, type: "short", icon: "🏠" },
  { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, type: "short", icon: "🏠" },
  { id: 3, title: "Appartement Bordeaux", city: "Bordeaux", price: 45, type: "long", icon: "🏡" },
  { id: 4, title: "Villa Marseille", city: "Marseille", price: 30, type: "emergency", icon: "🚨" },
  { id: 5, title: "Nice Vacations", city: "Nice", price: 80, type: "vacation", icon: "🌴" },
  { id: 6, title: "Paris Vacations", city: "Paris", price: 95, type: "vacation", icon: "🌴" }
];

function App() {
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const text = translations[lang];

  const filtered = allListings.filter(l => {
    const matchSearch = l.city.toLowerCase().includes(search.toLowerCase()) || l.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || l.type === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo"><h1>🏨 Budget Inn</h1></div>
        <div className="header-actions">
          <button className="btn-outline">{text.signin}</button>
          <button className="btn-primary">{text.join}</button>
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
          <input type="text" placeholder={text.search} value={search} onChange={(e) => setSearch(e.target.value)} />
          <button>🔍</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <button className={`cat-btn ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>📌 All</button>
        <button className={`cat-btn ${selectedCategory === 'short' ? 'active' : ''}`} onClick={() => setSelectedCategory('short')}>{text.categories.short}</button>
        <button className={`cat-btn ${selectedCategory === 'long' ? 'active' : ''}`} onClick={() => setSelectedCategory('long')}>{text.categories.long}</button>
        <button className={`cat-btn ${selectedCategory === 'emergency' ? 'active' : ''}`} onClick={() => setSelectedCategory('emergency')}>{text.categories.emergency}</button>
        <button className={`cat-btn ${selectedCategory === 'vacation' ? 'active' : ''}`} onClick={() => setSelectedCategory('vacation')}>{text.categories.vacation}</button>
      </section>

      {/* CARDS */}
      <section className="section">
        <div className="cards-grid">
          {filtered.map(item => (
            <div key={item.id} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-body">
                <h4>{item.title}</h4>
                <p className="city">📍 {item.city}</p>
                <p className="price">€{item.price}/night</p>
                <span className={`tag ${item.type}`}>
                  {item.type === 'short' ? 'Short' : item.type === 'long' ? 'Long' : item.type === 'emergency' ? 'Emergency' : 'Vacation'}
                </span>
                <button className="book-btn">{text.book}</button>
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
