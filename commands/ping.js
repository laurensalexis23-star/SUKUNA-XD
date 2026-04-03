import stylizedChar from "../utils/fancy.js"

export async function pingTest(client, message) {
    const remoteJid = message.key.remoteJid
    const start = Date.now()

    await client.sendMessage(remoteJid, { text: "📡 Pinging..." }, { quoted: message })

    const latency = Date.now() - start

    await client.sendMessage(remoteJid, {
        text: stylizedChar(
            `🫟 SUKUNA MD
Network\n\n` +
            `Latency: ${latency} ms\n\n` +
            `𝕻𝖔𝖜𝖊𝖗 𝖇𝖞 𝖘𝖚𝖐𝖚𝖓𝖆`
        )
    }, { quoted: message })
}
