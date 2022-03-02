const discord = require("discord.js")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot

        if (!message.guild) return

        if (message.author.bot) return

        if (!message.content.startsWith(prefix))
            return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        const command = client.commands.get(cmdstr)

        if (!command) return

        let member = message.member

        if (command.devOnly && !owners.includes(member.id)) {
            return message.reply("This command is only available to bot owners.")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0){
            return message.reply("You do not have permissions to run this command.")
        }

        try {
            await command.run({...bot, message, args})
        }
        catch (err) {
            let errMsg = err.toString()

            if (errMsg.startsWith("?")) {
                errMsg.slice(1)
                await message.reply(errMsg)
            }

            else 
                console.log(err)
        }
 
    }
        
    
}

