const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let reason = interaction.options.getString("reason") || "No reason given"

    if (!member) return interaction.reply("Invalid member")

    if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply({ content : "I am unable to ban this member", ephemeral: true});

    if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply('Unable to ban this user as they are equal-to or higher in rank as you. (Role order)')

    try {
        await member.user.send(`You have been banned from ${interaction.guild.name} for ${reason}`)
        await member.ban(reason)
        return interaction.reply(` \`${member.user.tag}\` has been BANNED from **${interaction.guild.name}** with a REASON of **${reason}**`)
        
    }

    catch(err){
        if (err){
            console.error(err)
        }
    }
}

module.exports = {
    name: "ban",
    description: "Ban a member",
    perm: "BAN_MEMBERS",
    options: [
        {
            name: "user", description: "The user to ban",
            type: "USER", required: true
        },

        {
            name: "reason",
            description: "Reason for making use of the BAN HAMMER",
            type: "STRING",
            required: true
        }
    ],
    run
}