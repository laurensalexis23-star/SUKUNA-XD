async function bug(message, client, texts, num) {

    try {
        
            const remoteJid = message.key?.remoteJid;

            await client.sendMessage(remoteJid, {

                image: { url: `database/${num}.jpg` },

                caption: `> ${texts}`,

                contextInfo: {

                    externalAdReply: {

                        title: "Join Our WhatsApp Group",

                        body: " 𝕊𝕌𝕂𝕌ℕ𝔸 𝕏𝔻 ",

                        mediaType: 1, // Image preview

                        thumbnailUrl: `https://chat.whatsapp.com/BxfwEM0Xq0hKOUwMAmfuG8?mode=gi_t`,

                        renderLargerThumbnail: false,

                        mediaUrl: `${num}.jpg`,

                        sourceUrl: `${num}.jpg`
                    }
                }
            });

    } catch (e) {
     console.log(e)

    }
}




            /*const remoteJid = message.key.remoteJid;

            await client.sendMessage(remoteJid, {

                image: { url: `${num}.jpg` },

                caption: `> ${texts}`,

                contextInfo: {

                    externalAdReply: {

                        title: "Join Our WhatsApp Group",

                        body: " 𝕊𝕌𝕂𝕌ℕ𝔸 𝕏𝔻 | Ո9౮Բ_ς ",

                        mediaType: 1, // Image preview

                        thumbnailUrl: `https://chat.whatsapp.com/BxfwEM0Xq0hKOUwMAmfuG8?mode=gi_t`,

                        renderLargerThumbnail: false,

                        mediaUrl: `${num}.jpg`,

                        sourceUrl: `${num}.jpg`
                    }
                }
            });
        }
        */
        export default bug;
