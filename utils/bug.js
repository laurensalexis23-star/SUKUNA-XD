async function bug(message, client, texts, num) {
    try {
        const remoteJid = message.key?.remoteJid;
        await client.sendMessage(remoteJid, {
            image: { url: `database/${num}.jpg` },
            caption: `> ${texts}`,
            contextInfo: {
                externalAdReply: {
                    title: "Join Our WhatsApp Group",
                    body: "𝙎𝙐𝙆𝙐𝙉𝘼 𝙈𝘿 ",
                    mediaType: 1,
                    thumbnailUrl: `https://chat.whatsapp.com/BxfwEM0Xq0hKOUwMAmfuG8?mode=gi_t`,
                    renderLargerThumbnail: false,
                    mediaUrl: `${num}.jpg`,
                    sourceUrl: `${num}.jpg`
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export default bug;
