import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const listings = [
    { id: 1, title: "Charme Parisien", city: "Paris", price: 65, icon: "🏠" },
    { id: 2, title: "Studio Lyon", city: "Lyon", price: 50, icon: "🏠" },
    { id: 3, title: "Urgence Marseille", city: "Marseille", price: 30, icon: "🚨" }
  ];

  const filtered = listings.filter(l =>
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🏨 Budget Inn</h1>
      <input
        type="text"
        placeholder="Search city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '100%', maxWidth: '400px', margin: '10px 0' }}
      />
      {filtered.map(item => (
        <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
          <h3>{item.icon} {item.title}</h3>
          <p>📍 {item.city} — €{item.price}/night</p>
        </div>
      ))}
    </div>
  );
}

export default App;
