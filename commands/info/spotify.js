const { MessageEmbed } = require('discord.js');


module.exports = {
        name: "spotify", 
        category: "info", 
    run: async ({bot, message, args}) => {
        let user = message.mentions.users.first() || message.author;
        user=await message.guild.members.fetch(user)
        
	// ...
	    

        let presence = user.presence.activities
        let spotify  = ""
       
        const start = performance.now();
        presence.forEach(function (item, index) {
            if(item !== null && item.type === 'LISTENING' && item.name === 'Spotify' && item.assets !== null)
                spotify = item 
                return
                
        });
        const duration = performance.now() - start;
        console.log(duration)
           // console.log(spotify);
    
           if (!spotify) {
            return message.channel.send('**This user isn\'t listening to Spotify!**'); }
           
            let trackIMG = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(8)}`;
            let trackURL = `https://open.spotify.com/track/${spotify.syncId}`;
            let trackName = spotify.details;
            let trackAuthor = spotify.state;
            let trackAlbum = spotify.assets.largeText;
            //console.log(spotify.assets.largeText)
            
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

            message.channel.send({ embeds: [embed] });
            
            
            
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