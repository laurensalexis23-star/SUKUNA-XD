/**
 * SUKUNA XD - WhatsApp Pair Code Generator Backend
 * 
 * Ce serveur génère des codes de pairing WhatsApp authentiques
 * en utilisant la bibliothèque Baileys (WhatsApp Web API)
 * 
 * Installation: npm install express cors body-parser @whiskeysockets/baileys qrcode
 * Lancement: node server.js
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stockage des sessions actives
const activeSessions = {};

/**
 * Génère un pair code pour un numéro WhatsApp
 * POST /api/generate-pair-code
 */
app.post('/api/generate-pair-code', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Validation du numéro
    if (!phoneNumber || phoneNumber.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Numéro de téléphone invalide'
      });
    }

    // Nettoyer le numéro (garder seulement les chiffres)
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    // Ajouter le préfixe du pays si absent
    let fullNumber = cleanNumber;
    if (!cleanNumber.startsWith('1') && cleanNumber.length === 10) {
      // Format US/Canada
      fullNumber = '1' + cleanNumber;
    } else if (cleanNumber.length === 9 && !cleanNumber.startsWith('225')) {
      // Format Côte d'Ivoire (225 est l'indicatif)
      fullNumber = '225' + cleanNumber;
    }

    console.log(`📱 Génération du pair code pour: ${fullNumber}`);

    // Créer une session temporaire pour générer le pair code
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const authDir = path.join(__dirname, 'auth_sessions', sessionId);

    // Créer le répertoire de session
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Initialiser l'authentification multi-fichiers
    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    // Créer le socket WhatsApp
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      browser: ['SUKUNA XD', 'Chrome', '120.0.0.0'],
      syncFullHistory: false,
      maxMsgsInMemory: 0,
      shouldIgnoreJid: () => false,
    });

    // Variable pour stocker le pair code
    let pairCode = null;
    let pairingCodeTimeout = null;

    // Événement: Pair code reçu
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (connection === 'connecting') {
        console.log('🔄 Connexion en cours...');
      }

      if (connection === 'open') {
        console.log('✅ Connecté avec succès');
        // Fermer la connexion après génération du pair code
        setTimeout(() => {
          sock.end();
          cleanupSession(sessionId);
        }, 1000);
      }

      if (connection === 'close') {
        if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
          console.log('🔌 Reconnexion...');
        } else {
          console.log('❌ Déconnecté');
          cleanupSession(sessionId);
        }
      }
    });

    // Événement: Pair code généré
    sock.ev.on('creds.update', saveCreds);

    // Demander le pair code
    try {
      console.log(`📲 Demande du pair code pour: ${fullNumber}`);
      
      // Attendre que le socket soit prêt
      await new Promise(resolve => {
        const checkReady = setInterval(() => {
          if (sock.user) {
            clearInterval(checkReady);
            resolve();
          }
        }, 100);

        // Timeout après 15 secondes
        setTimeout(() => {
          clearInterval(checkReady);
          resolve();
        }, 15000);
      });

      // Générer le pair code
      pairCode = await sock.requestPairingCode(fullNumber);
      console.log(`✨ Pair code généré: ${pairCode}`);

      // Fermer la connexion
      sock.end();
      cleanupSession(sessionId);

      // Retourner le pair code
      return res.json({
        success: true,
        pairCode: pairCode,
        phoneNumber: fullNumber,
        message: 'Pair code généré avec succès. Entrez ce code dans WhatsApp → Appareils liés'
      });

    } catch (error) {
      console.error('❌ Erreur lors de la génération du pair code:', error.message);
      sock.end();
      cleanupSession(sessionId);

      return res.status(500).json({
        success: false,
        error: 'Impossible de générer le pair code. Vérifiez votre numéro et réessayez.',
        details: error.message
      });
    }

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur',
      details: error.message
    });
  }
});

/**
 * Nettoie une session après utilisation
 */
function cleanupSession(sessionId) {
  const authDir = path.join(__dirname, 'auth_sessions', sessionId);
  if (fs.existsSync(authDir)) {
    fs.rmSync(authDir, { recursive: true, force: true });
    console.log(`🗑️  Session nettoyée: ${sessionId}`);
  }
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SUKUNA XD Pair Code Generator',
    timestamp: new Date().toISOString()
  });
});

/**
 * Endpoint d'information
 */
app.get('/api/info', (req, res) => {
  res.json({
    name: 'SUKUNA XD Pair Code Generator',
    version: '1.0.0',
    description: 'Générateur de codes de pairing WhatsApp authentiques',
    endpoints: {
      'POST /api/generate-pair-code': 'Génère un pair code pour un numéro WhatsApp',
      'GET /api/health': 'Vérification de l\'état du serveur',
      'GET /api/info': 'Informations sur le service'
    }
  });
});

/**
 * Démarrage du serveur
 */
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   SUKUNA XD - Pair Code Generator     ║
║   🩸 WhatsApp Bot Pairing Service     ║
╚════════════════════════════════════════╝

✅ Serveur démarré sur http://localhost:${PORT}
📍 API disponible à: http://localhost:${PORT}/api
🔗 Health check: http://localhost:${PORT}/api/health

Prêt à générer des codes de pairing WhatsApp!
  `);
});

/**
 * Gestion des erreurs non capturées
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejetée non gérée:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Exception non capturée:', error);
  process.exit(1);
});
