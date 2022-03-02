const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let reason = interaction.options.getString("reason") || "No reason given"

    if (!member) return interaction.reply("Invalid member")

    if(!member.kickable || member.user.id === client.user.id) 
        return interaction.reply({ content : "I am unable to kick this member", ephemeral: true });

    if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply({ content : 'Unable to kick this user as they are equal-to or higher in rank as you. (Role order)', ephemeral : true })

    try {
        try {
            await member.user.send(`You have been kicked from \`${interaction.guild.name}\` for **${reason}**`)
            await interaction.guild.members.kick(member, reason)
            return interaction.reply(` \`${member.user.tag}\` has been KICKED from **${interaction.guild.name}** with a REASON of **${reason}**`)

        }
        catch {
        
        await interaction.guild.members.kick(member, reason)
        return interaction.reply(` \`${member.user.tag}\` has been KICKED from **${interaction.guild.name}** with a REASON of **${reason}**`)
        }
    }

    catch(err){
        if (err){
            console.error(err)
            interaction.reply({ content : "An error occurred.", ephemeral:true })
        }
    }
}

module.exports = {
    name: "kick",
    description: "Kick a member",
    perms: "KICK_MEMBERS",
    options: [
        {
            name: "user", description: "The user to kick",
            type: "USER", required: true
        },

        {
            name: "reason",
            description: "Reason for having to resort to using the 👞 (Optional)",
            type: "STRING",
            required: false
        }
    ],
    run
}