import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'waitlist.json');

app.use(cors());
app.use(express.json());

// Ensure waitlist.json exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    version: '3.8.2',
    enclaveCluster: 'swiss-zurich-tier4',
    mpcStatus: 'ONLINE_QUORUM_READY'
  });
});

// Institutional waitlist lead capture
app.post('/api/waitlist', (req, res) => {
  const { email, plan } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid institutional email is required.' });
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    
    const existing = list.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.json({ message: 'Institutional credentials already verified in queue.', status: 'EXISTS' });
    }

    list.push({
      email,
      plan: plan || 'Institutional Sovereign',
      timestamp: new Date().toISOString(),
      shardAllocation: '3-of-5-mpc-active'
    });

    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2));
    res.status(201).json({ message: 'Sovereign Vault Node credentials reserved.', status: 'CREATED' });
  } catch (err) {
    res.status(500).json({ error: 'Internal ledger error' });
  }
});

app.listen(PORT, () => {
  console.log(`🔒 Vault Institutional API running on http://localhost:${PORT}`);
});
