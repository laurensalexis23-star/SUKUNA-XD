const settings = {
  packname: '𝗦𝗨𝗞𝗨𝗡𝗔 𝗫𝗗',
  author: '? ???',
  botName: "𝗦𝗨𝗞𝗨𝗡𝗔 𝗫𝗗",
  botOwner: 'SUKUNA', // ton nom
  ownerNumber: '50941144151', //Saisissez votre num茅ro ici, sans le symbole +. Indiquez simplement l'indicatif du pays et le num茅ro, sans espace.
  giphyApiKey: 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  commandMode: "private",
  maxStoreMessages: 20, 
  storeWriteInterval: 10000,
  description: "Bot WhatsApp Multi-Device pour la gestion de groupes et l鈥檃utomatisation.",
  version: "3.0.2",
  updateZipUrl: "https://github.com/laurensalexis23-star/𝗦𝗨𝗞𝗨𝗡𝗔 𝗫𝗗/archive/refs/heads/main.zip",
};

module.exports = settings;


// ajout茅 vautre prefix setting
module.exports.prefix = process.env.PREFIX || '.';

// Anti-mention de masse (suppression auto)
module.exports.antiMention = { enabled: false, threshold: 5, adminBypass: true };
//💻 𝗦𝗠𝗗