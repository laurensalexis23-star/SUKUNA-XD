/**
 * server.js — Serveur HTTP de pairing pour SUKUNA XD
 *
 * Lance un serveur Express qui :
 *   • Sert la page pair.html  sur GET /
 *   • Expose                  GET /pair?number=XXXXXXXXX
 *     → appelle sock.requestPairingCode(number) et retourne { code }
 *
 * Intégration dans index.js (après que startInfinixBot() renvoie sock) :
 *
 *   const { startPairingServer } = require('./server');
 *   startPairingServer(sock);          // démarre sur le port 3000 par défaut
 *
 * Variables d'environnement :
 *   PORT        Port d'écoute (défaut : 3000)
 *   PAIR_SECRET Token optionnel attendu via le header X-Pair-Secret
 *               (laissez vide pour désactiver la protection)
 */

'use strict';

const http    = require('http');
const path    = require('path');
const fs      = require('fs');
const url     = require('url');

const HTML_FILE = path.join(__dirname, 'pair.html');
const PORT      = process.env.PORT || 3000;
const SECRET    = process.env.PAIR_SECRET || '';   // optionnel

/**
 * @param {import('@whiskeysockets/baileys').WASocket} sock
 */
function startPairingServer(sock) {
  const server = http.createServer(async (req, res) => {
    const parsed   = url.parse(req.url, true);
    const pathname = parsed.pathname;

    // ── CORS headers (utile si le frontend est servi ailleurs) ──
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Pair-Secret');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    // ── Servir la page HTML de pairing ──
    if (pathname === '/' || pathname === '/pair.html') {
      try {
        const html = fs.readFileSync(HTML_FILE);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
      } catch {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Erreur : fichier pair.html introuvable.');
      }
    }

    // ── Endpoint de génération de code ──
    if (pathname === '/pair') {
      // Vérification du secret (optionnel)
      if (SECRET && req.headers['x-pair-secret'] !== SECRET) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Accès refusé.' }));
      }

      const number = (parsed.query.number || '').replace(/\D/g, '');

      if (!number || number.length < 6 || number.length > 20) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Numéro invalide.' }));
      }

      // Vérifier que le numéro est enregistré sur WhatsApp
      try {
        const jid    = number + '@s.whatsapp.net';
        const exists = await sock.onWhatsApp(jid);
        if (!exists?.[0]?.exists) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Ce numéro n\'est pas enregistré sur WhatsApp.' }));
        }
      } catch (e) {
        console.error('[PairServer] onWhatsApp error:', e?.message || e);
        // On continue malgré l'erreur de vérification
      }

      // Demander le code de pairing
      try {
        let code = await sock.requestPairingCode(number);
        // Formater : XXXX-XXXX
        if (code) {
          code = code.match(/.{1,4}/g)?.join('-') || code;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ code }));
      } catch (e) {
        console.error('[PairServer] requestPairingCode error:', e?.message || e);
        const msg = e?.message?.includes('mobile api')
          ? 'Impossible d\'utiliser le code de pairing en mode mobile.'
          : 'Échec de la génération du code. Réessayez.';
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: msg }));
      }
    }

    // ── 404 ──
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route introuvable.' }));
  });

  server.listen(PORT, () => {
    console.log(`\n🌐 [PairServer] Site de pairing disponible sur http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    console.error('[PairServer] Erreur serveur :', err.message);
  });

  return server;
}

module.exports = { startPairingServer };
