
const {client, interaction} = require("discord.js");
const run = async (client, interaction) => {

    
interaction.reply(`Pong! Latency is \`${interaction.createdTimestamp - Date.now()}ms\`, Websocket Latency is \`${client.ws.ping}ms\``)}

module.exports = {
    name: "ping", 
    description: "Check my response time",
    type: "CHAT_INPUT",
    run
    }


