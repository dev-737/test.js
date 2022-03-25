const { MessageEmbed } = require('discord.js')
const moment = require('moment');
String.prototype.isNumber = function() {
    return /^\d+$/.test(this);
};

module.exports = {
    name: "whois", 
    description: "Gives info about a user", 
    devOnly: false, 
    run: async ({ client, message, args }) => {
        
        let user = await client.users.fetch(args[0])
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]) || user || message.member 
        //const Member = message.guild.members.cache.get(Target.id);

        try {
        const responce = new MessageEmbed()
        
        .setAuthor( { name : `${member.user.tag}`, iconURL : member.displayAvatarURL({ dynamic : true }) })
        .setColor("BLUE")
        .setThumbnail(member.displayAvatarURL({ dynamic : true }))
        .addField('Basic Info', `**ID:** ${member.id || user.id}\n**Roles:** ${member.roles.cache.map(r => r).join(' ').replace('@everyone', '')}\n**Nickname:** ${member.displayName}\n**No. Roles:** ${member.roles.cache.size }`, false)
        //.addField('User Info: ', `**Joined Server on:** \`${moment(member.joinedAt).format('MMM DD YYYY')}\` (${moment(member.joinedAt).startOf('day').fromNow()}) \n**Joined Discord on:**  \`${moment(member.createdAt).format('MMM DD YYYY')}\` (${moment(member.createdAt).startOf('day').fromNow()})`, true)
        //.addField('Member Since', `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, true)
        .addField('Other Info ', `**Member Joined at:** ${moment(member.joinedAt).format('MMM DD YYYY') || "Not In Guild."}  (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)\n **Joined Discord at:** ${moment(member.user.createdAt).format('MMM DD YYYY')} (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>\n**Nitro:** ${member.user.avatar.startsWith('a_') || member.user.premiumSince ? 'Has Nitro' : 'Regular User'}`, true)
        message.channel.send({ embeds : [responce] })
    } catch {
      const responce = new MessageEmbed()
        
        .setAuthor( { name : `${member.username}`, iconURL : member.displayAvatarURL({ dynamic : true }) })
        .setColor("BLUE")
        .setThumbnail(member.displayAvatarURL({ dynamic : true }))
        .setDescription(`${member.avatar.startsWith('a_') || member.premiumSince ? '<:nitro:956858085069160449>' : '<:nou:956485288534876160> User has no badges.'}`)
        .addField('User Info', `**ID:** ${member.id || user.id}\n**Joined Discord at:** ${moment(member.createdAt).format('MMM DD YYYY')} (<t:${parseInt(member.createdTimestamp / 1000)}:R>)`, false)
        //.addField('User Info: ', `**Joined Server on:** \`${moment(member.joinedAt).format('MMM DD YYYY')}\` (${moment(member.joinedAt).startOf('day').fromNow()}) \n**Joined Discord on:**  \`${moment(member.createdAt).format('MMM DD YYYY')}\` (${moment(member.createdAt).startOf('day').fromNow()})`, true)
        //.addField('Member Since', `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, true)
        .setTimestamp()
        message.channel.send({ embeds : [responce] })
        
      
    }
        
      
        //   .addField(
      //   'Nitro',
      //   member.premiumSinceTimestamp
      //     ? `Since ${new Date(member.premiumSinceTimestamp).toLocaleDateString()}`
      //     : 'No.',
      //   true,
      // )

        
        
        
    }

    
  }
