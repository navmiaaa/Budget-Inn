import React, { useState, useEffect } from 'react';
import './App.css';

const translations = {
  fr: {
    title: "Budget Inn",
    subtitle: "Séjours abordables, partout",
    search: "Rechercher une ville ou code postal...",
    book: "Réserver",
    emergency: "Urgence",
    hourly: "À l'heure",
    daily: "Journalier",
    signin: "Se connecter",
    join: "S'inscrire",
    footer: "© 2026 Budget Inn — Séjours abordables",
    filters: "Filtres",
    city: "Ville",
    price: "Prix",
    type: "Type",
    apply: "Appliquer"
  },
  en: {
    title: "Budget Inn",
    subtitle: "Affordable stays, anywhere",
    search: "Search a city or postal code...",
    book: "Book Now",
    emergency: "Emergency",
    hourly: "Hourly",
    daily: "Daily",
    signin: "Sign In",
    join: "Join",
    footer: "© 2026 Budget Inn — Affordable stays",
    filters: "Filters",
    city: "City",
    price: "Price",
    type: "Type",
    apply: "Apply"
  }
};

// Sample listings with coordinates
const allListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", postal: "75001", price: 65, type: "daily", icon: "🏠", lat: 48.8566, lng: 2.3522 },
  { id: 2, title: "Studio Lyon", city: "Lyon", postal: "69001", price: 50, type: "daily", icon: "🏠", lat: 45.7640, lng: 4.8357 },
  { id: 3, title: "Urgence Marseille", city: "Marseille", postal: "13001", price: 30, type: "emergency", icon: "🚨", lat: 43.2965, lng: 5.3698 },
  { id: 4, title: "Hourly Nice", city: "Nice", postal: "06000", price: 20, type: "hourly", icon: "⏰", lat: 43.7102, lng: 7.2620 },
  { id: 5, title: "Bordeaux Budget", city: "Bordeaux", postal: "33000", price: 45, type: "daily", icon: "🏠", lat: 44.8378, lng: -0.5792 },
  { id: 6, title: "Strasbourg Shelter", city: "Strasbourg", postal: "67000", price: 28, type: "emergency", icon: "🚨", lat: 48.5734, lng: 7.7521 },
  { id: 7, title: "Lille Hourly", city: "Lille", postal: "59000", price: 18, type: "hourly", icon: "⏰", lat: 50.6292, lng: 3.0573 },
  { id: 8, title: "Le Marais Paris", city: "Paris", postal: "75003", price: 75, type: "daily", icon: "🏠", lat: 48.8575, lng: 2.3546 },
  { id: 9, title: "Montpellier Center", city: "Montpellier", postal: "34000", price: 40, type: "daily", icon: "🏠", lat: 43.6108, lng: 3.8767 }
];

// Coordinates for major French cities (fallback for search)
const cityCoords = {
  "paris": { lat: 48.8566, lng: 2.3522 },
  "lyon": { lat: 45.7640, lng: 4.8357 },
  "marseille": { lat: 43.2965, lng: 5.3698 },
  "nice": { lat: 43.7102, lng: 7.2620 },
  "bordeaux": { lat: 44.8378, lng: -0.5792 },
  "strasbourg": { lat: 48.5734, lng: 7.7521 },
  "lille": { lat: 50.6292, lng: 3.0573 },
  "montpellier": { lat: 43.6108, lng: 3.8767 },
  "nantes": { lat: 47.2184, lng: -1.5536 },
  "toulouse": { lat: 43.6047, lng: 1.4442 },
  "rennes": { lat: 48.1173, lng: -1.6778 },
  "nancy": { lat: 48.6937, lng: 6.1835 },
  "dijon": { lat: 47.3220, lng: 5.0415 }
};

function App() {
  const [lang, setLang] = useState('fr');
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });
  const [selectedListing, setSelectedListing] = useState(null);
  const [filters, setFilters] = useState({ priceMin: 0, priceMax: 200, type: 'all' });
  const t = translations[lang];

  // Handle search — city name or postal code
  const handleSearch = () => {
    const query = search.toLowerCase().trim();
    if (!query) return;

    // Try city name match
    const cityMatch = Object.keys(cityCoords).find(city => city.includes(query) || query.includes(city));
    if (cityMatch) {
      setMapCenter(cityCoords[cityMatch]);
      return;
    }

    // Try postal code match in listings
    const listingMatch = allListings.find(l => l.postal === query);
    if (listingMatch) {
      setMapCenter({ lat: listingMatch.lat, lng: listingMatch.lng });
      return;
    }

    // If no match found, keep current
    alert(`Aucun résultat pour "${search}" / No results for "${search}"`);
  };

  // Filter listings based on search + filters
  const filteredListings = allListings.filter(l => {
    const matchCity = l.city.toLowerCase().includes(search.toLowerCase()) || !search;
    const matchPostal = l.postal.includes(search) || !search;
    const matchPrice = l.price >= filters.priceMin && l.price <= filters.priceMax;
    const matchType = filters.type === 'all' || l.type === filters.type;
    return (matchCity || matchPostal) && matchPrice && matchType;
  });

  const formatPrice = (price) => {
    const symbols = { fr: '€', en: '$', es: '€', de: '€' };
    const symbol = symbols[lang] || '€';
    return lang === 'fr' ? `${price} ${symbol}` : `${symbol}${price}`;
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <h1>🏨 Budget Inn</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
        <div className="controls">
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
          </select>
          <button className="btn-outline">{t.signin}</button>
          <button className="btn-primary">{t.join}</button>
        </div>
      </header>

      {/* MAIN LAYOUT: Filters + Map */}
      <div className="main-layout">
        {/* LEFT: FILTERS */}
        <aside className="filters-panel">
          <h3>{t.filters}</h3>
          <div className="filter-group">
            <label>{t.price}</label>
            <div className="price-range">
              <input type="number" placeholder="Min" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })} />
              <span>—</span>
              <input type="number" placeholder="Max" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })} />
            </div>
          </div>
          <div className="filter-group">
            <label>{t.type}</label>
            <div className="type-options">
              <label><input type="radio" name="type" value="all" checked={filters.type === 'all'} onChange={() => setFilters({ ...filters, type: 'all' })} /> All</label>
              <label><input type="radio" name="type" value="daily" checked={filters.type === 'daily'} onChange={() => setFilters({ ...filters, type: 'daily' })} /> {t.daily}</label>
              <label><input type="radio" name="type" value="hourly" checked={filters.type === 'hourly'} onChange={() => setFilters({ ...filters, type: 'hourly' })} /> {t.hourly}</label>
              <label><input type="radio" name="type" value="emergency" checked={filters.type === 'emergency'} onChange={() => setFilters({ ...filters, type: 'emergency' })} /> {t.emergency}</label>
            </div>
          </div>
          <button className="apply-btn" onClick={() => {}}>{t.apply}</button>
        </aside>

        {/* RIGHT: GOOGLE MAPS */}
        <div className="map-container">
          <iframe
            title="Budget Inn Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyD_RyG1xCC6p6ZJ0W7PHvR7nNFtVkGdXQE&center=${mapCenter.lat},${mapCenter.lng}&zoom=12`}
            allowFullScreen
          />
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="listings-grid">
        {filteredListings.map(item => (
          <div key={item.id} className="listing-card" onClick={() => setMapCenter({ lat: item.lat, lng: item.lng })}>
            <div className="listing-icon">{item.icon}</div>
            <div className="listing-info">
              <h3>{item.title}</h3>
              <p className="city">📍 {item.city} ({item.postal})</p>
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
