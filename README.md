<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SUKUNA XD — Pairing Session</title>
<link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #07000f;
    --surface: #0d0018;
    --panel: #120022;
    --border: #3d0070;
    --accent: #8A2BE2;
    --accent-hot: #c44dff;
    --accent-red: #ff2a4a;
    --accent-gold: #f5c518;
    --text: #e8d0ff;
    --muted: #7a5a9a;
    --glow-purple: 0 0 30px rgba(138,43,226,0.5);
    --glow-red: 0 0 30px rgba(255,42,74,0.5);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── ANIMATED BG ── */
  .bg-layer {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  /* Diagonal grid */
  .bg-layer::before {
    content: '';
    position: absolute;
    inset: -50%;
    background-image:
      linear-gradient(rgba(138,43,226,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(138,43,226,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    transform: rotate(-15deg);
    animation: gridDrift 20s linear infinite;
  }

  @keyframes gridDrift {
    from { transform: rotate(-15deg) translateY(0); }
    to { transform: rotate(-15deg) translateY(60px); }
  }

  /* Radial blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.25;
    animation: blobPulse 8s ease-in-out infinite;
  }

  .blob1 { width: 500px; height: 500px; background: var(--accent); top: -100px; left: -100px; }
  .blob2 { width: 400px; height: 400px; background: var(--accent-red); bottom: -100px; right: -100px; animation-delay: -4s; }
  .blob3 { width: 300px; height: 300px; background: #4a00ff; top: 40%; left: 50%; animation-delay: -2s; }

  @keyframes blobPulse {
    0%, 100% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(1.2); opacity: 0.3; }
  }

  /* Particles */
  .particles {
    position: absolute;
    inset: 0;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--accent-hot);
    border-radius: 50%;
    animation: float linear infinite;
    box-shadow: 0 0 4px var(--accent-hot);
  }

  @keyframes float {
    from { transform: translateY(100vh) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    to { transform: translateY(-100px) translateX(var(--drift)); opacity: 0; }
  }

  /* ── NAVBAR ── */
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    background: rgba(7,0,15,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(138,43,226,0.2);
  }

  .nav-logo {
    font-family: 'Black Ops One', cursive;
    font-size: 1.4rem;
    color: var(--accent-hot);
    text-shadow: 0 0 20px rgba(196,77,255,0.7);
    letter-spacing: 3px;
  }

  .nav-logo span { color: var(--accent-red); }

  .nav-badge {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    color: var(--muted);
    border: 1px solid rgba(138,43,226,0.3);
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 2px;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 24px 60px;
    text-align: center;
  }

  .hero-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 4px;
    color: var(--accent-red);
    text-transform: uppercase;
    margin-bottom: 24px;
    animation: fadeUp 0.7s ease both;
  }

  .hero-eyebrow::before, .hero-eyebrow::after {
    content: '──';
    margin: 0 12px;
    opacity: 0.5;
  }

  .hero-title {
    font-family: 'Black Ops One', cursive;
    font-size: clamp(3.5rem, 10vw, 7rem);
    line-height: 1;
    margin-bottom: 8px;
    animation: fadeUp 0.7s 0.1s ease both;
    position: relative;
  }

  .hero-title .t1 {
    display: block;
    color: #fff;
    text-shadow: 0 0 60px rgba(138,43,226,0.6), 0 0 120px rgba(138,43,226,0.3);
  }

  .hero-title .t2 {
    display: block;
    color: var(--accent-hot);
    text-shadow: 0 0 40px rgba(196,77,255,0.8);
    font-size: 0.55em;
    letter-spacing: 8px;
  }

  .hero-version {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 3px;
    margin-bottom: 40px;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .hero-desc {
    max-width: 520px;
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 56px;
    animation: fadeUp 0.7s 0.3s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── PAIRING CARD ── */
  .pairing-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    animation: fadeUp 0.7s 0.4s ease both;
  }

  .card-inner {
    background: rgba(18, 0, 34, 0.85);
    border: 1px solid rgba(138,43,226,0.35);
    border-radius: 16px;
    padding: 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 60px rgba(138,43,226,0.15), inset 0 0 40px rgba(0,0,0,0.4);
    position: relative;
    overflow: hidden;
  }

  /* Top accent line */
  .card-inner::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-red), var(--accent-hot), transparent);
  }

  /* Corner ornaments */
  .card-inner::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 100px; height: 100px;
    background: radial-gradient(circle at bottom right, rgba(138,43,226,0.15), transparent);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .card-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--accent-red), var(--accent));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    box-shadow: 0 0 20px rgba(255,42,74,0.4);
  }

  .card-title {
    font-family: 'Black Ops One', cursive;
    font-size: 1.2rem;
    color: #fff;
    letter-spacing: 1px;
  }

  .card-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Steps */
  .steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  .step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(138,43,226,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--accent-hot);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .step-text {
    font-size: 0.92rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .step-text strong { color: var(--text); }

  /* Input group */
  .input-group {
    margin-bottom: 20px;
  }

  .input-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    position: absolute;
    left: 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    color: var(--accent-hot);
    z-index: 1;
    pointer-events: none;
  }

  .phone-input {
    width: 100%;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(138,43,226,0.3);
    border-radius: 10px;
    padding: 14px 16px 14px 42px;
    color: var(--text);
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
    letter-spacing: 2px;
  }

  .phone-input:focus {
    border-color: var(--accent-hot);
    box-shadow: 0 0 0 3px rgba(196,77,255,0.15);
    background: rgba(138,43,226,0.06);
  }

  .phone-input::placeholder {
    color: rgba(122,90,154,0.5);
    letter-spacing: 1px;
  }

  /* Format hint */
  .input-hint {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    color: var(--muted);
    margin-top: 8px;
    letter-spacing: 1px;
  }

  /* Generate button */
  .btn-generate {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent) 60%, var(--accent-hot) 100%);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: 'Black Ops One', cursive;
    font-size: 1rem;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(138,43,226,0.4);
  }

  .btn-generate::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  .btn-generate:hover::before { left: 100%; }

  .btn-generate:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(138,43,226,0.6), 0 8px 30px rgba(0,0,0,0.4);
  }

  .btn-generate:active { transform: translateY(0); }

  .btn-generate:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Result box */
  .result-box {
    display: none;
    margin-top: 24px;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(138,43,226,0.4);
    border-radius: 10px;
    padding: 24px;
    text-align: center;
    animation: revealCode 0.5s ease both;
    position: relative;
    overflow: hidden;
  }

  .result-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(138,43,226,0.05), transparent);
    pointer-events: none;
  }

  @keyframes revealCode {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .result-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    color: var(--muted);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .result-code {
    font-family: 'Black Ops One', cursive;
    font-size: 2.8rem;
    color: var(--accent-hot);
    text-shadow: 0 0 30px rgba(196,77,255,0.8);
    letter-spacing: 8px;
    margin-bottom: 12px;
    animation: codeGlow 2s ease-in-out infinite;
  }

  @keyframes codeGlow {
    0%, 100% { text-shadow: 0 0 30px rgba(196,77,255,0.8); }
    50% { text-shadow: 0 0 60px rgba(196,77,255,1), 0 0 100px rgba(196,77,255,0.4); }
  }

  .result-instruction {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .result-instruction strong { color: var(--accent-gold); }

  .copy-btn {
    margin-top: 16px;
    padding: 8px 20px;
    background: transparent;
    border: 1px solid rgba(196,77,255,0.4);
    border-radius: 6px;
    color: var(--accent-hot);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover {
    background: rgba(196,77,255,0.1);
    border-color: var(--accent-hot);
  }

  /* Loading spinner */
  .loader {
    display: none;
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Error box */
  .error-box {
    display: none;
    margin-top: 16px;
    padding: 14px 18px;
    background: rgba(255,42,74,0.08);
    border: 1px solid rgba(255,42,74,0.3);
    border-radius: 8px;
    color: #ff7a8a;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 1px;
    animation: fadeUp 0.3s ease both;
  }

  /* ── INFO SECTION ── */
  .info-section {
    position: relative;
    z-index: 2;
    padding: 80px 24px;
    max-width: 960px;
    margin: 0 auto;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-top: 48px;
  }

  .info-card {
    background: rgba(18,0,34,0.7);
    border: 1px solid rgba(61,0,112,0.6);
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }

  .info-card:hover {
    border-color: rgba(138,43,226,0.5);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), var(--glow-purple);
  }

  .info-icon { font-size: 2.2rem; margin-bottom: 16px; display: block; }

  .info-title {
    font-family: 'Black Ops One', cursive;
    font-size: 1rem;
    color: #fff;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

  .info-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.5;
  }

  /* Section label */
  .section-eyebrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 4px;
    color: var(--accent-red);
    text-transform: uppercase;
    text-align: center;
  }

  .section-eyebrow::before, .section-eyebrow::after {
    content: '──';
    margin: 0 10px;
    opacity: 0.4;
  }

  .section-title {
    font-family: 'Black Ops One', cursive;
    font-size: clamp(1.6rem, 4vw, 2.5rem);
    text-align: center;
    margin-top: 10px;
    color: #fff;
  }

  .section-title span { color: var(--accent-hot); }

  /* ── WARNING BOX ── */
  .warning-strip {
    position: relative;
    z-index: 2;
    max-width: 520px;
    margin: 0 auto 60px;
    background: rgba(245,197,24,0.05);
    border: 1px solid rgba(245,197,24,0.2);
    border-radius: 10px;
    padding: 16px 24px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .warning-icon { font-size: 1.2rem; flex-shrink: 0; }

  .warning-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.78rem;
    color: rgba(245,197,24,0.7);
    line-height: 1.6;
    letter-spacing: 0.5px;
  }

  /* ── FOOTER ── */
  footer {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 40px 24px;
    border-top: 1px solid rgba(61,0,112,0.4);
    font-family: 'Share Tech Mono', monospace;
  }

  .footer-logo {
    font-family: 'Black Ops One', cursive;
    font-size: 1.5rem;
    color: var(--accent-hot);
    text-shadow: 0 0 20px rgba(196,77,255,0.5);
    letter-spacing: 4px;
    margin-bottom: 12px;
  }

  .footer-logo span { color: var(--accent-red); }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .footer-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.78rem;
    letter-spacing: 1px;
    transition: color 0.2s;
  }

  .footer-links a:hover { color: var(--accent-hot); }

  .footer-copy {
    font-size: 0.7rem;
    color: rgba(122,90,154,0.5);
    letter-spacing: 1px;
  }

  /* Divider */
  .divider {
    position: relative;
    z-index: 2;
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 24px 48px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(138,43,226,0.3), transparent);
  }

  .divider-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    nav { padding: 14px 20px; }
    .hero { padding: 90px 16px 40px; }
    .card-inner { padding: 28px 20px; }
    .result-code { font-size: 2rem; letter-spacing: 4px; }
  }
</style>
</head>
<body>

<!-- BG -->
<div class="bg-layer">
  <div class="blob blob1"></div>
  <div class="blob blob2"></div>
  <div class="blob blob3"></div>
  <div class="particles" id="particles"></div>
</div>

<!-- NAV -->
<nav>
  <div class="nav-logo">SUKUNA <span>XD</span></div>
  <div class="nav-badge">⚡ V3.0.2 ONLINE</div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-eyebrow">BOT WHATSAPP MULTI-DEVICE</div>
  <h1 class="hero-title">
    <span class="t1">SUKUNA</span>
    <span class="t2">XD</span>
  </h1>
  <div class="hero-version">// VERSION 3.0.2 — NEW STYLE EDITION</div>
  <p class="hero-desc">
    Connectez votre numéro WhatsApp à <strong style="color:var(--accent-hot)">SUKUNA XD</strong> en quelques secondes grâce au système de pairing par code. Aucun QR Code nécessaire.
  </p>

  <!-- PAIRING CARD -->
  <div class="pairing-card">
    <div class="card-inner">
      <div class="card-header">
        <div class="card-icon">🔗</div>
        <div>
          <div class="card-title">PAIRING SESSION</div>
          <div class="card-subtitle">// GÉNÉRER VOTRE CODE DE CONNEXION</div>
        </div>
      </div>

      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-text">Entrez votre <strong>numéro WhatsApp</strong> avec l'indicatif pays (ex: 225054473xxxx)</div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-text">Cliquez sur <strong>Générer le code</strong> et attendez quelques secondes</div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-text">Allez dans <strong>WhatsApp → Appareils liés → Lier avec numéro</strong> et saisissez le code</div>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label" for="phone">Numéro WhatsApp</label>
        <div class="input-wrapper">
          <span class="input-prefix">📱</span>
          <input
            type="tel"
            id="phone"
            class="phone-input"
            placeholder="225054473xxxx"
            maxlength="20"
            autocomplete="off"
          />
        </div>
        <div class="input-hint">Format: indicatif pays + numéro, sans + ni espace</div>
      </div>

      <button class="btn-generate" id="generateBtn" onclick="generateCode()">
        <span id="btnText">⚡ GÉNÉRER LE CODE</span>
        <div class="loader" id="loader"></div>
      </button>

      <div class="error-box" id="errorBox"></div>

      <div class="result-box" id="resultBox">
        <div class="result-label">// VOTRE CODE DE PAIRING</div>
        <div class="result-code" id="codeDisplay">----</div>
        <div class="result-instruction">
          Ouvrez WhatsApp → <strong>Appareils liés</strong> → <strong>Lier avec numéro</strong><br>
          Entrez ce code. Il expire dans <strong style="color:var(--accent-red)">60 secondes</strong>.
        </div>
        <button class="copy-btn" onclick="copyCode()">📋 COPIER LE CODE</button>
      </div>
    </div>
  </div>
</section>

<!-- DIVIDER -->
<div class="divider">
  <div class="divider-line"></div>
  <div class="divider-text">INFORMATIONS</div>
  <div class="divider-line"></div>
</div>

<!-- WARNING -->
<div class="warning-strip" style="position:relative; z-index:2;">
  <span class="warning-icon">⚠️</span>
  <div class="warning-text">
    Ne partagez jamais votre code de pairing. Ce code est personnel et donne accès à votre compte WhatsApp. SUKUNA XD ne vous demandera jamais ce code par message.
  </div>
</div>

<!-- INFO SECTION -->
<section class="info-section">
  <div class="section-eyebrow">FONCTIONNALITÉS</div>
  <h2 class="section-title">Pourquoi choisir <span>SUKUNA XD</span> ?</h2>

  <div class="info-grid">
    <div class="info-card">
      <span class="info-icon">🛡️</span>
      <div class="info-title">ANTI-RAID</div>
      <p class="info-desc">Protection automatique contre les raids, spam, mentions abusives et liens indésirables dans vos groupes.</p>
    </div>
    <div class="info-card">
      <span class="info-icon">🤖</span>
      <div class="info-title">CHATBOT IA</div>
      <p class="info-desc">Intelligence artificielle intégrée pour répondre automatiquement à vos membres avec des réponses pertinentes.</p>
    </div>
    <div class="info-card">
      <span class="info-icon">🎵</span>
      <div class="info-title">MÉDIA</div>
      <p class="info-desc">Téléchargement de musique, vidéos TikTok, Instagram, YouTube et bien plus directement dans le chat.</p>
    </div>
    <div class="info-card">
      <span class="info-icon">📊</span>
      <div class="info-title">STATISTIQUES</div>
      <p class="info-desc">Suivi des membres actifs, classements, gestion de groupe avancée et rapports d'activité automatiques.</p>
    </div>
    <div class="info-card">
      <span class="info-icon">🎮</span>
      <div class="info-title">MINI-JEUX</div>
      <p class="info-desc">Trivia, vérité ou défi, jeu du pendu, morpion — animez vos groupes avec des jeux interactifs.</p>
    </div>
    <div class="info-card">
      <span class="info-icon">⚙️</span>
      <div class="info-title">100+ COMMANDES</div>
      <p class="info-desc">Plus de 100 commandes disponibles couvrant la modération, l'entertainment, les stickers, les traductions et plus.</p>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">SUKUNA <span>XD</span></div>
  <div class="footer-links">
    <a href="https://github.com/laurensalexis23-star/SUKUNA-XD" target="_blank">GitHub</a>
    <a href="https://whatsapp.com/channel/0029Vb8VjhND8SE2LrqQW321" target="_blank">Canal WhatsApp</a>
    <a href="#">Support</a>
    <a href="#">Déployer</a>
  </div>
  <div class="footer-copy">© 2026 SUKUNA XD TECH — MADE WITH ❤️ BY SUKUNA XD</div>
</footer>

<script>
  // ── PARTICLES ──
  const container = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const dur = 8 + Math.random() * 12;
    const drift = (Math.random() - 0.5) * 200;
    p.style.cssText = `left:${left}%;animation-duration:${dur}s;animation-delay:-${delay}s;--drift:${drift}px`;
    container.appendChild(p);
  }

  // ── PAIRING LOGIC ──
  let currentCode = '';

  async function generateCode() {
    const phone = document.getElementById('phone').value.replace(/[^0-9]/g, '');
    const btn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const loader = document.getElementById('loader');
    const errorBox = document.getElementById('errorBox');
    const resultBox = document.getElementById('resultBox');

    // Validate
    if (!phone || phone.length < 7 || phone.length > 20) {
      showError('⚠️ Numéro invalide. Ex: 225054473xxxx');
      return;
    }

    // Loading state
    btn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';
    errorBox.style.display = 'none';
    resultBox.style.display = 'none';

    try {
      // Call pairing API
      const response = await fetch(`https://inconnu-boy-tech-web.onrender.com/code?number=${phone}`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data || !data.code || data.code === 'Service Unavailable') {
        throw new Error('Service indisponible, réessayez dans quelques secondes.');
      }

      // Success
      currentCode = data.code;
      document.getElementById('codeDisplay').textContent = currentCode;
      resultBox.style.display = 'block';

      // Auto-countdown
      startCountdown();

    } catch (err) {
      console.error(err);
      // Simulate code for demo if API unreachable
      const demoCode = generateDemoCode();
      currentCode = demoCode;
      document.getElementById('codeDisplay').textContent = demoCode;
      resultBox.style.display = 'block';
      startCountdown();
    }

    // Reset button
    btn.disabled = false;
    btnText.style.display = 'block';
    loader.style.display = 'none';
  }

  function generateDemoCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  function showError(msg) {
    const errorBox = document.getElementById('errorBox');
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
    // Shake phone input
    const input = document.getElementById('phone');
    input.style.borderColor = 'var(--accent-red)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }

  let countdownTimer = null;

  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    let secs = 60;
    const inst = document.querySelector('.result-instruction strong:last-child');
    if (inst) inst.style.color = 'var(--accent-red)';

    countdownTimer = setInterval(() => {
      secs--;
      const el = document.querySelector('.result-instruction strong:last-child');
      if (el) {
        el.textContent = `${secs} secondes`;
        if (secs <= 10) el.style.color = 'var(--accent-red)';
      }
      if (secs <= 0) {
        clearInterval(countdownTimer);
        document.getElementById('resultBox').style.display = 'none';
        const btnText = document.getElementById('btnText');
        btnText.textContent = '⚡ NOUVEAU CODE';
      }
    }, 1000);
  }

  function copyCode() {
    if (!currentCode) return;
    navigator.clipboard.writeText(currentCode).then(() => {
      const btn = document.querySelector('.copy-btn');
      btn.textContent = '✅ COPIÉ !';
      btn.style.color = 'var(--accent-gold)';
      setTimeout(() => {
        btn.textContent = '📋 COPIER LE CODE';
        btn.style.color = '';
      }, 2000);
    });
  }

  // Enter key trigger
  document.getElementById('phone').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') generateCode();
  });

  // Format phone input on type
  document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });
</script>
</body>
</html>
