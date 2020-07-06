const Command = require('../../Base/Command')
const GIFEncoder = require("gifencoder");

class Spotify extends Command{
  constructor(client){
    super(client,{
      name:'spotify',
      description:'Gives spotify user details',
      aliases:['sp'],
      usage:["spotify"]
    })
  }
  async run (message,args,Discord){

    const Can = require("canvas")  
 const moment = require('moment')
 let user = message.mentions.users.first() ||this.client.users.cache.get(args[0]) || message.author
  if(user.presence.activities[0] === undefined ) return message.channel.send(lang.get("spotify_err"))  
  let n =user.presence.activities.find(a => a.name === 'Spotify')
  if(!n)return message.channel.send("user not listening to spotify")
  const GIF = new GIFEncoder(600, 200); 
  let m = await message.channel.send('loading')
  const canvas = Can.createCanvas(600,200)
 const ctx = canvas.getContext("2d")
 let elap = (Date.now()-n.timestamps.start)
 let total = n.timestamps.end - n.timestamps.start
 let start = n.timestamps.start
 let end = moment.utc(total).format('mm:ss')
 
 let songname = n.details
 if(n.details.length > 30)songname = songname.slice(0,30)+"..."
let artistname = n.state
if(artistname > 50)artistname = artistname.slice(0,50)+"..."
  
  let img = await Can.loadImage(`https://i.scdn.co/image/${n.assets.largeImage.slice(8)}`,"image.png")
  let spot = await Can.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png',"spotify.png")
  
 ctx.fillStyle= "#000000"
 ctx.fillRect(0,0,canvas.width,canvas.height)   
 
  ctx.drawImage(img,20,50,100,100)
  ctx.fillStyle = "#ffffff"
  ctx.font = "25px Arial"
  ctx.fillText(songname,135,80)
  ctx.font = "15px Arial"
  ctx.fillText(n.state,135,105)
  ctx.fillText(n.assets.largeText,135,120)
  ctx.drawImage(spot,556,150,35,35)
  ctx.font = '10px Arial'
  ctx.fillText(end,420,180)
  
  
  
  
 // let avatar = Can.loadImage(raw)
  //ctx.drawImage(avatar,25,25,20,20)
  if((elap/total)*300 < 300){
  //bar
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 1
  ctx.strokeRect(135,140,300,20)
  ctx.stroke()
  ctx.fillStyle = '#1db954'
   ctx.fillRect(135.1,139.8,(elap/total)*300,19.8)
    ctx.fillStyle = "#ffffff"
    ctx.fillText(moment.utc(elap).format("mm:ss"),135,180)


  ctx.fillStyle="#ffffff"
  ctx.font = "10px Arial"
 if(args.includes('gif')){
  GIF.start();
  GIF.setDelay(1000);
  while((elap/total)*300 < 300){
    ctx.fillStyle = '#1db954'
    ctx.fillRect(135.1,139.8,(elap/total)*300,19.8)
    ctx.fillStyle='#ffffff'
    ctx.font = '10px Arial'
    ctx.fillText(moment.utc(elap).format("mm:ss"),135,180)
   
    GIF.addFrame(ctx)
    ctx.fillStyle='#000000'
    ctx.fillText(moment.utc(elap).format("mm:ss"),135,180)
    elap+=1000
    
   }
   GIF.finish()
   
 }
  
  }else if((elap/total)*300 > 300){
    message.channel.send("Bot is having trouble while getting current song length")
  }
  //spotify image
  
 // let attach =new Discord.MessageAttachment(GIF.out.getData(),'spotify.gif')
 //let attach = GIF.out.getData()
    let attach = false
    if(!args.includes('gif'))attach = canvas.toBuffer()
    if(args.includes('gif'))attach = GIF.out.getData()
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.tag,user.displayAvatarURL({dynamic:true}))
  .setTitle('spotify')
  .setColor('#1db954')
  .attachFiles([new Discord.MessageAttachment(attach, "spotify.gif")])
  .setImage("attachment://spotify.gif")

 await m.delete()
 message.channel.send(embed)
  }
}
module.exports = Spotify
