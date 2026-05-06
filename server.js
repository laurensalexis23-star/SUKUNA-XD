const express = require('express');
const path = require('path');
const cors = require('cors');
const pino = require('pino');
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Fichiers statiques (ton site)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ ROUTE PAIRING - la nouvelle route importante
app.post('/generate', async (req, res) => {
  try {
    const { numero } = req.body;

    if (!numero) {
      return res.status(400).json({ error: 'Numéro requis' });
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth_' + numero);

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: 'silent' })
    });

    sock.ev.on('creds.update', saveCreds);

    const code = await sock.requestPairingCode(numero);

    res.json({ code });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toutes les autres pages → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🩸 SUKUNA XD – Server running on port ${PORT}`);
});