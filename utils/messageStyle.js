import fs from "fs"
import stylizedChar from "./fancy.js"

export default function stylizedCardMessage(text) {
  return {
    text: stylizedChar(text),
    contextInfo: {
      externalAdReply: {
        title: "𝙎𝙐𝙆𝙐𝙉𝘼 𝙈𝘿 ",
        body: "𝙎𝙐𝙆𝙐𝙉𝘼 𝙈𝘿",
        thumbnail: fs.readFileSync("./database/DigiX.jpg"),
        sourceUrl: "https://whatsapp.com",
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }
}
