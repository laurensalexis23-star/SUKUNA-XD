const fs = require('fs');
const path = require('path');
const settings = require('../settings');
const { channelInfo } = require('../lib/messageConfig');

async function helpCommand(sock, chatId, message, channelLink) {
    // Dynamic USER
    const userName =
        message?.pushName ||
        message?.key?.participant?.split('@')?.[0] ||
        message?.key?.remoteJid?.split('@')?.[0] ||
        'User';

    // Dynamic MODE (PUBLIC / PRIVATE)
    const rawMode = (settings?.mode ?? settings?.MODE ?? '').toString().trim().toLowerCase();
    const mode = rawMode === 'private' ? 'PRIVATE' : 'PUBLIC';

    // Dynamic PREFIX
    const prefix = (settings?.prefix ?? settings?.PREFIX ?? settings?.handler ?? settings?.HANDLER ?? '.').toString();

    // RAM + Uptime
    const formatBytes = (bytes) => {
        if (!Number.isFinite(bytes) || bytes < 0) return '0 MB';
        const mb = bytes / (1024 * 1024);
        if (mb < 1024) return `${mb.toFixed(1)} MB`;
        return `${(mb / 1024).toFixed(2)} GB`;
    };

    const formatUptime = (seconds) => {
        seconds = Math.max(0, Math.floor(Number(seconds) || 0));
        const d = Math.floor(seconds / 86400);
        seconds %= 86400;
        const h = Math.floor(seconds / 3600);
        seconds %= 3600;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const parts = [];
        if (d) parts.push(`${d}d`);
        if (h) parts.push(`${h}h`);
        if (m) parts.push(`${m}m`);
        parts.push(`${s}s`);
        return parts.join(' ');
    };

    const ram = formatBytes(process.memoryUsage()?.rss || 0);
    const uptime = formatUptime(process.uptime());

    const helpMessage = `‎╭━━━〔 ⚡ SUKUNA XD CORE ⚡ 〕━━━╮
┃ 👤 USER    : ${userName}
┃ 🌐 MODE    : ${mode}
┃ ⚙️ PREFIX  : [ ${prefix} ]
┃ 🧬 VERSION : ${settings.version || '3.0.7'}
┃ 💾 RAM     : ${ram}
┃ ⏱️ UPTIME  : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 🗃️ GENERAL 〕─╮
│ ⟡ ${prefix}help      ⟡ ${prefix}menu
│ ⟡ ${prefix}ping      ⟡ ${prefix}alive
│ ⟡ ${prefix}tts       ⟡ ${prefix}owner
│ ⟡ ${prefix}joke      ⟡ ${prefix}quote
│ ⟡ ${prefix}fact      ⟡ ${prefix}meteo
│ ⟡ ${prefix}lyrics    ⟡ ${prefix}8ball
╰────────────────────╯

╭─〔 🪪 ADMIN CONTROL 〕─╮
│ ⟡ ${prefix}ban        ⟡ ${prefix}kick
│ ⟡ ${prefix}kickall    ⟡ ${prefix}warn
│ ⟡ ${prefix}clear      ⟡ ${prefix}delete
│ ⟡ ${prefix}promote    ⟡ ${prefix}demote
│ ⟡ ${prefix}tagall     ⟡ ${prefix}hidetag
│ ⟡ ${prefix}antilink   ⟡ ${prefix}welcome
╰──────────────────────╯

╭─〔 🔐 OWNER PANEL 〕─╮
│ ⟡ ${prefix}mode        ⟡ ${prefix}update
│ ⟡ ${prefix}settings    ⟡ ${prefix}cleartmp
│ ⟡ ${prefix}autoreact   ⟡ ${prefix}autotyping
│ ⟡ ${prefix}anticall    ⟡ ${prefix}pmblocker
╰──────────────────────╯

╭─〔 🤖 AI SYSTEM 〕─╮
│ ⟡ ${prefix}gpt      ⟡ ${prefix}gemini
│ ⟡ ${prefix}imagine  ⟡ ${prefix}flux
│ ⟡ ${prefix}sora
╰───────────────────╯

╭─〔 🎮 FUN & GAMES 〕─╮
│ ⟡ ${prefix}tictactoe ⟡ ${prefix}hangman
│ ⟡ ${prefix}trivia    ⟡ ${prefix}truth
│ ⟡ ${prefix}dare      ⟡ ${prefix}guess
╰────────────────────╯

╭─〔 🎨 MEDIA 〕─╮
│ ⟡ ${prefix}sticker   ⟡ ${prefix}meme
│ ⟡ ${prefix}removebg  ⟡ ${prefix}remini
│ ⟡ ${prefix}blur      ⟡ ${prefix}crop
╰───────────────────╯

╭─〔 ⬇️ DOWNLOAD 〕─╮
│ ⟡ ${prefix}play     ⟡ ${prefix}song
│ ⟡ ${prefix}tiktok   ⟡ ${prefix}instagram
│ ⟡ ${prefix}video    ⟡ ${prefix}ytmp4
╰───────────────────╯

╭─〔 🔤 TEXT FX 〕─╮
│ ⟡ ${prefix}neon     ⟡ ${prefix}glitch
│ ⟡ ${prefix}fire     ⟡ ${prefix}matrix
│ ⟡ ${prefix}devil    ⟡ ${prefix}ice
╰───────────────────╯

╭─〔 📺 ANIME 〕─╮
│ ⟡ ${prefix}hug   ⟡ ${prefix}kiss
│ ⟡ ${prefix}pat   ⟡ ${prefix}cry
│ ⟡ ${prefix}wink  ⟡ ${prefix}poke
╰────────────────╯

╰━〔 ⚡ POWERED BY SUKUNA DTH ⚡ 〕━╯'
  
  try {
        const imgPath = path.join(__dirname, '..', 'assets', 'bot_image.jpg');
        const audioPath = path.join(__dirname, '..', 'assets', 'Rimkus.mp3');
        const img = fs.existsSync(imgPath) ? fs.readFileSync(imgPath) : null;

        // 1. Envoyer l'image + texte du menu
        if (img) {
            await sock.sendMessage(
                chatId,
                { image: img, caption: helpMessage, ...channelInfo },
                { quoted: message }
            );
        } else {
            await sock.sendMessage(
                chatId,
                { text: helpMessage, ...channelInfo },
                { quoted: message }
            );
        }

        // 2. Envoyer le MP3 style cercle orange sans titre
        if (fs.existsSync(audioPath)) {
            const audio = fs.readFileSync(audioPath);
            await sock.sendMessage(
                chatId,
                {
                    audio: audio,
                    mimetype: 'audio/mp4',  // audio/mp4 = cercle orange sans nom affiché
                    ptt: false
                },
                { quoted: message }
            );
        }

    } catch (e) {
        await sock.sendMessage(
            chatId,
            { text: helpMessage, ...channelInfo },
            { quoted: message }
        );
    }
}

module.exports = helpCommand;
