import React, { useState, useEffect } from 'react';
import './App.css';

// ===== INITIAL MODERN PRODUCT DATASET =====
const initialProducts = [
  {
    id: 'p1',
    name: 'iPhone 17 Pro Max (pm Blue)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1399,
    description: 'The ultra-premium flagship with next-gen performance and PM Blue finish.',
    image: '/assets/17_pm_Blue.jpg',
    specs: '6.9" Super Retina XDR, A19 Bionic, 512GB'
  },
  {
    id: 'p2',
    name: 'iPhone 17 Pro Max (pm Orange)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1399,
    description: 'Premium flagship in striking PM Orange, built for the ultimate power user.',
    image: '/assets/17_pm_Orange.jpg',
    specs: '6.9" Super Retina XDR, A19 Bionic, 512GB'
  },
  {
    id: 'p3',
    name: 'iPhone 17 Pro Max (pm White)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1399,
    description: 'Timeless luxury meets raw performance in a pristine PM White colorway.',
    image: '/assets/17_pm_White.jpg',
    specs: '6.9" Super Retina XDR, A19 Bionic, 512GB'
  },
  {
    id: 'p4',
    name: 'iPhone 17 Pro (Pro Blue)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1199,
    description: 'Pro performance in an optimized form factor, styled in sleek Pro Blue.',
    image: '/assets/17_Pro_blue.jpg',
    specs: '6.3" LTPO OLED, A19 Pro Chip, 256GB'
  },
  {
    id: 'p5',
    name: 'iPhone 17 Pro (Pro Orange)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1199,
    description: 'Bold styling and top-tier capabilities in stunning Pro Orange.',
    image: '/assets/17_Pro_Orange.jpg',
    specs: '6.3" LTPO OLED, A19 Pro Chip, 256GB'
  },
  {
    id: 'p6',
    name: 'iPhone 17 Pro (Pro White)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 1199,
    description: 'The standard of luxury. Pristine Pro White finish with ultimate durability.',
    image: '/assets/17_pro_White.jpg',
    specs: '6.3" LTPO OLED, A19 Pro Chip, 256GB'
  },
  {
    id: 'p7',
    name: 'iPhone 17 Air (Blue Ceil)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 999,
    description: 'The thinnest iPhone ever made, featuring a lightweight Air Blue Ceil frame.',
    image: '/assets/17_Air_Blue_Ceil.jpg',
    specs: '6.6" Slim XDR, A19 Slim, 128GB'
  },
  {
    id: 'p8',
    name: 'iPhone 17 Air (Air White)',
    brand: 'Apple',
    category: 'smartphones',
    subCategory: 'apple',
    price: 999,
    description: 'Ultra-thin concept with maximum aesthetics in Air White.',
    image: '/assets/17_Air_White.jpg',
    specs: '6.6" Slim XDR, A19 Slim, 128GB'
  },
  {
    id: 'p9',
    name: 'Galaxy S25 Ultra (Sunset Green)',
    brand: 'Samsung',
    category: 'smartphones',
    subCategory: 'samsung',
    price: 1299,
    description: 'Next-gen Android supremacy with full S-Pen support and a titanium Sunset Green body.',
    image: '/assets/17_Green.jpg',
    specs: '6.8" Dynamic AMOLED 2X, Snapdragon Gen 4'
  },
  {
    id: 'p10',
    name: 'Xiaomi 15 Ultra (Shadow Black)',
    brand: 'Xiaomi',
    category: 'smartphones',
    subCategory: 'xiaomi',
    price: 1099,
    description: 'Leica professional optics system in a stealth-inspired Shadow Black finish.',
    image: '/assets/17_Black.jpg',
    specs: '6.73" AMOLED, Leica Quad Camera, 120W Charge'
  },
  {
    id: 'p11',
    name: 'Refurbished iPhone 15 Pro (Occasion Blue)',
    brand: 'Apple',
    category: 'telephone_occasion',
    subCategory: 'apple',
    price: 749,
    description: 'Excellent condition refurbished phone, tested thoroughly. Occasion Blue.',
    image: '/assets/17_Blue.jpg',
    specs: 'Certified Pre-Owned, 100% Battery Health, 1 Year Warranty'
  },
  {
    id: 'p12',
    name: 'Electric Trotinette Pro Dual-Motor',
    brand: 'Segway',
    category: 'others',
    subCategory: 'trotinettes',
    price: 849,
    description: 'Heavy duty, professional folding commuter scooter with full suspension.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=400&auto=format&fit=crop',
    specs: 'Speed: 45km/h, Range: 65km, Dual 1000W Motors'
  },
  {
    id: 'p13',
    name: 'DJI Mavic 4 Pro Cinema',
    brand: 'DJI',
    category: 'others',
    subCategory: 'dji',
    price: 2199,
    description: 'Hasselblad triple-camera drone for Hollywood-level aerial cinematography.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop',
    specs: '5.1K Video, 43 min flight time, Omnidirectional sensing'
  },
  {
    id: 'p14',
    name: 'Premium Air Fryer Deluxe',
    brand: 'Philips',
    category: 'electromenagers',
    subCategory: 'others',
    price: 249,
    description: 'Fast, healthy, and versatile smart cooking appliance for your modern kitchen.',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=400&auto=format&fit=crop',
    specs: '8.3L capacity, Smart Sensing, 2200W power'
  }
];

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dizibazar_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dizibazar_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dizibazar_orders');
    return saved ? JSON.parse(saved) : [
      { id: 'o-1001', date: 'August 1, 2026', total: 1399, items: '1x iPhone 17 Pro Max (pm Blue)' },
      { id: 'o-1002', date: 'July 30, 2026', total: 2199, items: '1x DJI Mavic 4 Pro Cinema' }
    ];
  });

  // Default login session: "firehose" (Professional admin role)
  const [currentUser] = useState({ name: 'firehose', role: 'admin' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering System
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  // Add listing state
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'smartphones',
    subCategory: 'apple',
    price: '',
    description: '',
    image: '',
    specs: ''
  });

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('dizibazar_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dizibazar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dizibazar_orders', JSON.stringify(orders));
  }, [orders]);

  // UI Handlers
  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PRO10') {
      setDiscountPercent(10);
      alert('🎉 10% Discount Applied!');
    } else if (promoCode.trim().toUpperCase() === 'FIREHOSE') {
      setDiscountPercent(20);
      alert('🔥 Admin Firehose 20% Discount Applied!');
    } else {
      alert('❌ Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const itemsDescription = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const newOrder = {
      id: `o-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      total: getCartTotal(),
      items: itemsDescription
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    alert(`🛒 Checkout Confirmed!\nThank you for shopping at dizibazar.`);
  };

  // Seller Dash Actions
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.brand || !newProduct.price) {
      alert('Please fill out all required fields');
      return;
    }
    const item = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      subCategory: newProduct.subCategory,
      price: parseFloat(newProduct.price),
      description: newProduct.description || 'Premium product from dizibazar.',
      image: newProduct.image || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop',
      specs: newProduct.specs || 'N/A'
    };

    setProducts([item, ...products]);
    setNewProduct({
      name: '',
      brand: '',
      category: 'smartphones',
      subCategory: 'apple',
      price: '',
      description: '',
      image: '',
      specs: ''
    });
    alert('✅ Product listed successfully!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this product from dizibazar?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Calculations
  const getCartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getCartTotal = () => {
    const sub = getCartSubtotal();
    return Math.round(sub * (1 - discountPercent / 100));
  };
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'all' || p.subCategory === activeSubCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <div className="app">
      {/* HEADER NAVBAR */}
      <header className="header">
        <div className="logo-container">
          <div className="pro-logo-icon">db</div>
          <div className="logo">
            <h1>dizi<span>bazar</span></h1>
          </div>
        </div>

        <div className="header-actions">
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Cart
            {getCartCount() > 0 && <span className="cart-badge-count">{getCartCount()}</span>}
          </button>

          {currentUser && (
            <div className="user-badge">
              <span className="user-avatar">🔥</span>
              <span>{currentUser.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h2>Premium Gadgets & Electronics</h2>
        <p>A professional, ultra-modern shop for next-generation tech. Handpicked smartphones, drones, and home appliances.</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search premium smartphones, drones, appliances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>🔍 Search</button>
        </div>
      </section>

      {/* WORKSPACE & DASHBOARDS */}
      <main className="main-workspace">
        {/* SIDEBAR TAXONOMY */}
        <aside className="sidebar">
          <h3>Categories</h3>

          <div className="category-group">
            <button
              className={`category-header ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('all'); setActiveSubCategory('all'); }}
            >
              🌐 All Categories
            </button>
          </div>

          <div className="category-group">
            <button
              className={`category-header ${activeCategory === 'smartphones' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('smartphones'); setActiveSubCategory('all'); }}
            >
              📱 Smartphones
            </button>
            {activeCategory === 'smartphones' && (
              <div className="subcategory-list">
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('all')}
                >
                  All Brands
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'apple' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('apple')}
                >
                  Apple
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'samsung' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('samsung')}
                >
                  Samsung
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'xiaomi' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('xiaomi')}
                >
                  Xiaomi
                </button>
              </div>
            )}
          </div>

          <div className="category-group">
            <button
              className={`category-header ${activeCategory === 'telephone_occasion' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('telephone_occasion'); setActiveSubCategory('all'); }}
            >
              ♻️ Telephone Occasion
            </button>
          </div>

          <div className="category-group">
            <button
              className={`category-header ${activeCategory === 'electromenagers' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('electromenagers'); setActiveSubCategory('all'); }}
            >
              🔌 Electromenagers
            </button>
          </div>

          <div className="category-group">
            <button
              className={`category-header ${activeCategory === 'others' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('others'); setActiveSubCategory('all'); }}
            >
              🛹 Others
            </button>
            {activeCategory === 'others' && (
              <div className="subcategory-list">
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('all')}
                >
                  All Others
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'trotinettes' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('trotinettes')}
                >
                  Trotinettes
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'drones' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('drones')}
                >
                  Drones
                </button>
                <button
                  className={`sub-cat-btn ${activeSubCategory === 'dji' ? 'active' : ''}`}
                  onClick={() => setActiveSubCategory('dji')}
                >
                  DJI
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div className="products-container">
          {/* SELLER MERCHANT DASHBOARD */}
          {currentUser && currentUser.role === 'admin' && (
            <div className="dashboard-container">
              <div className="dashboard-header">
                <h3>Merchant Panel — logged in as <span>{currentUser.name}</span></h3>
              </div>
              <div className="dashboard-body">
                <div className="dashboard-grid">
                  {/* ADD PRODUCT */}
                  <div className="add-item-panel">
                    <h4>Add Premium Gadget</h4>
                    <form onSubmit={handleAddProduct} className="dashboard-form">
                      <div className="form-group">
                        <label>Product Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. iPhone 17 Pro Max"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Brand *</label>
                        <input
                          type="text"
                          placeholder="e.g. Apple, DJI, Samsung"
                          value={newProduct.brand}
                          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category *</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                          <option value="smartphones">Smartphones</option>
                          <option value="telephone_occasion">Telephone Occasion</option>
                          <option value="electromenagers">Electromenagers</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Sub Category</label>
                        <select
                          value={newProduct.subCategory}
                          onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                        >
                          <option value="apple">Apple</option>
                          <option value="samsung">Samsung</option>
                          <option value="xiaomi">Xiaomi</option>
                          <option value="trotinettes">Trotinettes</option>
                          <option value="drones">Drones</option>
                          <option value="dji">DJI</option>
                          <option value="others">Others / Electromenagers</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (€) *</label>
                        <input
                          type="number"
                          placeholder="Price"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Image Path / URL</label>
                        <input
                          type="text"
                          placeholder="/assets/17_pm_Blue.jpg"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Specifications</label>
                        <input
                          type="text"
                          placeholder="Specs (e.g. 512GB, Dual Motors)"
                          value={newProduct.specs}
                          onChange={(e) => setNewProduct({ ...newProduct, specs: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          placeholder="Detailed features..."
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn-primary">List Product on dizibazar</button>
                    </form>
                  </div>

                  {/* RECENT ORDERS */}
                  <div className="orders-panel">
                    <h4>Merchant Order Receipts</h4>
                    <div className="order-list">
                      {orders.map(order => (
                        <div className="order-card" key={order.id}>
                          <div className="order-header">
                            <span className="order-id">🧾 {order.id}</span>
                            <span className="order-total">€{order.total}</span>
                          </div>
                          <div className="order-body" style={{ marginTop: '5px', fontSize: '13px' }}>
                            <p className="order-items">{order.items}</p>
                            <p className="order-date">{order.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATALOG DISPLAY */}
          <div className="section-title-bar">
            <h2>
              {activeCategory === 'all' ? 'All Tech Products' : activeCategory.replace('_', ' ').toUpperCase()}
              {activeSubCategory !== 'all' && ` > ${activeSubCategory.toUpperCase()}`}
            </h2>
            <span style={{ fontSize: '14px', color: '#7a7a7a', fontWeight: 'bold' }}>
              Showing {filteredProducts.length} premium listings
            </span>
          </div>

          <div className="cards-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="card">
                <span className="product-tag">{product.category}</span>
                <div className="card-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="card-body">
                  <span className="card-brand">{product.brand}</span>
                  <h4>{product.name}</h4>
                  <p style={{ fontSize: '11px', color: '#b05b35', fontWeight: 'bold', marginBottom: '8px' }}>
                    📐 {product.specs}
                  </p>
                  <p className="card-description">{product.description}</p>

                  <div className="card-meta">
                    <div className="price-container">
                      <span className="price-label">Premium Price</span>
                      <span className="price-value">€{product.price}</span>
                    </div>
                    <div className="card-actions">
                      {currentUser && currentUser.role === 'admin' && (
                        <button
                          className="btn-delete-item"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete product listing"
                        >
                          🗑️
                        </button>
                      )}
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(product)}
                        title="Add to shopping cart"
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SLIDING CART SIDEBAR */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <button className="btn-close-cart" onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            <div className="cart-items-container">
              {cart.length === 0 ? (
                <div className="empty-cart-view">
                  <span className="empty-cart-icon">🛒</span>
                  <p>Your shopping cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop';
                      }}
                    />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <div className="cart-item-price">€{item.price} each</div>
                      <div className="cart-item-qty">
                        <button className="btn-qty" onClick={() => updateCartQty(item.id, -1)}>-</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button className="btn-qty" onClick={() => updateCartQty(item.id, 1)}>+</button>
                        <button className="btn-remove-item" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-promo-box">
                  <input
                    type="text"
                    placeholder="Enter Promo (PRO10 or FIREHOSE)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="btn-primary" onClick={applyPromo} style={{ padding: '8px 15px', borderRadius: '6px' }}>
                    Apply
                  </button>
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>€{getCartSubtotal()}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="summary-row" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                      <span>Discount ({discountPercent}%)</span>
                      <span>-€{Math.round(getCartSubtotal() * (discountPercent / 100))}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>€{getCartTotal()}</span>
                  </div>
                </div>

                <button className="btn-checkout" onClick={handleCheckout}>
                  Confirm Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">dizi<span>bazar</span></div>
          <p>© 2026 dizibazar — Premium Gadgets, curated professionally by firehose.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
