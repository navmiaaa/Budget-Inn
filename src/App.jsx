import React, { useState } from 'react';
import './App.css';

// ===== TRANSLATIONS =====
const translations = {
  en: {
    title: "Budget Inn",
    subtitle: "Affordable stays, anywhere",
    search: "Search a city...",
    book: "Book Now",
    signin: "Sign In",
    join: "Join",
    logout: "Logout",
    footer: "© 2026 Budget Inn — Affordable stays",
    categories: {
      short: "🏠 Short Term",
      long: "🏡 Long Duration",
      emergency: "🚨 Urgence Abri",
      vacation: "🌴 Vacations"
    },
    host: {
      title: "Host Dashboard",
      addListing: "Add New Listing",
      name: "Title",
      city: "City",
      price: "Price (€/night)",
      type: "Type",
      photo: "Photo URL",
      submit: "Publish Listing"
    },
    auth: {
      welcome: "Welcome to Budget Inn",
      name: "Full Name",
      email: "Email Address",
      password: "Password (min 6 chars)",
      signup: "Sign Up",
      login: "Login",
      or: "or",
      already: "Already have an account?",
      noAccount: "Don't have an account?"
    }
  },
  fr: {
    title: "Budget Inn",
    subtitle: "Séjours abordables, partout",
    search: "Rechercher une ville...",
    book: "Réserver",
    signin: "Se connecter",
    join: "Rejoindre",
    logout: "Déconnexion",
    footer: "© 2026 Budget Inn — Séjours abordables",
    categories: {
      short: "🏠 Court terme",
      long: "🏡 Longue durée",
      emergency: "🚨 Urgence Abri",
      vacation: "🌴 Vacances"
    },
    host: {
      title: "Tableau de bord",
      addListing: "Ajouter une annonce",
      name: "Titre",
      city: "Ville",
      price: "Prix (€/nuit)",
      type: "Type",
      photo: "URL photo",
      submit: "Publier"
    },
    auth: {
      welcome: "Bienvenue sur Budget Inn",
      name: "Nom complet",
      email: "Adresse e-mail",
      password: "Mot de passe (6 caractères min)",
      signup: "S'inscrire",
      login: "Se connecter",
      or: "ou",
      already: "Vous avez déjà un compte ?",
      noAccount: "Pas de compte ?"
    }
  }
};

// ===== INITIAL LISTINGS =====
const initialListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", price: 65, type: "short", icon: "🏠", host: "Sophie" },
  { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, type: "short", icon: "🏠", host: "Jean" },
  { id: 3, title: "Villa Marseille", city: "Marseille", price: 30, type: "emergency", icon: "🚨", host: "Marie" },
  { id: 4, title: "Nice Vacations", city: "Nice", price: 80, type: "vacation", icon: "🌴", host: "Pierre" }
];

function App() {
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings, setListings] = useState(initialListings);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showHost, setShowHost] = useState(false);
  const [newListing, setNewListing] = useState({ title: '', city: '', price: '', type: 'short', image: '' });
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const text = translations[lang];

  // ===== AUTH HANDLERS =====
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setUser({ name: form.name, email: form.email });
    setShowAuth(false);
    setForm({ name: '', email: '', password: '' });
    alert(`✅ Welcome ${form.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setShowHost(false);
  };

  // ===== HOST =====
  const addListing = () => {
    if (!user) {
      alert("Please Sign In first!");
      setShowAuth(true);
      return;
    }
    if (!newListing.title || !newListing.city || !newListing.price) {
      alert("Please fill all fields");
      return;
    }
    const listing = {
      id: Date.now(),
      title: newListing.title,
      city: newListing.city,
      price: parseInt(newListing.price),
      type: newListing.type,
      icon: newListing.image || '🏠',
      host: user.name
    };
    setListings([listing, ...listings]);
    setNewListing({ title: '', city: '', price: '', type: 'short', image: '' });
    setShowHost(false);
    alert("✅ Listing published successfully!");
  };

  // ===== BOOKING =====
  const handleBooking = (listing) => {
    if (!user) {
      alert("Please Sign In first!");
      setShowAuth(true);
      return;
    }
    alert(`✅ Booking confirmed for ${listing.title}!\n📧 Confirmation sent to ${user.email}`);
  };

  // ===== FILTER =====
  const filtered = listings.filter(l => {
    const matchSearch = l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || l.type === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo"><h1>🏨 Budget Inn</h1></div>
        <div className="header-actions">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="lang-select">
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
          {!user ? (
            <>
              <button className="btn-outline" onClick={() => { setShowAuth(true); setIsLogin(true); }}>{text.signin}</button>
              <button className="btn-primary" onClick={() => { setShowAuth(true); setIsLogin(false); }}>{text.join}</button>
            </>
          ) : (
            <>
              <span className="user-name">👤 {user.name}</span>
              <button className="btn-outline" onClick={() => setShowHost(!showHost)}>📋 Host</button>
              <button className="btn-outline" onClick={handleLogout}>{text.logout}</button>
            </>
          )}
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="modal" onClick={() => setShowAuth(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{text.auth.welcome}</h2>
            <form onSubmit={handleAuthSubmit}>
              <input
                type="text"
                placeholder={text.auth.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder={text.auth.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder={text.auth.password}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength="6"
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                {isLogin ? text.auth.login : text.auth.signup}
              </button>
            </form>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#717171' }}>
              {isLogin ? text.auth.noAccount : text.auth.already}
              <button
                className="btn-outline"
                onClick={() => setIsLogin(!isLogin)}
                style={{ display: 'inline', padding: '4px 8px' }}
              >
                {isLogin ? text.auth.signup : text.auth.login}
              </button>
            </p>
            <button className="btn-outline" onClick={() => setShowAuth(false)} style={{ marginTop: '8px' }}>Cancel</button>
          </div>
        </div>
      )}

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

      {/* HOST DASHBOARD */}
      {showHost && user && (
        <section className="host-dashboard">
          <h3>{text.host.title}</h3>
          <div className="host-form">
            <input placeholder={text.host.name} value={newListing.title} onChange={(e) => setNewListing({ ...newListing, title: e.target.value })} />
            <input placeholder={text.host.city} value={newListing.city} onChange={(e) => setNewListing({ ...newListing, city: e.target.value })} />
            <input placeholder={text.host.price} type="number" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} />
            <select value={newListing.type} onChange={(e) => setNewListing({ ...newListing, type: e.target.value })}>
              <option value="short">Short Term</option>
              <option value="long">Long Duration</option>
              <option value="emergency">Emergency</option>
              <option value="vacation">Vacation</option>
            </select>
            <input placeholder={text.host.photo} value={newListing.image} onChange={(e) => setNewListing({ ...newListing, image: e.target.value })} />
            <button className="btn-primary" onClick={addListing}>{text.host.submit}</button>
          </div>
        </section>
      )}

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
                <p className="host-name">👤 {item.host}</p>
                <span className={`tag ${item.type}`}>
                  {item.type === 'short' ? 'Short' : item.type === 'long' ? 'Long' : item.type === 'emergency' ? 'Emergency' : 'Vacation'}
                </span>
                <button className="book-btn" onClick={() => handleBooking(item)}>{text.book}</button>
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
