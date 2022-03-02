module.exports = {
    name: "ping", 
    category: "info", 
    permissions: [], 
    devOnly: true, 
    run: async ({bot, message, args}) => {
        message.reply(`Pong! Latency is \`${message.createdTimestamp - Date.now()}ms\``)
    }


}