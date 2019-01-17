const Discord = require('discord.js');
const bot = new Discord.Client();

let cmd = "&"

bot.on('ready', function(){
    console.log("Je suis connecté !")
})

bot.login('NTM1MDI4MzUwNjMzMzc3Nzky.DyEwAw.xm9yTBULLVblgZIeR1IQzPczQxc')

bot.on('ready', function(){
    bot.user.setGame('En cours de développement').catch(console.error)
})

bot.on('message', message => {
    //Eviter le crash du bot
    if(!message.guild) return

    //Pour que le bot detecte le préfix & commande ( split pour detecter le préfix
    let args = message.content.trim().split(/ +/g);

    if (message.content === cmd + 'ping'){
        message.reply('pong !')
    }
    if (args[0].toLowerCase() === cmd + 'tg') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("T'as cru mdr")
        //définit le membre à mute
        let member = message.mentions.members.first()
        //Si le membre n'existe pas ou si il n'est pas mit
        if (!member) return message.channel.send("Mets un pseudo ptet nn ? FDP")
        //Si le membre a la permission de mute le membre ( grade )
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("On ne mute pas l'unmutable")
        //Si le BOT a la permission de mute le membre
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("I can't fdp")

        //On détermine le role du muteur
        let muterole = message.guild.roles.find(role => role.name === "Mute")

        //Si le role existe
        if(muterole){
            member.addRole(muterole)
            message.channel.send("Bah alors "+ member +", on peut plus parler?")
        }
        else{
            message.guild.createRole({name: "Mute", permisson: 0}).then((role) => {
                //Ici on filtre tous les salons de la guild
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send("Bah alors "+ member +", on peut plus parler?")
            })
        }

    }
    if(args[0].toLowerCase() === cmd + 'jdec'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ceu meugnon mais non mdr")
        //définit le membre à unmute samère
        let member = message.mentions.members.first()
        //Comme d'hab hein, si le membre existe pas
        if(!member) return message.channel.send("Tu veux demute mais fail pseudo fdp")
        //si le membre a la permission samère
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("On ne mute pas l'unmutable")
        //Si le BOT a la permission de mute le membre
       // if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("I can't fdp")

        let muterole = message.guild.roles.find(role => role.name === "Mute")

        member.removeRole(muterole)
        message.channel.send("Aller j'suis sympa... FDP va")


    }
})