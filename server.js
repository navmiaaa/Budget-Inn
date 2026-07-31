import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get('/', (req, res) => res.json({ message: 'Budget Inn API 🏨' }));

// Get all listings
app.get('/api/listings', async (req, res) => {
  const { data, error } = await supabase.from('listings').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  const { listing_id, guest_id, check_in, total_price } = req.body;
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ listing_id, guest_id, check_in, total_price }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Budget Inn API running on port ${PORT}`));
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
