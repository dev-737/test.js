const welcomeChannelId = "933581576380489749"

module.exports = {
    name : "guildMemberAdd",
    run : async (member) => {
        const img = await generateImage(member)
        member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to **${member.guild.name}**, hope you enjoy your stay here!`,
        files: [img]
        })
    }
}





