import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Safe Supabase client initialization wrapper
let supabase = null;
const isSupabaseConfigured = process.env.SUPABASE_URL &&
                             process.env.SUPABASE_URL !== 'your_supabase_url' &&
                             process.env.SUPABASE_ANON_KEY &&
                             process.env.SUPABASE_ANON_KEY !== 'your_supabase_anon_key';

if (isSupabaseConfigured) {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    console.log('🔌 Connected to Supabase successfully.');
  } catch (err) {
    console.error('⚠️ Supabase Connection Error, falling back to local database mock:', err.message);
  }
} else {
  console.log('ℹ️ Supabase environment variables missing or placeholders. Using mock database.');
}

// Mock Database Storage
const mockListings = [
  {
    id: 'p1',
    title: 'iPhone 17 Pro Max (pm Blue)',
    brand: 'Apple',
    category: 'smartphones',
    price: 1399,
    description: 'The ultra-premium flagship with next-gen performance and PM Blue finish.',
    image: '/assets/17_pm_Blue.jpg'
  },
  {
    id: 'p2',
    title: 'iPhone 17 Pro Max (pm Orange)',
    brand: 'Apple',
    category: 'smartphones',
    price: 1399,
    description: 'Premium flagship in striking PM Orange, built for the ultimate power user.',
    image: '/assets/17_pm_Orange.jpg'
  },
  {
    id: 'p3',
    title: 'iPhone 17 Pro Max (pm White)',
    brand: 'Apple',
    category: 'smartphones',
    price: 1399,
    description: 'Timeless luxury meets raw performance in a pristine PM White colorway.',
    image: '/assets/17_pm_White.jpg'
  }
];

const mockBookings = [];

app.get('/', (req, res) => res.json({ message: 'dizibazar Gadgets API 📱🔥' }));

// Get all listings
app.get('/api/listings', async (req, res) => {
  if (supabase) {
    const { data, error } = await supabase.from('listings').select('*');
    if (!error) return res.json(data);
    console.error('Supabase fetch error:', error.message);
  }
  // Fallback
  res.json(mockListings);
});

// Create booking / order
app.post('/api/bookings', async (req, res) => {
  const { listing_id, guest_id, check_in, total_price } = req.body;
  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{ listing_id, guest_id, check_in, total_price }])
      .select();
    if (!error) return res.json(data);
    console.error('Supabase booking insert error:', error.message);
  }
  // Fallback
  const newBooking = { id: `bk-${Date.now()}`, listing_id, guest_id, check_in, total_price, status: 'confirmed' };
  mockBookings.push(newBooking);
  res.json([newBooking]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 dizibazar API running on port ${PORT}`));
console.log('SUPABASE_URL status:', process.env.SUPABASE_URL ? 'Configured' : 'Missing');
