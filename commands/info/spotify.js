const { MessageEmbed } = require('discord.js');


module.exports = {
        name: "spotify", 
        category: "info", 
    run: async ({bot, message, args}) => {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0]) || message.author; // message.mentions.users.first() || message.author;
        user=await message.guild.members.fetch(user)
        
	
	    
        if (!user.presence?.status) {
            message.reply({ content: "<a:sweat:956462838606606346> User is Offline. Failed to fetch Spotify Status!", allowedMentions: { repliedUser: false } })
            return
        }

        let presence = user.presence.activities
        let spotify  = ""

        
        console.log(user.presence.activities)
       
        const start = performance.now();
        presence.forEach(function (item, index) {
            if(item !== null && item.type === 'LISTENING' && item.name === 'Spotify' && item.assets !== null)
                spotify = item 
                return
                
        });
        const duration = performance.now() - start;
        console.log(duration)
      
    
           if (!spotify) {
            return message.reply({content: '**This user isn\'t listening to Spotify!**', allowedMentions: { repliedUser: false } } ); }
           

            
           
            let trackIMG = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
            let trackURL = `https://open.spotify.com/track/${spotify.syncId}`;
            let trackName = spotify.details;
            let trackAuthor = spotify.state;
            let trackAlbum = spotify.assets.largeText;
       
            
            const embed = new MessageEmbed()
                .setAuthor({name: 'Spotify Track Info', iconURL: 'https://cdn.discordapp.com/emojis/956382916332634142.webp'})
                .setColor("GREEN")
                .setThumbnail(trackIMG)
                .addField('Song Name', trackName, true)
                .addField('Album', trackAlbum, true)
                .addField('Author', trackAuthor, false)
                .addField('Listen to Track', `[Click to open](${trackURL})`, false)
                .setFooter({text: message.member.displayName, iconURL: message.author.displayAvatarURL()})
                .setTimestamp()

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }});
            
            
            
            /*
            console.log(user.presence.activities)
            console.log(user.presence.activities.length)
            trackAlbum.forEach(function (item, index) {
                console.log(spotify.name);
              }); 
            console.log(user.presence.activities[0].name)
            */
        
    }
}