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

    const helpMessage = `‎*╔════════════════════════════╗*
‎*║ ⚡ 𝗦𝗨𝗞𝗨𝗡𝗔 𝗫𝗗 𝗕𝗢𝗧 ⚡*
‎*╠════════════════════════════╣*
‎*║ 👤 𝗨𝗦𝗘𝗥 :* ${userName}
‎*║ ${mode === 'PRIVATE' ? '🔒' : '🌐'} 𝗠𝗢𝗗𝗘 :* ${mode}
‎*║ ⚜️ 𝗣𝗥𝗘𝗙𝗜𝗫 :* [ ${prefix} ]
‎*║ 🧩 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 :* ${settings.version || '3.0.7'}
‎*║ 💾 𝗥𝗔𝗠 :* ${ram}
‎*║ ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘 :* ${uptime}
‎*╚════════════════════════════╝*

*╭───「 🗃️ 𝗠𝗘𝗡𝗨 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 」───*
*│* ▹ ${prefix}help
*│* ▹ ${prefix}menu
*│* ▹ ${prefix}ping
*│* ▹ ${prefix}alive
*│* ▹ ${prefix}tts
*│* ▹ ${prefix}owner
*│* ▹ ${prefix}joke
*│* ▹ ${prefix}quote
*│* ▹ ${prefix}fact
*│* ▹ ${prefix}meteo
*│* ▹ ${prefix}nouvelle
*│* ▹ ${prefix}attp
*│* ▹ ${prefix}lyrics
*│* ▹ ${prefix}8ball
*│* ▹ ${prefix}groupinfo
*│* ▹ ${prefix}staff
*│* ▹ ${prefix}admins
*│* ▹ ${prefix}vv
*│* ▹ ${prefix}trt
*│* ▹ ${prefix}ss
*│* ▹ ${prefix}jid
*│* ▹ ${prefix}url
*╰──────────────────────────*

*╭───「 🪪 𝗔𝗗𝗠𝗜𝗡 」───*
*│* ▹ ${prefix}ban
*│* ▹ ${prefix}promote
*│* ▹ ${prefix}demote
*│* ▹ ${prefix}close
*│* ▹ ${prefix}open
*│* ▹ ${prefix}delete
*│* ▹ ${prefix}del
*│* ▹ ${prefix}kick 
*│* ▹ ${prefix}kickall
*│* ▹ ${prefix}warnings 
*│* ▹ ${prefix}warn 
*│* ▹ ${prefix}antilink
*│* ▹ ${prefix}antibadword
*│* ▹ ${prefix}clear
*│* ▹ ${prefix}tag 
*│* ▹ ${prefix}tagall
*│* ▹ ${prefix}tagnotadmin
*│* ▹ ${prefix}hidetag
*│* ▹ ${prefix}chatbot
*│* ▹ ${prefix}resetlink
*│* ▹ ${prefix}antitag
*│* ▹ ${prefix}welcome
*│* ▹ ${prefix}goodbyof
*│* ▹ ${prefix}setgdesc
*│* ▹ ${prefix}setgname
*│* ▹ ${prefix}setgpp
*╰──────────────────────────*

*╭───「 🔐 𝗢𝗪𝗡𝗘𝗥 」───*
*│* ▹ ${prefix}mode
*│* ▹ ${prefix}clearsession
*│* ▹ ${prefix}antidelete
*│* ▹ ${prefix}cleartmp
*│* ▹ ${prefix}update
*│* ▹ ${prefix}settings
*│* ▹ ${prefix}setpp
*│* ▹ ${prefix}autoreact
*│* ▹ ${prefix}autostatus
*│* ▹ ${prefix}autostatus react
*│* ▹ ${prefix}autotyping
*│* ▹ ${prefix}autoread
*│* ▹ ${prefix}anticall
*│* ▹ ${prefix}pmblocker
*│* ▹ ${prefix}pmblocker setmsg
*│* ▹ ${prefix}setmention
*│* ▹ ${prefix}mention
*╰──────────────────────────*

*╭───「 🖼️ 𝗜𝗠𝗔𝗚𝗘𝗦 & 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 」───*
*│* ▹ ${prefix}blur
*│* ▹ ${prefix}simage
*│* ▹ ${prefix}sticker
*│* ▹ ${prefix}removebg
*│* ▹ ${prefix}remini
*│* ▹ ${prefix}crop
*│* ▹ ${prefix}tgstickera
*│* ▹ ${prefix}meme
*│* ▹ ${prefix}take
*│* ▹ ${prefix}emojimix
*│* ▹ ${prefix}igs
*│* ▹ ${prefix}igsc
*╰──────────────────────────*

*╭───「 👀 𝗣𝗜𝗘𝗦 」───*
*│* ▹ ${prefix}pies
*│* ▹ ${prefix}china
*│* ▹ ${prefix}indonesia
*│* ▹ ${prefix}japan
*│* ▹ ${prefix}korea
*│* ▹ ${prefix}hijab
*╰──────────────────────────*

*╭───「 🎮 𝗝𝗘𝗨𝗫 」───*
*│* ▹ ${prefix}tictactoe
*│* ▹ ${prefix}hangman
*│* ▹ ${prefix}guess
*│* ▹ ${prefix}trivia
*│* ▹ ${prefix}answer
*│* ▹ ${prefix}truth
*│* ▹ ${prefix}dare
*╰──────────────────────────*

*╭───「 🤖 𝗜𝗔 」───*
*│* ▹ ${prefix}gpt
*│* ▹ ${prefix}gemini
*│* ▹ ${prefix}imagine
*│* ▹ ${prefix}flux
*│* ▹ ${prefix}sora
*╰──────────────────────────*

*╭───「 💯 𝗙𝗨𝗡 」───*
*│* ▹ ${prefix}compliment
*│* ▹ ${prefix}insult
*│* ▹ ${prefix}flirt
*│* ▹ ${prefix}shayari
*│* ▹ ${prefix}goodnight
*│* ▹ ${prefix}roseday
*│* ▹ ${prefix}character
*│* ▹ ${prefix}wasted
*│* ▹ ${prefix}ship
*│* ▹ ${prefix}simp
*│* ▹ ${prefix}stupid
*╰──────────────────────────*

*╭───「 🔤 𝗧𝗘𝗫𝗧𝗠𝗔𝗞𝗘𝗥 」───*
*│* ▹ ${prefix}metallic
*│* ▹ ${prefix}ice
*│* ▹ ${prefix}snow
*│* ▹ ${prefix}impressive
*│* ▹ ${prefix}matrix
*│* ▹ ${prefix}light
*│* ▹ ${prefix}neon
*│* ▹ ${prefix}devil
*│* ▹ ${prefix}purple
*│* ▹ ${prefix}thunder
*│* ▹ ${prefix}leaves
*│* ▹ ${prefix}1917
*│* ▹ ${prefix}arena
*│* ▹ ${prefix}hacker
*│* ▹ ${prefix}sand
*│* ▹ ${prefix}blackpink
*│* ▹ ${prefix}glitch
*│* ▹ ${prefix}fire
*╰──────────────────────────*

*╭───「 📥 𝗧𝗘𝗟𝗘𝗖𝗛𝗔𝗥𝗚𝗘𝗠𝗘𝗡𝗧𝗦 」───*
*│* ▹ ${prefix}play
*│* ▹ ${prefix}song
*│* ▹ ${prefix}spotify
*│* ▹ ${prefix}instagram
*│* ▹ ${prefix}facebook
*│* ▹ ${prefix}tiktok
*│* ▹ ${prefix}apk
*│* ▹ ${prefix}pinterest
*│* ▹ ${prefix}video
*│* ▹ ${prefix}ytmp4
*╰──────────────────────────*

*╭───「 🧩 𝗗𝗜𝗩𝗘𝗥𝗦 」───*
*│* ▹ ${prefix}heart
*│* ▹ ${prefix}horny
*│* ▹ ${prefix}circle
*│* ▹ ${prefix}lgbt
*│* ▹ ${prefix}lolice
*│* ▹ ${prefix}its-so-stupid
*│* ▹ ${prefix}namecard
*│* ▹ ${prefix}oogway
*│* ▹ ${prefix}tweet
*│* ▹ ${prefix}ytcomment
*│* ▹ ${prefix}comrade
*│* ▹ ${prefix}gay
*│* ▹ ${prefix}glass
*│* ▹ ${prefix}jail
*│* ▹ ${prefix}passed
*│* ▹ ${prefix}triggered
*╰──────────────────────────*

*╭───「 📺 𝗔𝗡𝗜𝗠𝗘 」───*
*│* ▹ ${prefix}nom
*│* ▹ ${prefix}poke
*│* ▹ ${prefix}cry
*│* ▹ ${prefix}kiss
*│* ▹ ${prefix}pat
*│* ▹ ${prefix}hug
*│* ▹ ${prefix}wink
*│* ▹ ${prefix}facepalm
*╰──────────────────────────*

*╭───「 💻 𝗚𝗜𝗧𝗛𝗨𝗕 」───*
*│* ▹ ${prefix}git
*│* ▹ ${prefix}github
*│* ▹ ${prefix}sc
*│* ▹ ${prefix}script
*│* ▹ ${prefix}repo
*╰──────────────────────────*

> ⚡ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗦𝗨𝗞𝗨𝗡𝗔 𝗗𝗧𝗛 ⚡`;

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
