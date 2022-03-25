module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        console.log(client)
        message.reply(`Pong! Latency is \`${message.createdTimestamp - Date.now()}ms\``)
    }
}