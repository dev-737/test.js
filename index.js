const Discord = require("discord.js")
const canvacord = require("canvacord");
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES"
        
    ]
//s
})

let bot = {
    client, 
    prefix: '.',
    owners: ['736482645931720765', '736482645931720765']
}


client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()



client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
module.exports = bot


// let person = client.members.cache.get('User ID');
// console.log(person);






// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

const welcomeChannelId = "933581576380489749"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to **${member.guild.name}**, hope you enjoy your stay here!`,
        files: [img]
    })
})



// let a=['a', 'b', 'c']
// a.every(function(element, index) {
//     console.log(element)
//     if () return false
//     else return true
//   })






client.login(process.env.TOKEN)