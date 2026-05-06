# 🩸 SUKUNA XD — Site Officiel

Site vitrine de la communauté SUKUNA XD, déployé sur Render.

## 📁 Structure

```
sukuna-xd-deploy/
├── server.js        ← Serveur Express
├── package.json     ← Dépendances
├── README.md        ← Ce fichier
└── public/
    └── index.html   ← Ton site
```

## 🚀 Déployer sur Render

### Étape 1 — GitHub
1. Crée un repo GitHub (ex: `sukuna-xd-site`)
2. Upload tous ces fichiers dedans
3. Assure-toi que `public/index.html` est bien présent

### Étape 2 — Render
1. Va sur [render.com](https://render.com) et connecte-toi
2. Clique **New → Web Service**
3. Connecte ton repo GitHub
4. Configure comme suit :
   - **Name** : `sukuna-xd`
   - **Runtime** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Clique **Create Web Service**
6. Ton site sera en ligne sur `https://sukuna-xd.onrender.com` ⚡

## 🩸 SUKUNA XD — Plus qu'un groupe, une évolution
