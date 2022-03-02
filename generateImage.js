const Canvas = require("canvas")
const { registerFont } = require('canvas')
const Discord = require("discord.js")
const background = "https://media.discordapp.net/attachments/933581576380489749/948485205767901234/787bcba37ce8a603348d61343eea6993_2.jpg" //"https://i.imgur.com/zvWTUVu.jpg"//Only this image works. You need to set coordinates for other images!
registerFont('./Fonts/BF_Modernista-Regular.ttf', { family: 'BF_Modernista' })


const dim = {
    height: 676, 
    width: 1200, 
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async(member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")


    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.5)" //old - 0.8
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()
    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    
    // draw in Welcome
    ctx.font = "50px 'BF_Modernista'"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px 'BF_Modernista'"
    ctx.fillText(`${username}` + `#${discrim}`, dim.width/2, dim.height - dim.margin - 125)
    console.log(username)

    // draw in to the server
    ctx.font = "40px 'BF_Modernista'"
    ctx.fillText(`to ${member.guild.name}`, dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
  
}
module.exports = generateImage