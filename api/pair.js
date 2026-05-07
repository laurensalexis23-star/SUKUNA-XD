const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

const SESSION_DIR = '/tmp/sessions';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let { number } = req.body;
  if (!number) return res.status(400).json({ error: 'Numéro requis' });

  number = number.replace(/[^0-9]/g, '');
  if (number.length < 7) return res.status(400).json({ error: 'Numéro invalide' });

  const sessionPath = path.join(SESSION_DIR, number);

  try {
    if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });

    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      browser: ['SUKUNA XD', 'Chrome', '20.0.04'],
      markOnlineOnConnect: false,
    });

    if (!sock.authState.creds.registered) {
      await new Promise(r => setTimeout(r, 1500));
      let code;
      try {
        code = await sock.requestPairingCode(number);
      } catch (e) {
        sock.end();
        return res.status(500).json({ error: 'Erreur génération code. Réessaie.' });
      }

      code = code?.match(/.{1,4}/g)?.join('-') || code;
      sock.end();
      return res.status(200).json({ code, number });
    } else {
      sock.end();
      return res.status(200).json({ code: null, message: 'Déjà connecté' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur: ' + err.message });
  }
};