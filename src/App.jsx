import React, { useState } from 'react';
import './App.css';

// ===== LANGUAGES =====
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
    price: "Prix",
    type: "Type",
    apply: "Appliquer",
    popular: "Logements populaires",
    explore: "Explorer",
    wishlists: "Listes",
    login: "Connexion",
    guestFavorite: "Coup de cœur",
    individualHost: "Hôte individuel"
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
    price: "Price",
    type: "Type",
    apply: "Apply",
    popular: "Popular homes",
    explore: "Explore",
    wishlists: "Wishlists",
    login: "Log in",
    guestFavorite: "Guest favorite",
    individualHost: "Individual host"
  },
  es: {
    title: "Budget Inn",
    subtitle: "Estancias asequibles, en cualquier lugar",
    search: "Buscar una ciudad o código postal...",
    book: "Reservar",
    emergency: "Emergencia",
    hourly: "Por horas",
    daily: "Diario",
    signin: "Iniciar sesión",
    join: "Unirse",
    footer: "© 2026 Budget Inn — Estancias asequibles",
    filters: "Filtros",
    price: "Precio",
    type: "Tipo",
    apply: "Aplicar",
    popular: "Alojamientos populares",
    explore: "Explorar",
    wishlists: "Listas",
    login: "Iniciar sesión",
    guestFavorite: "Favorito de los huéspedes",
    individualHost: "Anfitrión individual"
  },
  de: {
    title: "Budget Inn",
    subtitle: "Erschwingliche Unterkünfte, überall",
    search: "Stadt oder Postleitzahl suchen...",
    book: "Jetzt buchen",
    emergency: "Notfall",
    hourly: "Stündlich",
    daily: "Täglich",
    signin: "Anmelden",
    join: "Beitreten",
    footer: "© 2026 Budget Inn — Erschwingliche Unterkünfte",
    filters: "Filter",
    price: "Preis",
    type: "Typ",
    apply: "Anwenden",
    popular: "Beliebte Unterkünfte",
    explore: "Entdecken",
    wishlists: "Wunschlisten",
    login: "Einloggen",
    guestFavorite: "Gästefavorit",
    individualHost: "Privater Gastgeber"
  },
  ja: {
    title: "Budget Inn",
    subtitle: "手頃な宿泊先、どこでも",
    search: "都市または郵便番号を検索...",
    book: "今すぐ予約",
    emergency: "緊急",
    hourly: "時間単位",
    daily: "日単位",
    signin: "サインイン",
    join: "参加",
    footer: "© 2026 Budget Inn — 手頃な宿泊先",
    filters: "フィルター",
    price: "価格",
    type: "タイプ",
    apply: "適用",
    popular: "人気の宿泊先",
    explore: "探索",
    wishlists: "ウィッシュリスト",
    login: "ログイン",
    guestFavorite: "ゲストお気に入り",
    individualHost: "個人ホスト"
  }
};

// ===== CURRENCY SYMBOLS =====
const currencySymbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CHF: '₣',
  JPY: '¥'
};

// ===== INTERNATIONAL LISTINGS =====
const allListings = [
  // France
  { id: 1, title: "Charme Parisien", city: "Paris", country: "France", postal: "75001", price: 65, type: "daily", icon: "🏠", lat: 48.8566, lng: 2.3522, rating: 4.94, host: "Individual host", date: "Mar 5 – 7", guestFavorite: true },
  { id: 2, title: "Studio Lyon", city: "Lyon", country: "France", postal: "69001", price: 50, type: "daily", icon: "🏠", lat: 45.7640, lng: 4.8357, rating: 4.85, host: "Individual host", date: "Apr 10 – 12", guestFavorite: false },
  { id: 3, title: "Urgence Marseille", city: "Marseille", country: "France", postal: "13001", price: 30, type: "emergency", icon: "🚨", lat: 43.2965, lng: 5.3698, rating: 4.70, host: "Individual host", date: "Flexible", guestFavorite: false },
  { id: 4, title: "Vivaldi Hotel", city: "Paris", country: "France", postal: "75008", price: 220, type: "daily", icon: "🏨", lat: 48.8742, lng: 2.3215, rating: 4.85, host: "Hotel", date: "Flexible", guestFavorite: true },

  // UK
  { id: 5, title: "London Bridge Stay", city: "London", country: "UK", postal: "SE1 9SG", price: 95, type: "daily", icon: "🏠", lat: 51.5074, lng: -0.1278, rating: 4.90, host: "Individual host", date: "Jun 1 – 3", guestFavorite: true },
  { id: 6, title: "Camden Town Room", city: "London", country: "UK", postal: "NW1 8QP", price: 85, type: "daily", icon: "🏠", lat: 51.5410, lng: -0.1433, rating: 4.80, host: "Individual host", date: "Jul 15 – 17", guestFavorite: false },

  // USA
  { id: 7, title: "NYC Times Square", city: "New York", country: "USA", postal: "10036", price: 120, type: "daily", icon: "🏠", lat: 40.7580, lng: -73.9855, rating: 4.88, host: "Individual host", date: "May 20 – 22", guestFavorite: true },
  { id: 8, title: "Brooklyn Budget", city: "New York", country: "USA", postal: "11201", price: 80, type: "daily", icon: "🏠", lat: 40.6911, lng: -73.9893, rating: 4.75, host: "Individual host", date: "Aug 1 – 3", guestFavorite: false },

  // Japan
  { id: 9, title: "Shibuya Studio", city: "Tokyo", country: "Japan", postal: "150-0002", price: 70, type: "daily", icon: "🏠", lat: 35.6595, lng: 139.7004, rating: 4.92, host: "Individual host", date: "Sep 10 – 12", guestFavorite: true },
  { id: 10, title: "Shinjuku Room", city: "Tokyo", country: "Japan", postal: "160-0022", price: 60, type: "daily", icon: "🏠", lat: 35.6938, lng: 139.7034, rating: 4.80, host: "Individual host", date: "Oct 5 – 7", guestFavorite: false },

  // UAE
  { id: 11, title: "Dubai Marina Stay", city: "Dubai", country: "UAE", postal: "00000", price: 110, type: "daily", icon: "🏠", lat: 25.0779, lng: 55.1419, rating: 4.95, host: "Individual host", date: "Nov 1 – 3", guestFavorite: true },
  { id: 12, title: "Burj View Room", city: "Dubai", country: "UAE", postal: "00000", price: 130, type: "daily", icon: "🏠", lat: 25.1972, lng: 55.2741, rating: 4.85, host: "Individual host", date: "Dec 15 – 17", guestFavorite: false }
];

// ===== CITY COORDINATES FOR SEARCH =====
const cityCoords = {
  paris: { lat: 48.8566, lng: 2.3522 },
  lyon: { lat: 45.7640, lng: 4.8357 },
  marseille: { lat: 43.2965, lng: 5.3698 },
  london: { lat: 51.5074, lng: -0.1278 },
  "new york": { lat: 40.7580, lng: -73.9855 },
  tokyo: { lat: 35.6595, lng: 139.7004 },
  dubai: { lat: 25.0779, lng: 55.1419 }
};

function App() {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('EUR');
  const [search, setSearch] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });
  const [filters, setFilters] = useState({ priceMin: 0, priceMax: 500, type: 'all' });

  const text = translations[lang];
  const currencySymbol = currencySymbols[currency] || '€';

  const handleSearch = () => {
    const query = search.toLowerCase().trim();
    if (!query) return;
    const cityMatch = Object.keys(cityCoords).find(city => city.includes(query) || query.includes(city));
    if (cityMatch) {
      setMapCenter(cityCoords[cityMatch]);
      return;
    }
    const listingMatch = allListings.find(l => l.postal === query);
    if (listingMatch) {
      setMapCenter({ lat: listingMatch.lat, lng: listingMatch.lng });
      return;
    }
    alert(`No results for "${search}"`);
  };

  const filteredListings = allListings.filter(l => {
    const matchCity = l.city.toLowerCase().includes(search.toLowerCase()) || !search;
    const matchPostal = l.postal.includes(search) || !search;
    const matchPrice = l.price >= filters.priceMin && l.price <= filters.priceMax;
    const matchType = filters.type === 'all' || l.type === filters.type;
    return (matchCity || matchPostal) && matchPrice && matchType;
  });

  const formatPrice = (price) => {
    return `${currencySymbol}${price}`;
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo"><h1>🏨 Budget Inn</h1></div>
        <div className="header-controls">
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="es">🇪🇸 Español</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ja">🇯🇵 日本語</option>
          </select>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
            <option value="CHF">₣ CHF</option>
            <option value="JPY">¥ JPY</option>
          </select>
          <button className="btn-outline">{text.explore}</button>
          <button className="btn-outline">{text.wishlists}</button>
          <button className="btn-primary">{text.login}</button>
        </div>
      </header>

      {/* HERO SEARCH */}
      <section className="hero">
        <h2>{text.title}</h2>
        <p>{text.subtitle}</p>
        <div className="search-box">
          <input
            type="text"
            placeholder={text.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </section>

      {/* MAIN LAYOUT: FILTERS + MAP */}
      <div className="main-layout">
        <aside className="filters-panel">
          <h3>{text.filters}</h3>
          <div className="filter-group">
            <label>{text.price}</label>
            <div className="price-range">
              <input type="number" placeholder="Min" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })} />
              <span>—</span>
              <input type="number" placeholder="Max" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })} />
            </div>
          </div>
          <div className="filter-group">
            <label>{text.type}</label>
            <div className="type-options">
              <label><input type="radio" name="type" value="all" checked={filters.type === 'all'} onChange={() => setFilters({ ...filters, type: 'all' })} /> All</label>
              <label><input type="radio" name="type" value="daily" checked={filters.type === 'daily'} onChange={() => setFilters({ ...filters, type: 'daily' })} /> {text.daily}</label>
              <label><input type="radio" name="type" value="hourly" checked={filters.type === 'hourly'} onChange={() => setFilters({ ...filters, type: 'hourly' })} /> {text.hourly}</label>
              <label><input type="radio" name="type" value="emergency" checked={filters.type === 'emergency'} onChange={() => setFilters({ ...filters, type: 'emergency' })} /> {text.emergency}</label>
            </div>
          </div>
          <button className="apply-btn">{text.apply}</button>
        </aside>

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

      {/* POPULAR HOMES */}
      <section className="section">
        <h3>{text.popular}</h3>
        <div className="cards-grid">
          {filteredListings.slice(0, 4).map(item => (
            <div key={item.id} className="card" onClick={() => setMapCenter({ lat: item.lat, lng: item.lng })}>
              <div className="card-icon">{item.icon}</div>
              <div className="card-body">
                <h4>{item.title}</h4>
                <p className="host">{item.host}</p>
                <p className="date">{item.date}</p>
                <p className="price">{formatPrice(item.price)} total</p>
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
