/* Imports */
let Discord=require('discord.js');
let Commands=require('./Commands');
require('dotenv').config();

/* Variables */
let self=new Discord.Client({intents:new Discord.Intents().add(Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_BANS,Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS,Discord.Intents.FLAGS.GUILD_INVITES,Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_PRESENCES,Discord.Intents.FLAGS.GUILD_MESSAGES),presence:{status:"online",activities:[{"name":"/help","type":"PLAYING"}]},ws:{properties:{$browser:"Discord iOS"}}});

/* Bot readt */
self.once('ready',()=>{
console.log('Bot ready');
});

/* Handle interactions */
self.on('interactionCreate',async(Interaction)=>{
/* Handle */
let Result=(Interaction.isCommand()?await Commands.SlashCommand(Interaction):(Interaction.isContextMenu()?await Commands.CMenuCommand(Interaction):{"error":""}));

/* Handle errors */
try{if(Result['error'])Interaction.reply({content:Result['error']==='DM'?'Sorry, You can\'t use commands in DM\'s.':'Sorry, something went wrong.',ephemeral:true}).catch(e=>{});}catch{};

/* Log error */
// TODO
});

/* Login */
self.login(process.env.TOKEN);