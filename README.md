<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>呪王 SUKUNA — Chaîne WhatsApp</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Shippori+Mincho:wght@400;600&family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
  :root {
    --blood: #8B0000;
    --crimson: #DC143C;
    --ember: #FF4500;
    --gold: #C9A84C;
    --ink: #0A0A0F;
    --ash: #1A1A24;
    --smoke: #2A2A3A;
    --bone: #E8E0D0;
    --glow: rgba(220,20,60,0.4);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    min-height: 100vh;
    background: var(--ink);
    font-family: 'Shippori Mincho', serif;
    overflow-x: hidden;
    cursor: crosshair;
  }

  /* === ANIMATED BACKGROUND === */
  .bg-cursed {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  .bg-cursed::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 30%, rgba(139,0,0,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 80% 70%, rgba(220,20,60,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,69,0,0.1) 0%, transparent 50%);
    animation: pulse-bg 6s ease-in-out infinite alternate;
  }

  @keyframes pulse-bg {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  /* Floating kanji */
  .kanji-float {
    position: fixed;
    font-family: 'Cinzel Decorative', serif;
    color: rgba(220,20,60,0.06);
    font-size: clamp(80px, 15vw, 200px);
    font-weight: 900;
    z-index: 0;
    user-select: none;
    animation: kanji-drift 20s ease-in-out infinite;
  }
  .kanji-float:nth-child(1) { top: -5%; left: -5%; animation-duration: 18s; }
  .kanji-float:nth-child(2) { bottom: -5%; right: -3%; animation-duration: 24s; animation-direction: reverse; }
  .kanji-float:nth-child(3) { top: 40%; left: 70%; font-size: 6vw; animation-duration: 15s; }

  @keyframes kanji-drift {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-30px) rotate(5deg); }
  }

  /* === MAIN WRAPPER === */
  .wrapper {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  /* === CARD === */
  .card {
    width: 100%;
    max-width: 520px;
    background: linear-gradient(145deg, var(--ash) 0%, rgba(26,26,36,0.95) 100%);
    border: 1px solid rgba(220,20,60,0.3);
    border-radius: 4px;
    box-shadow:
      0 0 60px rgba(139,0,0,0.4),
      0 0 120px rgba(139,0,0,0.15),
      inset 0 1px 0 rgba(201,168,76,0.2);
    overflow: hidden;
    animation: card-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes card-in {
    0% { opacity: 0; transform: translateY(40px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* === TOP BANNER === */
  .banner {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
  }

  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: contrast(1.1) saturate(0.9);
    transition: transform 8s ease;
  }

  .card:hover .banner img {
    transform: scale(1.05);
  }

  .banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,10,15,0.1) 0%,
      rgba(10,10,15,0.0) 40%,
      rgba(10,10,15,0.9) 85%,
      var(--ash) 100%
    );
  }

  /* Slash mark decoration */
  .banner-slash {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--crimson), var(--gold), var(--crimson), transparent);
    animation: slash-pulse 3s ease-in-out infinite;
  }
  @keyframes slash-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; box-shadow: 0 0 12px var(--crimson); }
  }

  /* === BODY === */
  .card-body {
    padding: 28px 32px 36px;
  }

  /* === HEADER === */
  .header {
    text-align: center;
    margin-bottom: 24px;
    animation: fade-up 0.8s 0.3s both;
  }

  .eyebrow {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 6px;
    font-size: 11px;
    color: var(--gold);
    opacity: 0.8;
    margin-bottom: 8px;
  }

  .title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(22px, 5vw, 30px);
    font-weight: 900;
    color: var(--bone);
    text-shadow: 0 0 30px rgba(220,20,60,0.5);
    line-height: 1.1;
    margin-bottom: 4px;
  }

  .title span {
    color: var(--crimson);
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 3px;
    color: rgba(232,224,208,0.4);
    font-style: italic;
  }

  /* === DIVIDER === */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    animation: fade-up 0.8s 0.5s both;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3));
  }
  .divider::after { background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent); }
  .divider-icon {
    color: var(--gold);
    font-size: 14px;
    opacity: 0.7;
  }

  /* === DESCRIPTION === */
  .desc {
    text-align: center;
    color: rgba(232,224,208,0.7);
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 28px;
    animation: fade-up 0.8s 0.6s both;
  }

  .desc em {
    color: var(--crimson);
    font-style: italic;
  }

  /* === STATS === */
  .stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 28px;
    animation: fade-up 0.8s 0.7s both;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: var(--crimson);
    line-height: 1;
    text-shadow: 0 0 20px rgba(220,20,60,0.6);
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(201,168,76,0.6);
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* === CTA BUTTON === */
  .cta-wrap {
    animation: fade-up 0.8s 0.9s both;
  }

  .btn-join {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #075E54 0%, #128C7E 50%, #075E54 100%);
    background-size: 200% 100%;
    border: none;
    border-radius: 3px;
    color: #fff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 4px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 24px rgba(7,94,84,0.4), 0 0 0 1px rgba(18,140,126,0.3);
  }

  .btn-join::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .btn-join:hover {
    background-position: 100% 0;
    box-shadow: 0 8px 40px rgba(18,140,126,0.6), 0 0 0 1px rgba(18,140,126,0.5);
    transform: translateY(-2px);
  }

  .btn-join:hover::before { opacity: 1; }
  .btn-join:active { transform: translateY(0); }

  .btn-join svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  /* Pulse ring on button */
  .btn-pulse-ring {
    position: absolute;
    inset: -3px;
    border: 1px solid rgba(18,140,126,0.5);
    border-radius: 5px;
    animation: ring-pulse 2s ease-out infinite;
    pointer-events: none;
  }

  @keyframes ring-pulse {
    0% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.04); }
  }

  /* === QUOTE === */
  .quote {
    text-align: center;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(220,20,60,0.12);
    animation: fade-up 0.8s 1.1s both;
  }

  .quote p {
    font-size: 12px;
    font-style: italic;
    color: rgba(232,224,208,0.35);
    letter-spacing: 0.5px;
    line-height: 1.7;
  }

  .quote-author {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(201,168,76,0.3);
    margin-top: 6px;
  }

  /* === BOTTOM MARK === */
  .bottom-mark {
    margin-top: 20px;
    text-align: center;
    animation: fade-up 0.8s 1.3s both;
  }
  .bottom-mark span {
    font-size: 10px;
    letter-spacing: 4px;
    color: rgba(232,224,208,0.15);
    text-transform: uppercase;
  }

  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Scanline overlay */
  .scanlines {
    position: fixed;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.04) 2px,
      rgba(0,0,0,0.04) 4px
    );
  }

  /* Corner decorations */
  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: 5;
  }
  .corner--tl { top: 10px; left: 10px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); opacity: 0.4; }
  .corner--tr { top: 10px; right: 10px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); opacity: 0.4; }
  .corner--bl { bottom: 10px; left: 10px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); opacity: 0.4; }
  .corner--br { bottom: 10px; right: 10px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); opacity: 0.4; }
</style>
</head>
<body>

<!-- Background -->
<div class="bg-cursed">
  <div class="kanji-float">呪</div>
  <div class="kanji-float">王</div>
  <div class="kanji-float">刹</div>
</div>
<div class="scanlines"></div>

<div class="wrapper">
  <div class="card">
    <!-- Corner marks -->
    <div class="corner corner--tl"></div>
    <div class="corner corner--tr"></div>
    <div class="corner corner--bl"></div>
    <div class="corner corner--br"></div>

    <!-- Banner Image -->
    <div class="banner">
      <img src="https://i.ibb.co/NdkX8rmb/7d73c04f889a.jpg" alt="Sukuna — Roi des Malédictions" />
      <div class="banner-overlay"></div>
      <div class="banner-slash"></div>
    </div>

    <!-- Body -->
    <div class="card-body">
      <div class="header">
        <div class="eyebrow">✦ Chaîne Officielle ✦</div>
        <h1 class="title">SUKUNA <span>BOT</span></h1>
        <div class="subtitle">両面宿儺 · Roi des Malédictions</div>
      </div>

      <div class="divider"><span class="divider-icon">⚔</span></div>

      <p class="desc">
        Rejoins la chaîne WhatsApp du <em>Roi des Malédictions</em>.<br>
        Mises à jour, annonces, et contenu exclusif —<br>
        si tu en es <em>digne</em>.
      </p>

      <div class="stats">
        <div class="stat">
          <div class="stat-value">∞</div>
          <div class="stat-label">Puissance</div>
        </div>
        <div class="stat">
          <div class="stat-value">20</div>
          <div class="stat-label">Doigts</div>
        </div>
        <div class="stat">
          <div class="stat-value">👑</div>
          <div class="stat-label">Roi</div>
        </div>
      </div>

      <div class="cta-wrap">
        <a class="btn-join" href="https://whatsapp.com/channel/0029Vb8VjhND8SE2LrqQW321" target="_blank" rel="noopener">
          <div class="btn-pulse-ring"></div>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          REJOINDRE LA CHAÎNE
        </a>
      </div>

      <div class="quote">
        <p>« Pleure. Implore. Amuse-moi. »</p>
        <div class="quote-author">— Ryomen Sukuna</div>
      </div>
    </div>
  </div>

  <div class="bottom-mark">
    <span>呪術廻戦 · Jujutsu Kaisen Fan Project</span>
  </div>
</div>

</body>
</html>

# 呪王 SUKUNA BOT — 咒術廻戦

<div align="center">

```
╔═══════════════════════════════════════════╗
║   "Je suis le seul vrai roi de la malédiction."   ║
╚═══════════════════════════════════════════╝
```

![Version](https://img.shields.io/badge/version-1.0.0-crimson?style=for-the-badge)
![Discord](https://img.shields.io/badge/Discord-Bot-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Status](https://img.shields.io/badge/status-DOMINATING-red?style=for-the-badge)

</div>

---

## 👁️ Présentation

**Sukuna Bot** est un bot Discord inspiré du **Roi des Malédictions** de *Jujutsu Kaisen*. Arrogant, puissant, et impitoyable — exactement comme l'original. Il répond à tes commandes... si tu en es digne.

> *"Pleure. Implore. Amuse-moi."* — Ryomen Sukuna

---

## ⚡ Fonctionnalités

| Commande | Description |
|----------|-------------|
| `!sukuna` | Sukuna te répond avec arrogance |
| `!malédiction @user` | Lance une malédiction sur quelqu'un |
| `!domaine` | Active l'Extension de Domaine |
| `!dix ombres` | Invoque les techniques des Dix Ombres |
| `!roi` | Rappelle qui est le vrai roi |
| `!slash` | Slash — la technique ultime |
| `!stats` | Affiche les stats du serveur |

---

## 🔧 Installation

### Prérequis
- Node.js `v18+`
- Un token Discord Bot
- npm ou yarn

### Étapes

```bash
# Clone le repo
git clone https:https://github.com/laurensalexis23-star/SUKUNA-XD

# Entre dans le dossier
cd sukuna-bot

# Installe les dépendances
npm install

# Configure le .env
cp .env.example .env
```

### Configuration `.env`

```env
DISCORD_TOKEN=ton_token_ici
CLIENT_ID=ton_client_id
GUILD_ID=ton_guild_id
PREFIX=!
```

### Lancement

```bash
# Démarre le bot
npm start

# Ou en mode développement
npm run dev
```

---

## 🏗️ Structure du projet

```
sukuna-bot/
├── 📁 src/
│   ├── 📁 commands/
│   │   ├── sukuna.js
│   │   ├── malediction.js
│   │   ├── domaine.js
│   │   └── slash.js
│   ├── 📁 events/
│   │   ├── ready.js
│   │   └── messageCreate.js
│   ├── 📁 utils/
│   │   └── sukuna-quotes.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

---

## 🩸 Répliques de Sukuna

Le bot dispose d'une banque de répliques authentiques tirées du manga et de l'anime :

```js
const quotes = [
  "Je suis le seul vrai roi de la malédiction.",
  "Tu penses vraiment pouvoir me battre ? Pathétique.",
  "Slash.",
  "Pleure. Implore. Amuse-moi.",
  "Aucun humain ne peut me vaincre. Aucun.",
];
```

---

## 🤝 Contribuer

Les faibles n'ont pas leur place ici. Mais si tu penses être à la hauteur :

1. Fork le projet
2. Crée une branche : `git checkout -b feature/nouvelle-technique`
3. Commit tes changements : `git commit -m "feat: ajout technique maudite"`
4. Push : `git push origin feature/nouvelle-technique`
5. Ouvre une Pull Request

---

## ⚠️ Avertissement

Ce bot est un **projet fan-made** non officiel, créé par amour pour *Jujutsu Kaisen*. Tous les personnages, noms et éléments appartiennent à **Gege Akutami** et **MAPPA**.

---

## 📜 Licence

MIT License — Fais ce que tu veux, mais n'oublie jamais qui est le vrai roi.

---

<div align="center">

**Créé avec 🩸 et une arrogance absolue**

*Ryomen Sukuna — 両面宿儺*

</div>

