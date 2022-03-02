const { MessageEmbed } = require('discord.js')
const moment = require('moment')
String.prototype.isNumber = function() {
    return /^\d+$/.test(this);
};

module.exports = {
    name: "whois", 
    description: "Gives info about a user", 
    devOnly: false, 
    run: async ({ message, args, commandName, bot, Discord }) => {
        
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]) || message.member 
        //const Member = message.guild.members.cache.get(Target.id);

        

        const responce = new MessageEmbed()

        .setAuthor( { name : `${member.user.tag}`, iconURL : member.displayAvatarURL({ dynamic : true }) })
        .setColor("BLUE")
        .setThumbnail(member.displayAvatarURL({ dynamic : true }))
        .addField('Basic Info', `**ID:** ${member.id}\n**Roles:** ${member.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'None'}\n**Nickname:** ${member.displayName}`, false)
        //.addField('User Info: ', `**Joined Server on:** \`${moment(member.joinedAt).format('MMM DD YYYY')}\` (${moment(member.joinedAt).startOf('day').fromNow()}) \n**Joined Discord on:**  \`${moment(member.createdAt).format('MMM DD YYYY')}\` (${moment(member.createdAt).startOf('day').fromNow()})`, true)
        //.addField('Member Since', `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, true)
        .addField('Joined Server At ', `${moment(member.joinedAt).format('MMM DD YYYY')}  (${moment(member.joinedAt).startOf('day').fromNow()})`, true)
        .addField('Account Created At ', `${moment(member.user.createdAt).format('MMM DD YYYY')}  (${moment(member.user.createdAt).startOf('day').fromNow()})`, true)
        
        message.channel.send({ embeds : [responce] })
    }


}

