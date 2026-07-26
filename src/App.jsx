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
    booking: {
      confirm: "Booking Confirmed!",
      emailSent: "Confirmation email sent to",
      reply: "Thank you for booking! We'll contact you within 24 hours."
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
    booking: {
      confirm: "Réservation confirmée !",
      emailSent: "Email de confirmation envoyé à",
      reply: "Merci pour votre réservation ! Nous vous contacterons sous 24h."
    }
  }
};

const initialListings = [
  { id: 1, title: "Charme Parisien", city: "Paris", price: 65, type: "short", icon: "🏠", host: "Sophie", email: "sophie@budgetinn.com" },
  { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, type: "short", icon: "🏠", host: "Jean", email: "jean@budgetinn.com" },
  { id: 3, title: "Villa Marseille", city: "Marseille", price: 30, type: "emergency", icon: "🚨", host: "Marie", email: "marie@budgetinn.com" },
  { id: 4, title: "Nice Vacations", city: "Nice", price: 80, type: "vacation", icon: "🌴", host: "Pierre", email: "pierre@budgetinn.com" }
];

function App() {
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings, setListings] = useState(initialListings);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showHost, setShowHost] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [newListing, setNewListing] = useState({ title: '', city: '', price: '', type: 'short', image: '' });
  const text = translations[lang];

  // ===== AUTH =====
  const handleLogin = () => {
    const name = prompt("Enter your name:");
    if (!name) return;
    const email = prompt("Enter your email (for confirmation):");
    if (!email) return;
    setUser({ name, email });
    setShowLogin(false);
  };

  const handleLogout = () => setUser(null);

  // ===== BOOKING WITH EMAIL =====
  const handleBooking = (listing) => {
    if (!user) {
      alert("Please Sign In first!");
      setShowLogin(true);
      return;
    }
    // Show confirmation
    setBookingMessage(`✅ ${text.booking.confirm}\n${text.booking.emailSent}: ${user.email}\n${text.booking.reply}`);
    alert(bookingMessage || `${text.booking.confirm}\n${text.booking.emailSent}: ${user.email}\n${text.booking.reply}`);
    // Simulate email sent
    console.log(`📧 Email sent to ${user.email} for listing: ${listing.title}`);
  };

  // ===== HOST =====
  const addListing = () => {
    if (!user) {
      alert("Please Sign In first!");
      setShowLogin(true);
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
      host: user.name,
      email: user.email
    };
    setListings([listing, ...listings]);
    setNewListing({ title: '', city: '', price: '', type: 'short', image: '' });
    setShowHost(false);
    alert("✅ Listing published successfully!");
  };

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
              <button className="btn-outline" onClick={() => setShowLogin(true)}>{text.signin}</button>
              <button className="btn-primary" onClick={() => setShowLogin(true)}>{text.join}</button>
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

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <h2>Welcome to Budget Inn</h2>
            <p>Enter your name and email to continue</p>
            <button className="btn-primary" onClick={handleLogin}>Continue</button>
            <button className="btn-outline" onClick={() => setShowLogin(false)}>Cancel</button>
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

export default App;.