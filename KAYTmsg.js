//MODULOS
 const { decryptMedia } = require('@open-wa/wa-decrypt')
 const fs = require ('fs-extra')
 const axios = require('axios')
 const sharp = require('sharp')
 const fetch = require('node-fetch')
 const moment = require('moment-timezone')

 const rate = ['100%','95%','90%','85%','80%','75%','70%','65%','60%','55%','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%']
 const errorurl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png"
//JSON'S
 const setting = JSON.parse(fs.readFileSync('./lib/settings/settings.json'))
 const antivirus = JSON.parse(fs.readFileSync('./lib/helper/antivirus.json'))
 const antienlaces = JSON.parse(fs.readFileSync('./lib/helper/antienlaces.json'))
 const ceroenlaces = JSON.parse(fs.readFileSync('./lib/helper/ceroenlaces.json'))
 const bienvenida = JSON.parse(fs.readFileSync('./lib/helper/bienvenida.json'))
 const simi = JSON.parse(fs.readFileSync('./lib/helper/simi.json'))
 const nsfw = JSON.parse(fs.readFileSync('./lib/helper/nsfw.json'))
 const autostickers = JSON.parse(fs.readFileSync('./lib/helper/autostickers.json'))
 const banned = JSON.parse(fs.readFileSync('./lib/helper/banned.json'))
 const vip = JSON.parse(fs.readFileSync('./lib/helper/vip.json'))
 const mute = JSON.parse(fs.readFileSync('./lib/helper/mute.json'))
//UTILIDADES
 let { ownerNumber, vipNumbers, prefix } = setting
 const {	textTnC, textMenu, textAdmin, textVip, textOwner, listLanguage, listIdiomas, textContrato, stickerMenu, menuAnime, menuYoutube } = require('./lib/menu')
 const { isUrl } = require('./lib/functions')
 const alert = {
            vips: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n_Este comando esta disponible solo para miembros *•⚜VIP⚜•*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            admins: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n_Este comando esta disponible solo para los *admins* del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            owner: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n_Este comando esta disponible solo para el desarrollador_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            groups: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n_El uso en privado esta prohibido._\n_Si deseas usar nuestros servicios gratuitamente te invito a unirte a nuestro grupo oficial: https://chat.whatsapp.com/HiGIXEF2j3FDhQa3HhVZSz_*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            adminBot: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n_Por favor agregame como Administradora del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            nsfw: '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*✋ACCESO DENEGADO🛑*_\n\n_Los comandos NSFW estan deshabilitados, no podras ejecutar ningun comando con contenido pornografico._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*',
            process: `_*Procesando…*_\n*█▒▒▒▒▒▒▒▒▒*\n`,
            processed: '_*Proceso Finalizado*_\n*██████████*',
            searched: '_*Busqueda Finalizada*_\n*██████████*' 
             }
 const {
    exec
 } = require('child_process')
 const { uploadImages } = require('./utils/fetcher')
 const {
    removeBackgroundFromImageBase64
 } = require('remove.bg')
 const {
    apiNoBg,
    apiSimi
 } = JSON.parse(fs.readFileSync('./lib/api.json'))
 const meme = require('./lib/meme')
 const images = require('./lib/images')
 const shortener = require('./lib/shortener')
 const kaytApi = require('./lib/kaytApi')
module.exports = KAYTmsg = async(client, message) => {
	try{
		//PARAMETROS
		 const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
		 let { body } = message
		 const { name, formattedTitle } = chat
		 let { pushname, verifiedName, formattedName } = sender 
		 pushname = pushname || verifiedName || formattedName
		 const botNumber = await client.getHostNumber() + '@c.us'
		 const blockNumber = await client.getBlockedIds()
		 const usuario = sender.id
		 const isOwner = usuario.includes(ownerNumber)
		 const groupId = isGroupMsg ? chat.groupMetadata.id : ''
		 const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
		 const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
		 const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		 const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
		 body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
		 const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		 const processTime = (timestamp, now) => { return moment.duration(now - moment(timestamp * 1000)).asSeconds() }
		 const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		 const arg = body.trim().substring(body.indexOf(' ') + 1)
		 const args = body.trim().split(/ +/).slice(1)
		 const isCmd = body.startsWith(prefix)
         const uaOverride = process.env.UserAgent
         const url = args.length !== 0 ? args[0] : ''
         const isBlocked = blockNumber.includes(sender.id)
         const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
         const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
         const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
         const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
         const isSticker = message.type === 'sticker'
         const isImage = type === 'image'
         const isVideo = type === 'video'
    	//AJUSTES
    	 const isVirus = antivirus.includes(chatId)
    	 const GroupLinkDetector = antienlaces.includes(chatId)
    	 const CeroLinkDetector = ceroenlaces.includes(chatId)
         const isSimi = simi.includes(chatId)
         const isNsfw = nsfw.includes(chatId)
         const isAutostickers = autostickers.includes(chatId)
        //IDENTIFICADORES
         const isOwnerBot = ownerNumber.includes(usuario)
         const isVip = vip.includes(usuario)
         const isBanned = banned.includes(usuario)
        //FUNCIONES
         if (isGroupMsg && isVirus && !isGroupAdmins && !isVip) {
            if (chats.length > 3000) {
            client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Se ha detectado una amenaza, iniciando acciones._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
            await client.removeParticipant(groupId, sender.id)
                }
         }
         if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isVip && (type === 'chat' && message.body.match(/(https:\/\/chat.whatsapp.com)/gi))) return await client.removeParticipant(groupId, sender.id)
         if (isGroupMsg && CeroLinkDetector && !isGroupAdmins && !isVip && (type === 'chat' && message.body.match(/(https:\/\/|http:\/\/)/gi))) return await client.removeParticipant(groupId, sender.id)
         if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
            axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${encodeURIComponent(message.body)}`)
            .then((res) => {
                if (res.data.status == 403) return client.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
                client.reply(from, `${res.data.result.replace("Maaf simi tidak mengetahui maksud anda.", "Lo siento, no puedo entenderte.")}`, id)
            })
            .catch((err) => {
                client.reply(from, `${err}`, id)
            })
         } 
         if (isGroupMsg && isAutostickers) {
            if (isMedia && type === 'image') {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                client.sendImageAsSticker(from, imageBase64, {keepScale: true, author: 'KaytBot', pack: 'VipAutoStickers'})
                } 
            }
         if (isCmd && isBanned) {
            return client.reply(from, "_Usuario baneado._", id)
            }

         if (chats === '!yo') {
            const profilePic = await client.getProfilePicFromServer(sender.id)
                const username = pushname
                const statuses = await client.getStatus(sender.id)
                const benet = isBanned ? '✅' : '❌'
                const adm = isGroupAdmins ? '✅' : '❌'
                const vip = isVip ? '✅' : '❌'
                const { status } = statuses
                if (profilePic === undefined) {
                var profile = errorurl
                } else {
                    var profile = profilePic
                }
                await client.sendFileFromUrl(from, profile, `${username}.jpg`, `*⋆⋅⋅⋅⊱∘──[✧INFO✧]──∘⊰⋅⋅⋅⋆*\n\n*•─Nombre*: ${username}\n*╭─Admin*: ${adm}\n*├─VIP*: ${vip}\n*├─Baneado*: ${benet}\n*╰─Info*: ${status}\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
         }
        //MENSAJES DE CONSOLA
         if (isCmd && !isGroupMsg) { console.log(color('[CMD]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname)) }
         if (isCmd && isGroupMsg) { console.log(color('[CMD]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname), 'en', color(name || formattedTitle)) }
        client.sendSeen(chatId)
        switch(command) {


            //TESTING FUNCTIONS
            case 'ayuda':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si necesitas solicitar ayuda o soporte sobre algun problema con KAYT, envia un mensaje con el siguiente foramto: *${prefix}ayuda + defina su problema*_\n\n_Ejemplo: *${prefix}ayuda no puedo crear stickers que debo hacer?*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const hlpgp = groupId.replace('@g.us', '')
                const hlppv = sender.id.replace('@c.us', '')
                if (isGroupMsg) {
                    await client.sendText(ownerNumber, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola jefe necesitan tu ayuda en el grupo *${name}*, a pedido de  *${pushname}* Su numero: wa.me/${sender.id.replace('@c.us', '')}._\n\n_Motivo:_ ${body.slice(7)}\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                    await client.sendText(ownerNumber, `${prefix}enviar -gp ${hlpgp} | Responder con la solucion`)
                } else {
                    await client.sendText(ownerNumber, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Solicitud de soporte de *${pushname}* su número wa.me/${sender.id.replace('@c.us', '')}.\n\n_Motivo:_ ${body.slice(7)}\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                    await client.sendText(ownerNumber, `${prefix}enviar -pv ${hlppv} | Responda con la solucion`)
                }
                await client.reply(from, 'Agradecemos por informar um de nossos erros, fique atento que quando vermos iremos responder!', id)
                break
            case 'edotensei':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (mentionedJidList.length === 0) return client.reply(from, `Para usar este comando, por favor envía el comando *${prefix}eliminar @usuario*`, id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, `_No puedo realizar este proceso con un administradora del grupo_`, id)
                if (ownerNumber.includes(mentionedJidList[i])) return client.reply(from, `_No puedo realizar este proceso con un usuario VIP_`, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
                await client.addParticipant(from,`${mentionedJidList}`)
                } 
                break

            //ADMINISTRADORES
            case 'ponernombre':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins ) return client.reply(from, alert.adminBot, id)
                if (args.length == 0) return client.reply(from,`*⋆⋅⋅⋅⊱∘───[✧GN✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas cambiar el nombre del grupo a traves de este comando por favor envía un mensaje con el siguiente formato: *${prefix}ponernombre + nuevo nombre*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭Notas:*\n_1. Esta funcion es especial para poder poner 10 caracteres mas de los permitidos por whatsapp para los nombres de los grupos que es de 25._\n\n_2. Por favor procura que el nombre que le vayas a colocar al grupo no supere los 35 caracteres, de lo contrario no podre cambiar el nombre del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`,id)
                    const detv = await client.getChatById(groupId)
                    const gropnama = detv.contact.formattedName 
                    const namagrup = body.slice(13)
                    let halaman = global.page ? global.page : await client.getPage()
                    await halaman.evaluate((chatId, subject) =>
                        Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                    client.sendText(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Nombre cambiado._\n\n*╭─Anterior:* ${gropnama}\n*╰─Nombre:* ${namagrup}\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    .catch((err) => {
                        console.log(`[ERROR] ${err}`)
                    })
                break
            case 'ponerperfil':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (isMedia && type == 'image' || isQuotedImage) {
                    const dataMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = dataMedia.mimetype
                    const mediaData = await decryptMedia(dataMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await client.setGroupIcon(groupId, imageBase64)
                    await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_!He cambiado la foto de perfil del grupo correctamente!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                } else if (args.length === 1) {
                    if (!isUrl(url)) { await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Lo siento, el enlace que enviaste no es valido!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                    client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
                    ? client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Lo siento, el enlace que enviaste no contiene ninguna imagen!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    : client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_!He cambiado la foto de perfil del grupo correctamente!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id))
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas cambiar la foto de perfil del grupo por favor envia o etiqueta una imagen con el siguiente comando: ${prefix}ponerperfil._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Nota Importante:_\n_Tambien puedes cambiar la foto de perfil del grupo a traves de un enlace de imagen de internet._\n\n_*Ejemplo:*_ ${prefix}ponerperfil https://yt3.ggpht.com/a/AATXAJyUhFmoSGjKSHA_6A1st8ugjV-MWZu71qVUAk_JNg=s900-c-k-c0x00ffffff-no-rj\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'añadir':
                case 'agregar':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (args.length !== 1) return client.reply(from, `Para usar el comando ${prefix}añadir\nEscribir: ${prefix}añadir <numero>\nEjemplo: ${prefix}añadir 573228125090\n\n*Recuerda  no poner el simbolo del +, tampoco dejar espacios entre cada numero*`, id)
                    try {
                        await client.addParticipant(from,`${args[0]}@c.us`)
                    } catch {
                        client.reply(from, 'Lo siento no puedo anadir a esta persona.\n\nEsto se debe a varias razones\n\n1. Existe un error con el comando que me has enviado \n2. El numero que intentas añadir  ha salido recientemente\n\n3. El numero no existe o esta mal escrito\n4.Que la persona que intentas agregar tiene inhabilitada la opcion de anadirle a grupos\n\n(Ajustes/Cuenta/Privacidad/Grupos )', id)
                    }
                break
            case 'promover':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (mentionedJidList.length !== 1) return client.reply(from, 'Lo siento, solo puedo promover a 1 usuario', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '¡Error en la solicitud! El usuario ya es Administrador', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lo siento, el formato del mensaje es incorrecto.\nNo me puedo promover a mi misma', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Solicitud aceptada, promoviendo administracion a: @${mentionedJidList[0].replace('@c.us', '')} `)
                break
            case 'degradar':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (mentionedJidList.length !== 1) return client.reply(from, 'Error al procesar su solicitud', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, '¡Error en la solicitud! El usuario no es Administrador', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lo siento, el formato del mensaje es incorrecto.\nNo me puedo degradar a mi misma', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Solicitud aceptada, quitando administracion a: @${mentionedJidList[0].replace('@c.us', '')}.`)
                break

             case 'autoadmin':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (!isBotGroupAdmins) return client.reply(from, '!Lo siento mucho Jefecito no soy administradora de este grupo!', id)
                await client.promoteParticipant(from,`573228125090@c.us`)
                break
            case 'enlace':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId);
                    client.sendLinkWithAutoPreview(from,`*⋆⋅⋅⋅⊱∘─[✧ENLACE✧]─∘⊰⋅⋅⋅⋆*\n\n*•─Nombre:* ${name}\n*•─Enlace:* ${inviteLink}\n\n_Utilice: *${prefix}anular* para restablecer el enlace del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                } else {
                    client.reply(from, alert.groups, id)
                }
                break
            case "anular":
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (isBotGroupAdmins) {
                    client.revokeGroupInviteLink(from)
                    .then((res) => {
                        client.reply(from, `*🚫El enlace de invitacion a este grupo ha sido anulado🚫*\n\n_Utilice: *${prefix}enlace* para obtener el nuevo enlace de invitacion de este grupo_`, id);
                    })
                    .catch((err) => {
                        console.log(`[ERR] ${err}`)
                    })
                }
                break
            case 'mimir':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Vamonos a mimir 😴💤🌃!'))
                break
            case 'yepetar':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'Es hora de levantarse!'))
                break
            case 'mutear':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Modo solo administradoraes activado🔇!'))
                break
            case 'añadircreador':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                    try {
                        await client.addParticipant(from,`573228125090@c.us`)
                        client.sendText(from, 'Hola Jefecito, me han pedido que te agregue a este grupo espero que la pases bien, estoy a tus ordenes')
                    } catch {
                        client.reply(from, 'Lo siento no puedo anadir a esta persona.\n\nEsto se puede deber a que la persona que intentas agregar tiene inhabilitada la opcion de anadirle a grupos\n\n(Ajustes/Cuenta/Privacidad/Grupos ) ', id)
                    }
                break
            case 'desmutear':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'Modo solo administradoraes desactivado🔊!'))
                break
            case 'eliminar':
                if (!isGroupMsg) return client.reply(from, '!Lo siento, este comando solo lo puedes usar dentro de grupos!', id)
                if (!isGroupAdmins) return client.reply(from, '!Lo siento, este comando solo puede ser usado por los Administradores!', id)
                if (!isBotGroupAdmins) return client.reply(from, '!Error, por favor agregame como Administradora del grupo!', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Lo siento, el formato del mensaje es incorrecto.\netiqueta a una o mas personas para eliminarlas', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lo siento, no me puedo eliminar a mi misma', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Lo siento, no puedo eliminar a un administradora del grupo. use el comando *!eliminaradmin* para eliminar a un administradora', id)
                await client.sendTextWithMentions(from, `Solicitud aceptada, eliminando a:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break
            case 'eliminaradmin':
                if (!isGroupMsg) return client.reply(from, '!Lo siento, este comando solo lo puedes usar dentro de grupos!', id)
                if (!isGroupAdmins) return client.reply(from, '!Lo siento, este comando solo puede ser usado por los Administradores!', id)
                if (!isBotGroupAdmins) return client.reply(from, '!Error, por favor agregame como Administradora del grupo!', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Lo siento, el formato del mensaje es incorrecto.\netiqueta a una o mas personas para eliminarlas', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Lo siento, no me puedo eliminar a mi misma', id)
                await client.sendTextWithMentions(from, `Solicitud aceptada, eliminando al administradora:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break
            case 'borrar':
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!quotedMsg) return client.reply(from, `Lo siento, el formato del mensaje es incorrecto.\nResponder a los mensajes de bot con el titulo ${prefix}borrar`, id)
                if (!quotedMsgObj.fromMe) return client.reply(from, `Lo siento, el formato del mensaje es incorrecto.\nResponder a los mensajes de bot con el titulo ${prefix}borrar`, id)
                client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case 'todos':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                const groupMem = await client.getGroupMembers(groupId)
                let hehex = '╭─────•〘 Lista de Miembros 〙•───•\n'
                for (let i = 0; i < groupMem.length; i++) {
                    hehex += '├─➻'
                    hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehex += '╰─────•〘 *KaytBot* 〙•───•'
                await client.sendTextWithMentions(from, hehex, id)
                break
            

            //VIP
            case 'simsimi':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from,'_Funcion en mantenimiento_',  id)
                /*case 'simisimi':
                if (!isVip) return client.reply(from, alert.vips, id)
                client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧MB✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas activar o desactivar el bot *SimSimi* por favor envía un mensaje con el siguiente formato: *${prefix}simi on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}simi on* : Activa el bot SimSimi._\n_*${prefix}simi off* : Desctiva el bot SimSimi._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)*/
                break

                case 'simi':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from,'_Funcion en mantenimiento_',  id)
                /*if (!isVip) return client.reply(from, alert.vips, id)
                if (args[0] == 'on') {
                    var cek = simi.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El bot *SimSimi* ya esta activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        simi.push(chatId)
                        fs.writeFileSync('./lib/helper/simi.json', JSON.stringify(simi))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_Activando el bot *SimSimi.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = simi.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El bot *SimSimi no estaba activo en este grupo.*_\n_*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        let well = simi.indexOf(chatId)
                        simi.splice(well, 1)
                        fs.writeFileSync('./lib/helper/simi.json', JSON.stringify(simi))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_Desactivando el bot *SimSimi*._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧MB✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas activar o desactivar el bot *SimSimi* por favor envía un mensaje con el siguiente formato: *${prefix}simi on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}simi on* : Activa el bot SimSimi._\n_*${prefix}simi off* : Desctiva el bot SimSimi._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }*/
                break
            case 'nsfw':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args[0] == 'on') {
                    var cek = nsfw.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_Los comandos con contenido NSFW ya estan permitidos en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        nsfw.push(chatId)
                        fs.writeFileSync('./lib/helper/nsfw.json', JSON.stringify(nsfw))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n\n_Los comandos con contenido NSFW han sido permitidos en este grupo y podran ser usados por todos los participantes._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = nsfw.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_Los comandos con contenido NSFW no estan permitidos en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        let well = nsfw.indexOf(chatId)
                        nsfw.splice(well, 1)
                        fs.writeFileSync('./lib/helper/nsfw.json', JSON.stringify(nsfw))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n\n_Los comandos con contenido NSFW han sido deshabilitados, se denegara el uso de cualquier comando relacionado con NSFW en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘──[✧NSFW✧]──∘⊰⋅⋅⋅⋆*\n_Si deseas activar o desactivar los comandos con contenido NSFW por favor envía un mensaje con el siguiente formato: *${prefix}nsfw on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}nsfw on* : Habilita los comandos con contenido NSFW._\n_*${prefix}nsfw off* : Deshabilita los comandos con contenido NSFW._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'autosticker':
                case 'autostiker':
                case 'autostickers':
                case 'autostikers':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args[0] == 'on') {
                    var cek = autostickers.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Auto Stickers]* ya está activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        autostickers.push(chatId)
                        fs.writeFileSync('./lib/helper/autostickers.json', JSON.stringify(autostickers))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Auto Stickers]* se ha activado correctamente en este grupo._\n\n_Toda imagen que sea enviada en este grupo mientras esta función esta activa sera convertida en sticker automaticamente.\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = autostickers.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Auto Stickers]* no estaba activo en este grupo._', id) //if number already exists on database
                    } else {
                        let nixx = autostickers.indexOf(chatId)
                        autostickers.splice(nixx, 1)
                        fs.writeFileSync('./lib/helper/autostickers.json', JSON.stringify(autostickers))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Auto Stickers]* se ha desactivado correctamente.\n\n_Ahora cualquier participante que desee un sticker tendra que poner el comando correspondiente._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧SA✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Auto Stickers]* es una función que crea autoamaticamente en sticker cualqueir imagen que sea enviada en el grupo, sin enviar mensajes de respuesta, apto para guerra de stickers (usar con moderacion)._\n\n_Si deseas activar o desactivar el sistema *[Auto Stickers]* por favor envía un mensaje con el siguiente formato: *${prefix}autostickers on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}autostickers on* : Activa el sistema auto stickers._\n_*${prefix}autostickers off* : Desctiva el sistema auto stickers._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break    
            case 'prohibir':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas prohibir el uso de comandos a uno o varios usuarios por favor envía un mensaje con el siguiente formato: *${prefix}prohibir @usuario @usuario , etc.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    banned.push(mentionedJidList[i])
                    fs.writeFileSync('./lib/helper/banned.json', JSON.stringify(banned))
                    client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_El usuario ha sido prohibido correctamente y no podra volver a usar comandos hasta ser permitido nuevamente._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                break
            case 'permitir':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas permitir nuevamente el uso de comandos a uno o  varios usuarios baneados por favor envía un mensaje con el siguiente formato: *${prefix}permitir @usuario @usuario , etc.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                 for (let i = 0; i < mentionedJidList.length; i++) {
                    let xnxx = banned.indexOf(mentionedJidList[i])
                    banned.splice(xnxx,1)
                    fs.writeFileSync('./lib/helper/banned.json', JSON.stringify(banned))
                    client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\nEl usuario ha sido desbloqueado correctamente, podra volver a usar los comandos normalmente sin ninguna restriccion!\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                break
            case 'eliminartodos': 
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                const allMem = await client.getGroupMembers(groupId)
                for (let i = 0; i < allMem.length; i++) {
                    if (groupAdmins.includes(allMem[i].id)) {
                    } else {
                        await client.removeParticipant(groupId, allMem[i].id)
                    }
                }
                client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_He eliminado a todos los miembros del grupo excepto a l@s adminis._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                break
            case 'eliminargrupo': 
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                const allMems = await client.getGroupMembers(groupId)
                for (let i = 0; i < allMems.length; i++) {
                    if (usuario.includes(allMems[i].id)) {
                    } else {
                        await client.removeParticipant(groupId, allMems[i].id)
                    }
                }
                client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_He eliminado a todos los miembros del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                break
            case 'shinratensei': 
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/skF1RMgP3FHfG/giphy.gif')
                const stmem = await client.getGroupMembers(groupId)
                for (let i = 0; i < stmem.length; i++) {
                    if (groupAdmins.includes(stmem[i].id)) {
                    } else {
                        await client.removeParticipant(groupId, stmem[i].id)
                    }
                }
                break
            case 'funar':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (mentionedJidList.length === 0) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Usa este comando para funar a un usuario del grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Ups, no me puedo funar a mi misma!\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                await client.sendTextWithMentions(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Has realizado la funación a :\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break            

        	//AJUSTES
        	case 'antivirus':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (args[0] == 'on') {
                    var cek = antivirus.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Virus]* ya está activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        antivirus.push(chatId)
                        fs.writeFileSync('./lib/helper/antivirus.json', JSON.stringify(antivirus))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Virus]* se ha activado correctamente en este grupo._\n\n_Los miembros que envien mensajes con mas de 3000 caracteres serán expulsados._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = antivirus.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Virus]* no estaba activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        let nixx = antivirus.indexOf(chatId)
                        antivirus.splice(nixx, 1)
                        fs.writeFileSync('./lib/helper/antivirus.json', JSON.stringify(antivirus))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Virus]* se ha desactivado correctamente en este grupo._\n\n_Ahora se permitiran cualquier tipo de mensajes extensos de hasta 65536 caracteres._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧AV✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Antivirus]* es una función especial que eliminara a cualquier participante que envie un mensaje de mas de 3000 caracteres que posiblemente tenga contenido de laggs o virus que afectan el chat._\n\n_Si deseas activar o desactivar la funcion de *[Anti Virus]* en el grupo por favor envía un mensaje con el siguiente formato *${prefix}antivirus on - off*_\n\n_*❍⌇─➭Ejemplo:*_\n\n_*${prefix}antivirus on* : Activa el sistema antivirus._\n_*${prefix}antivirus off* : Desactiva el sistema antivirus._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'antienlaces':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (args[0] == 'on') {
                    var cek = antienlaces.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Enlaces]* ya esta activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    } else {
                        antienlaces.push(chatId)
                        fs.writeFileSync('./lib/helper/antienlaces.json', JSON.stringify(antienlaces))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Enlaces]* se ha activado correctamente en este grupo._\n\n_Los miembros que envien enlaces de grupos de WhatsApp serán expulsados._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = antienlaces.includes(chatId);
                    if(!cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Enlaces]* no estaba activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    } else {
                        let nixx = antienlaces.indexOf(chatId)
                        antienlaces.splice(nixx, 1)
                        fs.writeFileSync('./lib/helper/antienlaces.json', JSON.stringify(antienlaces))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Anti Enlaces]* se ha desactivado correctamente._\n\n_Todos los enlaces de whatsapp seran permitidos en el grupo (excepto si la funcion *Cero Enlaces* esta activa)._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                        client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧AE✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *Anti Enlaces* es una función que eliminará a todos los participantes que envíen enlaces de grupos de WhatsApp no autorizados._\n\n_Si deseas activar o desactivar el sistema *[Anti Enlaces]* por favor envía un mensaje con el siguiente fomato: *${prefix}antienlaces on - off*_\n\n_*❍⌇─➭Ejemplo:*_\n_*${prefix}antienlaces on* : Activa el Sistema Antienlaces._\n_*${prefix}antienlaces off* : Desactiva el Sistema Antienlaces._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n`, id)
                }
                break
            case 'ceroenlaces':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (args[0] == 'on') {
                    var cek = ceroenlaces.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Cero Enlaces]* ya está activo en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        ceroenlaces.push(chatId)
                        fs.writeFileSync('./lib/helper/ceroenlaces.json', JSON.stringify(ceroenlaces))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Cero Enlaces]* se ha activado correctamente en este grupo._\n\n_Los miembros que envien enlaces de cualquier tipo serán expulsados._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = ceroenlaces.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Cero Enlaces]* no estaba activo en este grupo._', id) //if number already exists on database
                    } else {
                        let nixx = ceroenlaces.indexOf(chatId)
                        ceroenlaces.splice(nixx, 1)
                        fs.writeFileSync('./lib/helper/ceroenlaces.json', JSON.stringify(ceroenlaces))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Cero Enlaces]* se ha desactivado correctamente.\n\n_Ahora se permitira el envio de cualquier tipo de enlaces en este grupo.(excepto de grupos de whatsapp si el sitema *Anti Enlaces* esta activado)._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧CE✧]───∘⊰⋅⋅⋅⋆*\n_El sistema *[Cero Enlaces]* es una función que elimina a los participantes que envíen enlaces de cualquier tipo._\n\n_Si deseas activar o desactivar el sistema *[Cero Enlaces]* por favor envía un mensaje con el siguiente formato: *${prefix}ceroenlaces on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}ceroenlaces on* : Activa el sistema cero enlaces._\n_*${prefix}ceroenlaces off* : Desctiva el sistema cero enlaces._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'bienvenida':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                if (args[0] == 'on') {
                    var cek = bienvenida.includes(chatId);
                    if(cek){
                        return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_Los *mensajes de bienvenida* ya están activos en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        bienvenida.push(chatId)
                        fs.writeFileSync('./lib/helper/bienvenida.json', JSON.stringify(bienvenida))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ON✧]───∘⊰⋅⋅⋅⋆*\n_Los *mensajes de bienvenida* se han activado correctamente en este grupo._\n\n_Todo integrante que ingrese a este grupo sera recibido con un mensaje de bienvenida que incluye el nombre del grupo y la descripcion._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else if (args[0] == 'off') {
                    var cek = bienvenida.includes(chatId);
                    if(!cek){
                         return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_Los *mensajes de bienvenida* no estaban activos en este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) //if number already exists on database
                    } else {
                        let well = bienvenida.indexOf(chatId)
                        bienvenida.splice(well, 1)
                        fs.writeFileSync('./lib/helper/bienvenida.json', JSON.stringify(bienvenida))
                        client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧OFF✧]───∘⊰⋅⋅⋅⋆*\n_Los *mensajes de bienvenida* han sido desactivados correctamente.\n\n_No se enviara ningun mensaje a los participantes que ingresen a este grupo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧MB✧]───∘⊰⋅⋅⋅⋆*\n_Los *mensajes de bienvenida* son mensajes que se envian automaticamente cuando ingresa un nuevo miembro al grupo, los cuales incluyen bienvenida del bot + nombre del grupo + descripcion del grupo._\n\n_Si deseas activar o desactivar los *mensajes de bienvenida* por favor envía un mensaje con el siguiente formato: *${prefix}bienvenida on - off*_\n\n_*❍⌇─➭Ejemplo*_\n\n_*${prefix}bienvenida on* : Activa los mensajes de bienvenida._\n_*${prefix}bienvenida off* : Desctiva los mensajes de bienvenida._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break

        	//MENUS
        	case 'tyc':
        		await client.reply(from, textTnC(), id)
        		break
        	case 'menu':
        		case 'menú':
        		case 'comandos':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
        		await client.reply(from, textMenu(pushname), id)
        		.then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, `*╭────────────╮*\n_*📲Menú para Admins*_\n*╰━╾${prefix}adminmenu╼━╯*`) : null)
        		.then(() => ((isGroupMsg) && (isVip)) ? client.sendText(from, `*╭──────────╮*\n_*• ⚜️Menú VIP⚜️•*_\n*╰━╾${prefix}vipmenu╼━╯*`) : null)
        		.then(() => ((isGroupMsg) && (isOwnerBot)) ? client.sendText(from, `*╭──────────╮*\n_*• 💻Menú Dev💻•*_\n*╰━╾${prefix}devmenu╼━╯*`) : null)
	        	break
	        case 'menuadmin':
	        	case 'adminmenu':
	        	if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                await client.reply(from, textAdmin(pushname), id)
            	.then(() => ((isGroupMsg) && (isVip)) ? client.sendText(from, `*╭──────────╮*\n_*• ⚜️Menú VIP⚜️•*_\n*╰━╾${prefix}vipmenu╼━╯*`) : null)
            	.then(() => ((isGroupMsg) && (isOwnerBot)) ? client.sendText(from, `*╭──────────╮*\n_*• 💻Menú Dev💻•*_\n*╰━╾${prefix}devmenu╼━╯*`) : null)
	        	break
            case 'menuanime':
                case 'animemenu':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, menuAnime(pushname), id)
                break
            case 'vipmenu':
                case 'menuvip':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                await client.reply(from, textVip(pushname), id)
                .then(() => ((isGroupMsg) && (isOwnerBot)) ? client.sendText(from, `*╭──────────╮*\n_*• 💻Menú Dev💻•*_\n*╰━╾${prefix}devmenu╼━╯*`) : null)
                break
            case 'devmenu':
                case 'menudev':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                await client.reply(from, textOwner(pushname), id)
                break
            case 'contrato':
                case 'contratar':
                await client.reply(from, textContrato(pushname), id)
                break
            case 'listatts':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, listLanguage(), id)
                break
            case 'idiomas':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, listIdiomas(pushname), id)
                break
            case 'youtube':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
            	if (!isVip) return client.reply(from, alert.vips, id)
            	client.reply(from, menuYoutube(pushname), id)
            	break
            case 'stickermenu':
            	case 'menusticker':
            	case 'stickersmenu':
            	case 'menustickers':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
            	client.reply(from, stickerMenu(pushname), id)
            	break

            //JUEGOS
			case 'ping':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, `*⋆⋅⋅⋅⊱∘───[PONG]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Velocidad de respuesta:*\n          _*${processTime(t, moment())}* Segundos_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'pong':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, `*⋆⋅⋅⋅⊱∘───[PING]───∘⊰⋅⋅⋅⋆*\n\n *❍⌇─➭ Velocidad de respuesta:*\n          _*${processTime(t, moment())}* Segundos_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'marco':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, `*⋆⋅⋅⋅⊱∘───[POLO]───∘⊰⋅⋅⋅⋆*\n\n *❍⌇─➭ Velocidad de respuesta:*\n          _*${processTime(t, moment())}* Segundos_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'polo':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, `*⋆⋅⋅⋅⊱∘──[MARCO]──∘⊰⋅⋅⋅⋆*\n\n\n *❍⌇─➭ Velocidad de respuesta:*\n          _*${processTime(t, moment())}* Segundos_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'homo':
                case 'gay':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupAdmins) return client.reply(from, alert.admins, id)
                if (mentionedJidList.length === 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si quieres saber que tan homosexual es una persona del grupo envía un mensaje con el comando ${prefix}homo @usuario_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const groupMemc = await client.getGroupMembers(groupId)
                    let prsen = rate[Math.floor(Math.random() * rate.length)]
                    await client.sendTextWithMentions(from, `*⋆⋅⋅⋅⊱∘──[✧HOMO✧]──∘⊰⋅⋅⋅⋆*\n\n*┏─usuario:* _@${mentionedJidList}_\n*┗─homosexualidad:* _${prsen}_\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'piedra':
                case 'papel':
                case 'tijera':
                case 'tijeras':
                    if (!isGroupMsg) return client.reply(from, alert.groups, id)
                    fetch('https://raw.githubusercontent.com/KingAndrewYT/resources/main/random/ppt.txt')
                    .then(res => res.text())
                    .then(body => {
                        let splitnix = body.split('\n')
                        let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                        client.reply(from, randomnix, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                break
            case 'ppt':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                client.sendText(from, 'Un', 500)
                client.sendText(from, 'Dos', 500)
                client.sendText(from, 'Tres', 500)
                client.sendText(from, 'Ya', 500)
                client.sendText(from, 'Piedra', 500)
                client.sendText(from, 'Papel o', 500)
                client.sendText(from, 'Tijera', 500)
                break


            //OWNER
            case 'entrar':

                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Hola usuario *•⚜VIP⚜•* si deseas invitarme a un grupo por favor enviame un mensaje con el siguiente formato: *${prefix}entrar + link de tu grupo*_\n\n_*Ejemplo:*_ ${prefix}entrar https://chat.whatsapp.com/HnBHOUMywe3AkSekhgvDv5\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                let linkgrup = body.slice(8)
                let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
                let chekgrup = await client.inviteInfo(linkgrup)
                if (!islink) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento el enlace que has enviado es incorrecto, por favor verificalo e intenta nuevamente._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                if (isOwnerBot) {
                    await client.joinGroupViaLink(linkgrup)
                          .then(async () => {
                              await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Genial! me he unido a tu grupo a través del enlace_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                              await client.sendFile(chekgrup.id,`./media/kaytbotperfil.jpg`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Hola! 👋 yo soy *"KaytBot🤖"* tu nuevo asistente virtual si quieres conocer cuales son mis funciones envía un mensaje con el comando:_\n*${prefix}menu* \n_Esto te mostrara una lista de todas las cosas que puedo realizar para ti, solamente tienes que poner los comandos tal y como se muestran en la lista, sin espacios, sin tildes ni comillas y listo._\n\n_*Estoy a tus ordenes, que tengas un buen dia 🌤️.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                          })
                            .catch(() => {
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                            })
                }
                break
            case 'deshabilitar':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                const grupmem = await client.getGroupMembers(groupId, sender.id)
                for (let blast of grupmem) 
                        mute.push(blast)
                        fs.writeFileSync('./lib/helper/mute.json', JSON.stringify(mute))
                break
            case 'habilitar':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                let beneta = mute.indexOf(mute[0])
                    mute.splice(beneta)
                    fs.writeFileSync('./lib/helper/mute.json', JSON.stringify(mute))
                await client.reply(from, 'Todos los usuarios de este grupo han sido permitidos, ahora podran usar comandos nuevamente.', id)
                break
            case 'webscreen': 
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                client.reply(from, 'Procesando por favor espere', id)
                const sesPic = await client.getSnapshot()
                client.sendFile(from, sesPic, 'session.png', 'Captura Web', id)
                break
            case 'setname':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                const grap = body.slice(9)
                await client.setMyName(grap)
                    client.sendTextWithMentions(from, `He cambiado mi nombre correctamente @${sender.id.replace('@c.us','')} 😘`)
                break
            case 'setstatus':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                    const setstat = body.slice(11)
                    await client.setMyStatus(setstat)
                    client.sendTextWithMentions(from, `He cambiado mi informacion de perfil @${sender.id.replace('@c.us','')} 😘`)
                break
            case 'setpp':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                const isqwtimg1 = quotedMsg && quotedMsg.type === 'image'
                    if (isMedia && message == 'image' || isQuotedImage) {
                        const dataMediax = isqwtimg1 ? quotedMsg : message
                        const _mimetypep = dataMediax.mimetype
                        const mediaDatax = await decryptMedia(dataMediax, uaOverride)
                        const imageBase64j = `data:${_mimetypep};base64,${mediaDatax.toString('base64')}`
                        await client.setProfilePic(imageBase64j)
                        await client.reply(from, '_He cambiado mi foto de perfil correctamente._!', id)
                    }
                break
            case 'newpref':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length !== 1) return 
                    const pf = body.slice(9)
                    setting.prefix = `${pf}`
                    prefix = `${pf}`
                    fs.writeFileSync('./lib/settings/settings.json', JSON.stringify(setting, null, 2))
                    client.reply(from, `_Su nuevo Prefijo es *${pf}*_`, id)
                break
            case 'apagar':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)        
                return await client.reply(from, '_Apagando el sistema._', id)
                    .then(async () => await client.kill())
                break
            case 'df': 
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                let msg = body.slice(4)
                const chatz = await client.getAllChatIds()
                for (let idk of chatz) {
                    var cvk = await client.getChatById(idk)
                    if (!cvk.isReadOnly) client.sendText(idk, `${msg}`)
                    if (cvk.isReadOnly) client.sendText(idk, `${msg}`)
                }
                client.reply(from, '_Difusion terminada...!_', id)
                break
            case 'salir': 
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                const allChatz = await client.getAllChatIds()
                const allGroupz = await client.getAllGroups()
                for (let gclist of allGroupz) {
                    await client.sendText(gclist.contact.id, `Bueno chicos fue un placer estar con ustedes, mi dueño me ha mandado a salir de todos los grupos: ${allChatz.length}`)
                    await client.leaveGroup(gclist.contact.id)
                    await client.deleteChat(gclist.contact.id)
                }
                client.reply(from, 'He salido de todos los grupos!', id)
                break
            case 'limpiar':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                const allChatx = await client.getAllChats()
                for (let dchat of allChatx) {
                    await client.deleteChat(dchat.id)
                }
                client.reply(from, 'He eliminado todos los chats!', id)
                break
            case 'ss': 
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length == 0) return client.reply(from, `_💡Para tomar un ScreenShot (pantallazo) de una pagina web envie un mensaje con el siguiente formato: *${prefix}ss + URL*_\n_Ejemplo:_ ${prefix}ss https://www.google.com/ `, id)
                const scrinshit = await meme.ss(args[0])
                await client.sendFile(from, scrinshit, 'ss.jpg', '_✅Screenshot tomado correctamente_', id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'sacame':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (!isBotGroupAdmins) return client.reply(from, '!Lo siento jefecito no soy administradora', id)
                    try {
                        await client.removeParticipant(from,`573228125090@c.us`)
                        client.reply(from, 'Chao Jefecito, te extrañare mucho ♥.♥', id)
                    }catch{
                        client.reply(from, '¡Ups! ha ocurrido un error) ', id)
                    }
                break
            case 'bye':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                client.reply(from, 'Ok Jefecito ya me retiro del grupo, Te Quiero♥', id).then(() => client.leaveGroup(groupId))
                break
            case 'autoadmin':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (!isBotGroupAdmins) return client.reply(from, '!Lo siento mucho Jefecito no soy administradora de este grupo!', id)
                await client.promoteParticipant(from,`573228125090@c.us`)
                break
            case 'vip':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas conceder acceso VIP a un usuario por favor envía un mensaje con el siguiente formato: *${prefix}vip @usuario*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    vip.push(mentionedJidList[i])
                    fs.writeFileSync('./lib/helper/vip.json', JSON.stringify(vip))
                    client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_El usuario ha sido promovido a VIP correctamente._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                break
            case 'unvip':
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas denegar el acceso VIP a un usuario por favor envía un mensaje con el siguiente formato: *${prefix}unvip @usuario*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                 for (let i = 0; i < mentionedJidList.length; i++) {
                    let xnxx = vip.indexOf(mentionedJidList[i])
                    vip.splice(xnxx,1)
                    fs.writeFileSync('./lib/helper/vip.json', JSON.stringify(vip))
                    client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Se ha denegado el acceso VIP,el usuario no podra volver a usar los comandos VIP!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                break

            //STICKERS
            case 'sticker':
                case 'stiker':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if ((isMedia || isQuotedImage) && args.length === 0) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.sendImageAsSticker(from, imageBase64, {author: 'KaytBot', pack: 'BotStickers'})
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una *imagen* en *sticker* por favor envía o responde la *imagen* que deseas convertir con el comando: *${prefix}sticker*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n_2. Este método creará stickers recortados al centro de la imagen, si la imagen es muy alta o muy ancha el sticker solo mostrara la parte central de la imagen._\n_3. Si quieres un sticker que salga completo sin recortes prueba el método 2 con el comando *${prefix}sticker2*._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'sticker2':
                case 'sticker2':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (isMedia || isQuotedImage && args.length === 0) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    var mediaData = await decryptMedia(encryptMedia, uaOverride)
                    var filename = `./media/stickergif.${_mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickerpng.png --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickerpng.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${gif.toString('base64')}`, { author: 'KaytBot', pack: 'BotStickers'})
                        .then(() => {
                            client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                            console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                        })
                        .catch((err) => {
                            console.error(err)
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })                
                    })
                    } else {
                        await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una *imagen* en *sticker* por favor envía o responde la *imagen* que deseas convertir con el comando: *${prefix}sticker2*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n_2. Este método creará stickers ajustados al centro de la imagen, si la imagen es muy alta o muy ancha el sticker saldrá comprimido ajustandolo a un tamaño cuadrado._\n_3. Si quieres un sticker que salga sin deformaciones prueba el método 1 con el comando *${prefix}sticker*._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stickerp':
                case 'stikerp':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if ((isMedia || isQuotedImage) && args.length === 0) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.sendImageAsSticker(from, imageBase64, {keepScale: true, author: 'KaytBot', pack: 'Vip Stickers'})
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una *imagen* en *sticker* por favor envía o responde la *imagen* que deseas convertir con el comando: *${prefix}stickerp*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'sturl':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length === 1) {
                if (!isUrl(url)) { await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento, el enlace que enviaste es invalido_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                await client.sendImageAsSticker(from, await client.download(url), { author: 'KaytBot', pack: 'BotStickers'}).then((r) => (!r && r !== undefined)
                    ? client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento, el enlace que enviaste no contiene una imagen._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    : client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Las imagenes .webp no son soportadas por el comando !urlsticker*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*'), id)
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una *imagen* o *GIF* directamente desde su direccion web (URL) en *sticker* o *sticker animado* envía un mensaje con el siguiente formato: *${prefix}sturl + URL de la imagen o GIF*_\n\n_*Ejemplo:*_ ${prefix}sturl https://yt3.ggpht.com/ytc/AAUvwnjnQZFdRkEOYQSre0irbDafA1uYeNs7o9F4Etml=s900-c-k-c0x00ffffff-no-rj\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'sturlp':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length === 1) {
                if (!isUrl(url)) { await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento, el enlace que enviaste es invalido_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                await client.sendImageAsSticker(from, await client.download(url), { keepScale: true, crop: false,  pack: 'VIP Stickers', author: 'KaytBot', }).then((r) => (!r && r !== undefined)
                    ? client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento, el enlace que enviaste no contiene una imagen._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    : client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Las imagenes .webp no son soportadas por el comando ${prefix}urlstickerp*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`), id)
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una *imagen* o *GIF* directamente desde su direccion web (URL) en *sticker* o *sticker animado* envía un mensaje con el siguiente formato: *${prefix}sturlp + URL de la imagen o GIF*_\n\n_*Ejemplo:*_ ${prefix}sturlp https://yt3.ggpht.com/ytc/AAUvwnjnQZFdRkEOYQSre0irbDafA1uYeNs7o9F4Etml=s900-c-k-c0x00ffffff-no-rj\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stgif':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if ((isMedia || isQuotedVideo) && args.length === 0) {
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.sendMp4AsSticker(from, imageBase64, { fps: 15, keepScale:false, crop:true }, { author: 'KaytBot', pack: 'Vip Stickers' })
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                }else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *video* o *GIF* en un *sticker animado* por favor envía o etiqueta el *video* o *GIF* que deseas convertir con el comando ☛${prefix}stgif_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n*❍⌇─➭ Recomendaciones:*\n\n_1. El *video* o *GIF* no debe superar los 10 segundos de duración._\n_2. El *video* o *GIF* debe tener un peso máximo de 1MB._\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n_2. Los stickers animados creados con esta opcion saldran recortados al centro, si son GIFS muy altos o muy anchos solo saldra el centro de la animación_\n_3. Si deseas convertir stickers sin recorte alguno usa el siguiente comando *${prefix}stgif2*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stgif2':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (isMedia || isQuotedVideo && args.length === 0) {
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    var mediaData = await decryptMedia(encryptMedia, uaOverride)
                    var filename = `./media/stickergif.${_mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`, { author: 'KaytBot', pack: 'BotStickers'})
                        .then(() => {
                            client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                        })
                        .catch((err) => {
                            console.error(err)
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })                
                    })
                    } else {
                        client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *video* o *GIF* en un *sticker animado* por favor envía o etiqueta el *video* o *GIF* que deseas convertir con el comando ☛${prefix}stgif2_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n*❍⌇─➭ Recomendaciones:*\n\n_1. El *video* o *GIF* no debe superar los 10 segundos de duración._\n_2. El *video* o *GIF* debe tener un peso máximo de 1MB._\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n_2. Los stickers animados creados con esta opcion si son GIFS muy altos o muy anchos saldran ajustados a un formato cuadrado._\n_3. Si deseas convertir stickers sin deformaciones usa el siguiente comando *${prefix}stgif*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    }
                break
            case 'stgifp':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if ((isMedia || isQuotedVideo) && args.length === 0) {
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    client.sendMp4AsSticker(from, imageBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0, crop: false }, { author: 'KaytBot', pack: 'Vip Stickers' }).then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        console.error(err)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                }else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *video* o *GIF* en un *sticker animado* por favor envía o etiqueta el *video* o *GIF* que deseas convertir con el comando ☛${prefix}stgifp_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n*❍⌇─➭ Recomendaciones:*\n\n_1. El *video* o *GIF* no debe superar los 10 segundos de duración._\n_2. El *video* o *GIF* debe tener un peso máximo de 1MB._\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *${prefix}menu stickers*_\n_2. Los stickers animados creados con esta opcion saldran perfectamente centrados, si son GIFS muy altos o muy anchos saldran ajustados hacia el centro de la animacion sin recortes ni deformaciones._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stgiphy':
                case 'stgiphy':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length !== 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *GIF* desde la pagina web de *https://giphy.com/* en  *sticker animado* envía un mensaje con el siguiente formato: *${prefix}stgiphy + url de la animacion*_\n\n_*Ejemplo:*_ ${prefix}stgiphy https://media.giphy.com/media/XDA6l4FnxBa7nND4uc/giphy.gif\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                if (isGiphy) {
                    const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                    if (!getGiphyCode) { return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, no se pudo recuperar el codigo giphy!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                    const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                    const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                    client.sendGiphyAsSticker(from, smallGifUrl, { author: 'KaytBot', pack: 'BotStickers'}).then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    }).catch((err) => console.log(err))
                } else if (isMediaGiphy) {
                    const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                    if (!gifUrl) { return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, no se pudo recuperar el codigo giphy!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                    const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                    client.sendGiphyAsSticker(from, smallGifUrl, { author: 'KaytBot', pack: 'BotStickers'})
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                } else {
                    await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, el comando *giphy* solo puede usar enlaces de *giphy* !_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                }
                break
            case 'stgiphyp':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length !== 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *GIF* desde la pagina web de *https://giphy.com/* en  *sticker animado* envía un mensaje con el siguiente formato: *${prefix}stgiphyp + url de la animacion*_\n\n_*Ejemplo:*_ ${prefix}stgiphyp https://media.giphy.com/media/XDA6l4FnxBa7nND4uc/giphy.gif\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const isGiphyp = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                const isMediaGiphyp = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                if (isGiphyp) {
                    const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                    if (!getGiphyCode) { return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, no se pudo recuperar el codigo giphy!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                    const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                    const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                    client.sendGiphyAsSticker(from, smallGifUrl, {crop: false, author: 'KaytBot', pack: 'Vip Stickers'}).then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    }).catch((err) => console.log(err))
                } else if (isMediaGiphyp) {
                    const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                    if (!gifUrl) { return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, no se pudo recuperar el codigo giphy!_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id) }
                    const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                    client.sendGiphyAsSticker(from, smallGifUrl, {crop: false, author: 'KaytBot', pack: 'Vip Stickers'})
                    .then(() => {
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                    })
                    .catch((err) => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                    } else {
                    await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_¡Error, el comando *giphy* solo puede usar enlaces de *giphy* !_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                    }
                break
            case 'stnobg':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isOwnerBot) return client.reply(from, alert.owner, id)
                    if (isMedia || isQuotedImage) {
                        try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        const base64img = imageBase64
                        const outFile = './media/noBg.png'
                        const result = await removeBackgroundFromImageBase64({ base64img, apiKey: apiNoBg, size: 'auto', type: 'auto', outFile })
                        await fs.writeFile(outFile, result.base64img)
                        await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        client.reply(from, `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                        console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                        } catch(err) {
                        console.log(err)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_Por favor envía una imagen para convertirla en sticker sin fondo._', id)
                        }
                }else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una imagen en un sticker sin fondo por favor envía la imagen que deseas convertir con el siguiente comando: *${prefix}stnobg*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stautor':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas cambiar los metadatos de un sticker por favor etiqueta el sticker que deseas cambiar con el siguiente mensaje: *${prefix}stautor pack | autor*_\n\nRecomendaciones: recuerda colocar correctamente la linea vertical | para evitar errores en el procesamiento.\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (args >= 2) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Error el formato del mensaje es incorrecto, recuerda que el formato correcto es: *${prefix}stautor pack | autor*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const paquete = arg.split('|')[0]
                const autor = arg.split('|')[1]
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        const mediaData = await decryptMedia(quotedMsg)
                        client.reply(from, alert.process, id)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        client.sendImageAsSticker(from, imageBase64, { keepScale: true,pack: `${paquete}` , author: `${autor}`})
                        .then(() => {
                            console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                        })
                        .catch(() => {
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n _Por favor etiqueta un sticker para cambiarle los metadatos_', id)
                            })
                    } else {
                        await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_‼️Si deseas convertir un *sticker* en una *imagen* por favor etiqueta el *sticker* que deseas convertir con el comando: ☛${prefix}stimg_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    }
                break
            case 'stext':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                const usermsg = (body.slice(9))
                const dataStik = (usermsg.replace(/ /g, "%5Cn"))
                if (args.length == 0) return client.reply(from, `⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆\n_Si deseas convertir un texto en un sticker con estilos de letras super geniales envía un mensaje con el siguiente formato: *${prefix}stext + num de efecto + texto* (máx cinco palabras)._\n\n_Ejemplo: *${prefix}stext 1 Andrew*_\n⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆\n\n*❍⌇─➭ Lista de efectos:*\n*╭───♡Free♡───╮*\n*┣①* ➻ _white_\n*╰───♡───♡───╯*\n*╭───☆VIP☆───╮*\n*┣②* ➻ _wroom_\n*┣③* ➻ _3D_\n*┣④* ➻ _water_\n*┣⑤* ➻ _blackbird_\n*┣⑥* ➻ _smurf_\n*╰───☆─☆─☆──╯*\n*╭─☆VIP  GIFS☆─╮*\n*┣⑦* ➻ _memories_\n*┣⑧* ➻ _Neon_\n*╰──☆─••••─☆──╯*\n⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆`, id)
                //if (args.length >= 7) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento no puedo procesar tu solicitud debido a que has superado el límite de palabras, el límite máximo es de 5 palabras._\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (dataStik === '') return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n*Formato Incorrecto*\n_Por favor especifica el numero del efecto que quieres usar y el texto:_\n\n_Ejemplo: *#stext 1 Andrew*_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (args[0] == '1'){
                    client.reply(from, alert.process, id)
                    const ttpp = await axios.get(`https://st4rz.herokuapp.com/api/ttp?kata=${encodeURIComponent(usermsg)}`)
                    const ttpr = ttpp.res.data.result
                    await client.sendImageAsSticker(from, `${ttpr}`, { keepScale: true, pack: 'Bot Stickers', author: 'KaytBot', })
                    await client.reply(from, `${alert.processed} _${processTime(t, moment())} segundos_`, id)
                } else if (args[0] == '2'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/wroom?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t1.png`, buffer)
                        var png = await fs.readFileSync('./media/t1.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        await client.reply(from, alert.processed, id)
                } else if (args[0] == '3'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/text3d?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t2.png`, buffer)
                        var png = await fs.readFileSync('./media/t2.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        await client.reply(from, alert.processed, id)
                } else if (args[0] == '4'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/water?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t3.png`, buffer)
                        var png = await fs.readFileSync('./media/t3.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        await client.reply(from, alert.processed, id)
                } else if (args[0] == '5'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/blackbird?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t4.png`, buffer)
                        var png = await fs.readFileSync('./media/t4.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                            await client.reply(from, alert.processed, id)
                } else if (args[0] == '6'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/smurf?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t5.png`, buffer)
                        var png = await fs.readFileSync('./media/t5.png', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/png;base64,${png.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        await client.reply(from, alert.processed, id)
                } else if (args[0] == '7'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                        client.reply(from, alert.process, id)
                        const responses = await fetch(`https://api.clientz.my.id/api/flamingtext/memories?text=${encodeURIComponent(dataStik)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/t6.gif`, buffer)
                        var gif = await fs.readFileSync('./media/t6.gif', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`, { keepScale: true, author: 'KaytBot', pack: 'VIP Stickers'})
                        await client.reply(from, alert.processed, id)
                }else if (args[0] == '8'){
                    if (!isVip) return client.reply(from, alert.vips, id)
                    client.reply(from, alert.process, id)
                    const ttpc = await axios.get(`https://api.xteam.xyz/attp?text=${encodeURIComponent(usermsg)}`)
                    const attp = ttpc.data.result
                    await client.sendImageAsSticker(from, `${attp}`, { keepScale: true, pack: 'Bot Stickers', author: 'KaytBot', })
                    await client.reply(from, alert.processed, id)
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n*Formato Incorrecto*\n_Por favor especifica el numero del efecto que quieres usar y el texto:_\n\n_Ejemplo: *#stext 1 Andrew*_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stimg':
                case 'toimg':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaData = await decryptMedia(quotedMsg)
                    client.reply(from, alert.process, id)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendFile(from, imageBase64, 'imgsticker.jpg', `${alert.processed}\n_${processTime(t, moment())} segundos_`, id)
                    .then(() => {
                        console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n _Por favor etiqueta un sticker para convertirlo en imagen_', id)
                    })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir un *sticker* en una *imagen* por favor etiqueta el *sticker* que deseas convertir con el comando: *☛${prefix}stimg*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Notas importantes:*\n_1. Si deseas conocer todos los comandos relacionados con *stickers* envía el comando *♫menu stickers*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'stmeme':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if ((isMedia || isQuotedImage) && args.length >= 2) {
                    const top = arg.split('|')[0]
                    const bottom = arg.split('|')[1]
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, false)
                    const ImageBase64 = await meme.custom(getUrl, top, bottom)
                    client.sendImageAsSticker(from, ImageBase64,{ keepScale: true, author: 'KAYT Bot', pack: 'Vip Stickers'})
                        .then(() => {
                            client.reply(from, '_✅Sticker Meme finalizado_',id)
                        })
                        .catch(() => {
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas crear un meme directamente en sticker responde a una imagen enviada anteriormente o envía una imagen desde tu galeria adjuntando un mensaje con el siguiente formato: *${prefix}stmeme texto superior | texto inferior*_\n\n_Ejemplo: *(imagen de galeria o imagen etiquetada)${prefix}stmeme ahorita no joven|estoy ocupado*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1.Recuerda colocar correctamente el símbolo ➡️_ |\n_2. Evita colocar signos de puntuacion, tildes, emojis, etc, solo coloca texto comun y corriente para evitar errores._\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break

            //COMANDOS
            case 'ipinfo':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length !== 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧GP✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar información acerca de una dirección IP por favor envía un mensaje con el siguiente fotmato: *${prefix}ipinfo + dirección IP (pública).*_\n\n_Ejemplo: *${prefix}ipinfo 104.96.172.201*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                client.reply(from, alert.process, id)
                const cekip = body.slice(9)
                console.log(cekip)
                    try {
                        const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
                        const {city, continent_code, continent_name, country_code, country_name, ip, latitude, location, longitude, region_code,region_name, type, zip} = cekip2.data
                        const cekip3 = `*⋆⋅⋅⋅⊱∘───[✧IP✧]───∘⊰⋅⋅⋅⋆*\n_*Direccion IP Encontrada*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*╭─IP:* _${ip}, ${type}_\n*├─Continente:* _${continent_name}, ${continent_code}_\n*├─Pais:* _${country_name}, ${country_code}_\n*├─Región:* _${region_name}, ${region_code}_\n*├─Ciudad:* _${city}_\n*├─Latitud:* ${latitude}\n*├─Longitud:* ${longitude}\n*╰─Codigo postal:* _${zip}_ \n\n_*❍⌇─➭Ubicación:*_\n*╭─Codigo de area:* _+${location.calling_code}_\n*├─Capital:* _${location.capital}_\n*├─Bandera:* _${decodeURIComponent(location.country_flag_emoji)}_\n*├─Idiomas:* _${location.languages[0].name}, ${location.languages[0].code}_\n*├──Nativo:* _${location.languages[0].native}_\n*╰─GeonameId:* _${location.geoname_id}_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
                        client.sendFileFromUrl(from, location.country_flag, city, cekip3)
                    } catch (err) {
                        console.error(err.message)
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                break
            case 'ubicacion':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas enviar la ubicacion exacta ingresando las coordenadas, envia un mensaje con el siguiente comando: ${prefix}ubicacion latitud | longitud | nombre de ciudad_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const locate = body.trim().split('|')
                    if (locate.length >= 3) {
                        client.reply(from, alert.process, id)
                        try {
                            const lat = arg.split('|') [0]
                            const long = arg.split('|') [1]
                            const city = arg.split('|') [2]
                            await client.sendLocation(chatId, lat, long, `${city}`)
                        } catch {
                            console.log(err)
                        }
                    }
                break

            //OTROS COMANDOS
            case 'espiar':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!quotedMsg){
                    await client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Por favor etiqueta a la persona que quieres espiar_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                }else {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePict = await client.getProfilePicFromServer(getQuoted)
                    const usernames = quotedMsgObj.sender.name
                    const statuss = await client.getStatus(getQuoted)
                    const baned = banned.includes(getQuoted) ? '✅' : '❌'
                    const admi = groupAdmins.includes(getQuoted) ? '✅' : '❌'
                    const vips = isVip ? '✅' : '❌'
                    const { statusr } = statuss
                    if (profilePict === undefined) {
                        var profile = errorurl
                    } else {
                        var profile = profilePict
                    }
                    await client.sendFileFromUrl(from, profile, `${usernames}.jpg`, `*⋆⋅⋅⋅⊱∘──[✧INFO✧]──∘⊰⋅⋅⋅⋆*\n\n*•─Nombre*: ${usernames}\n*╭─Admin*: ${admi}\n*├─VIP*: ${vips}\n*├─Baneado*: ${baned}\n*╰─Info*: ${statusr}\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
             break
            case 'wa.me':
                case 'wame':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                await client.reply(from, `_Este es tu enlace a tu numero de whatsapp_ *${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*tambien puedes usar*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`, id)
                break
            case 'repite':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                const rep = body.slice(8)
                client.sendText(from, `${rep}`, id)
                break
            case 'desarrollador':
                await client.sendContact(from, `573228125090@c.us`)
                .then(() => client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n          *Si deseas:*\n*┏─* _Contratar el servicio_\n*┣─* _Informar un error_\n*┗─* _Solicitar una función adicional_\n*Contáctate con el desarrollador*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id))
                break
            case 'creador':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                    const Owner_ = chat.groupMetadata.owner
                    await client.sendTextWithMentions(from, `Creador del grupo : @${Owner_}`)
                break


            //ANIME
            case 'yamete':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                client.sendPtt(from, './media/yamete/yamete.mp3', id)
                break
            case 'oniichan':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                const onii = ['./media/oniichan/oniichan1.mp3','./media/oniichan/oniichan2.mp3','./media/oniichan/oniichan3.mp3','./media/oniichan/oniichan4.mp3','./media/oniichan/oniichan5.mp3','./media/oniichan/oniichan6.mp3','./media/oniichan/oniichan7.mp3','./media/oniichan/oniichan8.mp3','./media/oniichan/oniichan9.mp3','./media/oniichan/oniichan10.mp3','./media/oniichan/oniichan11.mp3','./media/oniichan/oniichan12.mp3','./media/oniichan/oniichan13.mp3','./media/oniichan/oniichan14.mp3','./media/oniichan/oniichan15.mp3','./media/oniichan/oniichan16.mp3','./media/oniichan/oniichan17.mp3','./media/oniichan/oniichan18.mp3','./media/oniichan/oniichan19.mp3','./media/oniichan/oniichan20.mp3','./media/oniichan/oniichan21.mp3','./media/oniichan/oniichan22.mp3','./media/oniichan/oniichan23.mp3','./media/oniichan/oniichan24.mp3','./media/oniichan/oniichan25.mp3','./media/oniichan/oniichan26.mp3','./media/oniichan/oniichan27.mp3',]
                let oniirand = onii[Math.floor(Math.random() * onii.length)]
                client.sendPtt(from, oniirand, id)
                break
            case 'dewabatch':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `Para buscar un anime en dewabatch escriba ${prefix}dewabatch judul\n\nContoh: ${prefix}dewabatch naruto`, id)
                kaytApi.dewabatch(args[0])
                .then(async(res) => {
                    await client.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
                })
                break
            case 'whatanime':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from, 'Estoy buscando en los servidores por favor espera....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        client.reply(from, 'Lo siento, no se que anime es este, asegúrese de que la imagen que se buscano esta borrosa / cortada', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Tengo poca fe en que sea lo que buscas* :\n\n'
                    }
                    teks += `➸ *Titulo en Japones* : ${title}\n➸ *Titulo en chino* : ${title_chinese}\n➸ *Titulo en Romaji* : ${title_romaji}\n➸ *Titulo en Ingles* : ${title_english}\n`
                    teks += `➸ *+18?* : ${is_adult}\n`
                    teks += `➸ *Episodios* : ${episode.toString()}\n`
                    teks += `➸ *Semejanza* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'anime.mp4', teks, id)
                    .catch(() => {
                        client.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                } else {
                    client.reply(from, `Lo siento, el formato es incorrecto\n\nEnvíe una foto con el título ${prefix}whatanime\n\nO responde a las fotos con subtítulos ${prefix}whatanime`, id)
                }
                break
            case 'waifu':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/clientZ/grabbed-results/main/random/anime/waifu.txt')
                .then(res => res.text())
                    .then(body => {
                        let randomnime = body.split('\n')
                        let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                        client.sendFileFromUrl(from, randomnimex, '', alert.searched, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                    })
                break
            case 'neko':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/clientZ/grabbed-results/main/random/anime/neko.txt')
                .then(res => res.text())
                    .then(body => {
                        let randomnime = body.split('\n')
                        let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                        client.sendFileFromUrl(from, randomnimex, '', alert.searched, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                    })
                break
            case 'husbu':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/clientZ/grabbed-results/main/random/anime/husbu.txt')
                .then(res => res.text())
                    .then(body => {
                        let randomnime = body.split('\n')
                        let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                        client.sendFileFromUrl(from, randomnimex, '', alert.searched, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                    })
                break
            case 'random':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/clientZ/grabbed-results/main/random/anime/random.txt')
                .then(res => res.text())
                    .then(body => {
                        let randomnime = body.split('\n')
                        let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                        client.sendFileFromUrl(from, randomnimex, '', alert.searched, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                    })
                break

            //USUARIOS
            case 'adminlist':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)
                let mimin = '*┏⋆⋅⋅⋅⊱∘──[✧Admins✧]──∘⊰⋅⋅⋅⋆*\n'
                for (let admon of groupAdmins) {
                    mimin += `*┣➻*  @${admon.replace(/@c.us/g, '')}\n` 
                }
                mimin += '*┗⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*'
                await client.sendTextWithMentions(from, mimin)
                break
            case 'infogrupo':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                var totalMem = chat.groupMetadata.participants.length
                var desc = chat.groupMetadata.desc
                var groupnama = name
                var welgrp = bienvenida.includes(chatId)? '✅' : '❌'
                var simigrp = simi.includes(chatId)? '✅' : '❌'
                var nsfwgrp = nsfw.includes(chatId)? '✅' : '❌'
                var antlink = antienlaces.includes(chatId)? '✅' : '❌'
                var cerlink = ceroenlaces.includes(chatId)? '✅' : '❌'
                var antvirus = antivirus.includes(chatId)? '✅' : '❌'
                var autstick = autostickers.includes(chatId)? '✅' : '❌'
                var grouppic = await client.getProfilePicFromServer(chatId)
                if (grouppic == undefined) {
                     var pfp = errorurl
                } else {
                     var pfp = grouppic 
                }
                await client.sendFileFromUrl(from, pfp, 'group.png', `*⋆⋅⋅⋅⊱∘───[✧GP✧]───∘⊰⋅⋅⋅⋆*\n_*Información del grupo.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*•─Nombre:* _${groupnama}_\n*╭─Miembros:* _${totalMem}_\n*├─Bienvenida:* _${welgrp}_\n*├─NSFW:* _${nsfwgrp}_\n*├─SimSimi:* _${simigrp}_\n*├─Antienlaces:* _${antlink}_\n*├─Ceroenlaces:* _${cerlink}_\n*├─Autostickers:* _${autstick}_\n*├─Antivirus:* _${antvirus}_\n*╰─Descripción:* _${desc}_ \n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`)
                break
            case 'icono':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                var grouppic = await client.getProfilePicFromServer(chatId)
                var gp = grouppic 
                await client.sendFileFromUrl(from, gp, 'group.png', '_Aquí esta el icono de este grupo._', id)
                break
            case "nombre":
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                client.reply(from, `_*${name}*_`, id);
                break
            case 'reglas':
                case 'normas':
                case 'descripcion':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isBotGroupAdmins) return client.reply(from, alert.adminBot, id)           
                const det = await client.getChatById(groupId)
                const groupname = det.contact.formattedName 
                const deskripsi = det.groupMetadata.desc
                await client.reply(from, `*⋆⋅⋅⋅⊱∘─[✧REGLAS✧]─∘⊰⋅⋅⋅⋆*\n\n*┏─Nombre del grupo:* _${groupname}_\n*┗─Descripción:* _${deskripsi}_\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'estadisticas':
                case 'estadísticas':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                const loadedMsg = await client.getAmountOfLoadedMessages()
                const chatIds = await client.getAllChatIds()
                const groups = await client.getAllGroups()
                const blok = await client.getBlockedIds()
                client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*『••••[📊KaytBot]••••』*\n*╭───────────────╮*\n*┣─${loadedMsg}* _Mensajes Cargados_\n*┣─${groups.length}* _Chats Grupales_\n*┣─${chatIds.length - groups.length}* _Chats Privados_\n*┣─${chatIds.length}* _Chats Totales_\n*┃*\n*┣─${blok.length}* _Chats Bloqueados_\n*╰───────────────╯*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break


            case 'kpop':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar imagenes acerca de tu grupo kpop favorito por favor envia un mensaje con el siguiente formato: *${prefix}kpop + consulta*_\n_Ejemplo: *${prefix}kpop bts*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_Consultas dosponibles:_\n*╭─blackpink*\n*├─exo*\n*╰─bts*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                    fetch('https://raw.githubusercontent.com/clientZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                    .then(res => res.text())
                    .then(body => {
                        let randomkpop = body.split('\n')
                        let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                        client.sendFileFromUrl(from, randomkpopx, '', alert.searched, id)
                    })
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                    })
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento tu consulta no esta disponile.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_Consultas dosponibles:_\n*╭─blackpink*\n*├─exo*\n*╰─bts*\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'memes':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                const randmeme = await meme.random()
                client.sendFileFromUrl(from, randmeme, '', '', id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                })
                break
            case 'imagenes':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar una imagen en los servidores de *Pinterest* envía un comando con el siguiente formato: *${prefix}pinterest + imagen que buscas*._\n\n_Ejemplo: *${prefix}imagenes naruto*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. No solicitar varias imágenes seguidas ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const cariwall = body.slice(8)
                const hasilwall = await images.fdci(cariwall)
                await client.sendFileFromUrl(from, hasilwall, '', '', id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'sreddit':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar una imagen en los subs de *Reddit* envía un comando con el siguiente formato: *${prefix}sreddit + subreddit*  para ver la lista de subs puedes visitar la siguiente pagina web:_ http://redditlist.com/\n\n_Ejemplo: *${prefix}sreddit naruto*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. No solicitar varias imágenes seguidas ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const carireddit = body.slice(9)
                const hasilreddit = await images.sreddit(carireddit)
                await client.sendFileFromUrl(from, hasilreddit, '', '', id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', `_¡Houston, tenemos un problema!_\n\n_Esto puede ser por que escribiste mal el comando o escribiste mal el subreddit, para ver la lista de subreddits visita la siguiente pagina web:_ http://redditlist.com`, id)
                })
                break
            case 'hentai':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isNsfw) return client.reply(from, alert.nsfw, id)
                const hentai = await meme.hentai()
                client.sendFileFromUrl(from, hentai.url, '', hentai.title, id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                })
                break
            case 'yuri':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isNsfw) return client.reply(from, alert.nsfw, id)
                const yuri = await axios.get (`https://meme-api.herokuapp.com/gimme/yuri`)
                client.sendFileFromUrl(from, yuri.data.url, '', yuri.data.title, id)
                break
            case 'yaoi':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isNsfw) return client.reply(from, alert.nsfw, id)
                const yaoi = await axios.get (`https://meme-api.herokuapp.com/gimme/yaoi`)
                client.sendFileFromUrl(from, yaoi.data.url, '', yaoi.data.title, id)
                break
            case 'ecchi':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isNsfw) return client.reply(from, alert.nsfw, id)
                const ecchi = await axios.get (`https://meme-api.herokuapp.com/gimme/ecchi`)
                client.sendFileFromUrl(from, ecchi.data.url, '', ecchi.data.title, id)
                break


            //HERRAMIENTAS
            case 'tts':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas escuchar un texto en el idioma que tu desees, envía un mensaje con el siguiente formato: *${prefix}tts + código de idioma + texto*_\n\n_Ejemplo: *${prefix}tts es Hola soy KAYT Bot en que puedo ayudarte?*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_Para ver la lista de idiomas disponibles para escuchar por favor envía el comando *#listatts*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                const ttsGB = require('node-gtts')(args[0])
                const dataText = body.slice(8)
                    if (dataText === '') return client.reply(from, '_*❍⌇─➭Cual es el texto que quieres escuchar?*_', id)
                    try {
                        ttsGB.save('./media/tts.mp3', dataText, function () {
                        client.sendPtt(from, './media/tts.mp3', id)
                        })
                    } catch (err) {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                break
            case 'traductor':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas traducir un texto a tu idioma deseado envía un mensaje con el siguiente formato: *#traductor + código de idioma + texto*_\n\n_Ejemplo: *#traductor es Hi mi name is Andrew*_\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n *❍⌇─➭ Recomendaciones:*\nSi deseas conocer los códigos de idioma por favor escribe el comando *#idiomas*\n *⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                const lang = args[0]
                const texto = body.slice(14)
                if (texto === '') return client.reply(from, '_*❍⌇─➭Cual es el texto que quieres traducir?*_', id)
                axios.get(`https://api.clientZ.my.id/api/edu/translate?lang=${lang}&text=${encodeURIComponent(texto)}`)
               .then(async (res) => {
                        await client.reply(from, `${res.data.text}`, id)
                    })
               .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema! no he podido contactar con el servidor, por favor intentalo mas tarde_', id)
                    })
                break
            case 'traducir':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length != 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas traducir un texto enviado anteriormente por favor etiqueta el mensaje con el siguiente comando: *#traducir + código de idioma*_\n\n_Ejemplo: *#traducir es*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n *❍⌇─➭ Recomendaciones:*\n_Para ver la lista de idiomas disponibles para traducir por favor envía el comando *#idiomas*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (!quotedMsg) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Por favor etiqueta el mensaje que quieres traducir con el siguiente comando: *#traducir + código de idioma*_ \n\n_Ejemplo: *#traducir es*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_Para ver la lista de idiomas disponibles para traducir por favor envía el comando *#idiomas*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const language = args[0]
                axios.get(`https://api.clientZ.my.id/api/edu/translate?lang=${language}&text=${encodeURIComponent(quoteText)}`)
                .then(async (res) => {
                        await client.reply(from, `${res.data.text}`, id)
                    })
               .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                break
            case 'pregunta':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length >= 2){
                    const BrainlySearch = require('./lib/brainly')
                    let tanya = body.slice(9)
                    let jum = Number(tanya.split('|')[1]) || 1
                    if (jum > 10) return client.reply(from, 'Max 10!', id)
                    if (Number(tanya[tanya.length-1])){
                        tanya
                    }
                    client.reply(from, `➸ *Tu pregunta* : ${tanya.split('|')[0]}\n➸ *Número de respuestas* : ${Number(jum)}`, id)
                    await BrainlySearch(tanya.split('|')[0],Number(jum), function(res){
                        res.forEach(x=>{
                            if (x.jawaban.fotoJawaban.length == 0) {
                                client.reply(from, `➸ *Pregunta encontrada:* ${x.pertanyaan}\n➸ *Respuesta:* ${x.jawaban.judulJawaban.replace('Respuesta:','').replace('Explicación:','\n➸ *Explicacion:* ').replace('Explicación paso a paso:','\n\n➸ *Explicación paso a paso:* ')}\n`, id)
                            } else {
                                client.reply(from, `➸ *Pregunta encontrada:* ${x.pertanyaan}\n➸ *Respuesta:* ${x.jawaban.judulJawaban.replace('Respuesta:','').replace('Explicación:','\n➸ *Explicacion:* ').replace('Explicación paso a paso:','\n\n➸ *Explicación paso a paso:* ')}\n\n➸ *Foto demsotrativa* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                            }
                        })
                    })
                } else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas busca cualquier pregunta acerca de tus tareas escolares envia un mensaje con el siguiente formato: *${prefix}pregunta + pregunta | numero de respuestas*_\n\n_Ejemplo: *${prefix}pregunta Cual es la distancia de la tierra alsol? | 2*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'acortador':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si desas acortar un enlace envia un mensaje con el siguiente formato: *${prefix}acortador + link a acortar*_\n\n_❍⌇─➭Ejemplo:_ ${prefix}acortador https://www.youtube.com/c/AndrewTutoriales\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (!isUrl(args[0])) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧MF✧]───∘⊰⋅⋅⋅⋆*\n_Formato incorrecto, por favor envía un enlace valido._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                const shortlink = await shortener(args[0])
                await client.reply(from, shortlink, id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'moddroid':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Para buscar una aplicacion o juego en la pagina de *MODDROID* por favor envía un mensaje con el siguiente formato: *${prefix}moddroid + busqueda*_ \n\n_Ejemplo: *${prefix}moddroid pou*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                try {
                    const moddroid = await axios.get('https://tobz-api.herokuapp.com/api/moddroid?q=' + body.slice(10)  + '&apikey=BotWeA')
                    if (moddroid.data.error) client.sendFile(from, `./media/error404.jpg`, '', `_¡Houston, tenemos un problema!_\n\n_No hemos encontrado tu aplicacion *${body.slice(10)}* en los servidores de *ModDroid.*_`, id)
                    const modo = moddroid.data.result[0]
                    const resmod = `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n❍⌇─➭Aplicacion encontrada:_\n\n*•─•Titulo:* ${modo.title}\n*╭─•Publicador:* ${modo.publisher}\n*├─•Tamaño:* ${modo.size}\n*╰─•Info del Mod:* ${modo.mod_info}\n*╭─•Versión:* ${modo.latest_version}\n*├─•Genero:* ${modo.genre}\n*╰─•Enlace:* ${modo.link}\n*•─•Link de descarga:* ${modo.download}\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆* `
                    client.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                }
                break
            case 'happymod':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Para buscar una aplicacion o juego en la pagina de *HAPPYMOD* por favor envía un mensaje con el siguiente formato: *${prefix}happymod + busqueda*_ \n\n_Ejemplo: *${prefix}happymod pou*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                try {
                    const happymod = await axios.get('https://tobz-api.herokuapp.com/api/happymod?q=' + body.slice(10)  + '&apikey=BotWeA')
                    if (happymod.data.error) return client.sendFile(from, `./media/error404.jpg`, '', `_¡Houston, tenemos un problema!_\n\n_No hemos encontrado tu aplicacion *${body.slice(10)}* en los servidores de *HappyMod.*_`, id)
                    const modo = happymod.data.result[0]
                    const resmod = `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n❍⌇─➭Aplicacion encontrada:_\n\n*•─•Titulo:* ${modo.title}\n*╭─•Pago:* ${modo.purchase}\n*├─•Tamaño:* ${modo.size}\n*├─•Root:* ${modo.root}\n*├─•Version:* ${modo.version}\n*├─•Precio:* ${modo.price}\n*╰─•Enlace:* ${modo.link}\n*•─•Link de descarga:* ${modo.download}\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆* `
                    client.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                }
                break
            case 'clima':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_‼️Para usar el comando *${prefix}clima*_ \n_Envía un mensaje con el comando *${prefix}clima <nombre de tu ciudad>*_\n\n_❍⌇─➭Ejemplo: *${prefix}clima bogota*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. No colocar tildes en los nombres de las ciudades._\n_2. No colocar nombres de países._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const cuacaq = body.slice(7)
                const cuacap = await kaytApi.cuaca(`${encodeURIComponent(cuacaq)}`)
                await client.reply(from, cuacap, id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'letra':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Si deseas buscar la letra de una canción envía un mensaje con el siguiente formato: *${prefix}letra + titulo de la canción*_\n\n*_❍⌇─➭Ejemplo:_*\n\n_*${prefix}letra shape of you*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const lirik = await axios.get(`https://scrap.terhambar.com/lirik?word=${body.slice(7)}`)
                const lirikr = lirik.data.result.lirik
                    await client.reply(from, `Letra de la canción: ${body.slice(7)}\n\n${lirikr}`, id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'acordes':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                client.reply(from,'_Funcion en mantenimiento_',  id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Si deseas buscar la letra y los acordes de una canción envía un mensaje con el siguente formato: *${prefix}acordes + titulo de la canción*_\n\n*_❍⌇─➭Ejemplo: *${prefix}acordes shape of you*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const chordq = body.slice(7)
                const chordp = await kaytApi.chord(chordq)
                await client.reply(from, chordp.replace("Lirik Lagu & Chord","").replace("Capo di fret",`_*Capo en el traste #*_` ).replace("[❗] Maaf chord yang anda cari tidak dapat saya temukan!",`_[❗] ¡Lo siento, no puedo encontrar los acordes de la cancion: *${body.slice(9)}*_`), id)
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'lectorqr':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length !== 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧QR✧]───∘⊰⋅⋅⋅⋆*\n_Para leer un código QR envía un mensaje con el siguiente formato: *${prefix}lectorQR + link de la imagen QR*_\n\n_Ejemplo:_ ${prefix}lectorQR https://i.ibb.co/BtwBMZp/eb58be07-891a-463f-8b21-7ae9c7c7ea14.jpg\n\n_💡Nota Importante: Si tienes un código QR Almacenado en tu dispositivo primero sube la imagen a la siguiente pagina web https://es.imgbb.com/ y copia la URL de la imagen_ \n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                client.reply(from, alert.process, id);
                kaytApi.qrread(args[0])
                .then(async (res) => {
                await client.reply(from, `${res}`, id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema_\n\n_El enlace que has enviado es incorrecto o no contiene ningun codigo QR, por favor envía un enlace que contenga una imagen con un codigo QR legible._', id)
                })
                break
            case 'generarqr':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length !== 2) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧QR✧]───∘⊰⋅⋅⋅⋆*\n_Para convertir cualquier link en un código QR envía un mensaje con el siguiente formato: *${prefix}generarQR + URL + tamaño*_\n\n_Ejemplo:_ ${prefix}generarQR https://chat.whatsapp.com/HnBHOUMywe3AkSekhgvDv5 300\n\n_💡Nota importante: tamaño mínimo 100 & tamaño máximo 500_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (!isUrl(args[0])) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧QR✧]───∘⊰⋅⋅⋅⋆*\n_Formato incorrecto, por favor envía un enlace valido._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                client.reply(from, alert.process, id);
                kaytApi.qrcode(args[0], args[1])
                .then(async (res) => {
                await client.sendFileFromUrl(from, `${res}`,'',alert.processed, id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema_\n_Se ha producido un error al generar su codigo QR_', id)
                })
                break
            case 'mediafire':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧MF✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar un archivo de mediafire por favor envía un mensaje con el siguiente formato: *${prefix}mediafire + link de archivo ejemplo*_\n\n_Ejemplo:_ ${prefix}mediafire https://www.mediafire.com/file/i6u3fweaos15yip/MediaFire_-_Getting_Started.pdf/file\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (!isUrl(args[0])) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧MF✧]───∘⊰⋅⋅⋅⋆*\n_Formato incorrecto, por favor envía un enlace valido._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                let linkmedia = body.slice(11)
                let islinkm = linkmedia.match(/www.mediafire.com/)
                if (!islinkm) return client.reply(from, '*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Lo siento el enlace que has enviado es incorrecto, por favor verificalo e intenta nuevamente._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*', id)
                try {
                    const mediafire = await axios.get('https://tobz-api.herokuapp.com/api/mediafire?url='+body.slice(11)+'&apikey=BotWeA')
                    if (mediafire.data.error) client.sendFile(from, `./media/error404.jpg`, '', `_¡Houston, tenemos un problema!_\n\n_No hemos encontrar tu archivo en los servidores de *MediaFire.* por favor verifica que el link es correcto e intentalo de nuevo._`, id)
                    const mfire = mediafire.data.result[0]
                    client.reply(from,`*⋆⋅⋅⋅⊱∘───[✧MF✧]───∘⊰⋅⋅⋅⋆*\n_*Archivo encontrado*_\n\n*╭─Titulo:* _${mfire.title}_\n*┣─Tamaño:* _${mfire.filesize}_\n*╰─Extensión:* _${mfire.extension}_\n\n_Por favor ten paciencia el archivo se esta enviando._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    client.sendFileFromUrl(from, mfire.download,`${mfire.title}`, '', id)
                } catch {
                    await client.sendFile(from, `./media/error404.jpg`, '', `_¡Houston, tenemos un problema!_\n\n_No hemos encontrar tu archivo en los servidores de *MediaFire.* por favor verifica que el link es correcto e intentalo de nuevo._`, id)
                }                
                break

            //EDICIONES FOTOGRAFICAS
            case 'phlogo':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length === 1) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas crear un logo al estilo de *PornHub* por favor envía un mensaje con el siquiente formato: *${prefix}pornhublogo |texto1 |texto2*_\n\n_Ejemplo: *${prefix}pornhublogo |King |Andrew*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n\n_➻ Procura que los textos 1 y 2 no tengan más de 10 letras de longitud para evitar que la imagen salga incorrecta._\n\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                if (args.length >= 2) {
                    client.reply(from, alert.process, id)
                    const ph1 = arg.split('|') [0]
                    const ph2 = arg.split('|') [1]
                    if (ph1 >= 10) return client.reply(from, '*¡texto1 demasiado largo!*\n_¡Máximo 10 letras!_', id)
                    if (ph2 >=10) return client.reply(from, '*¡texto2 demasiado largo!*\n_¡Máximo 10 letras!_', id)
                    await client.sendFileFromUrl(from, `https://api.zeks.xyz/api/phlogo?text1=${ph1}&text2=${ph2}&apikey=apivinz`, '', alert.processed, id)
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas crear un logo al estilo de *PornHub* por favor envía un mensaje con el siquiente formato: *${prefix}phlogo texto1|texto2*_\n\n_Ejemplo: *${prefix}phlogo King|Andrew*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n\n_➻ Procura que los textos 1 y 2 no tengan más de 10 letras de longitud para evitar que la imagen salga incorrecta._\n_2. Recuerda colocar correctamente la linea vertical | para evitar posibles errores en el procesamiento de la imagen._\n\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'meme':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if ((isMedia || isQuotedImage) && args.length >= 2) {
                    const top = arg.split('|')[0]
                    const bottom = arg.split('|')[1]
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, false)
                    const ImageBase64 = await meme.custom(getUrl, top, bottom)
                    client.sendFile(from, ImageBase64, 'image.png', alert.processed, null, true)
                        .catch(() => {
                            client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                        })
                } else {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas crear un meme por ti mism@, envia una imagen que contenga un mensaje con el siguiente formato: (insertar imagen) + *${prefix}meme texto superior | texto inferior*_\n\n_Ejemplo: (insertar imagen ) *${prefix}meme ahorita no joven | estoy ocupado*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n\n_1.Recuerda colocar correctamente el símbolo ➡️_ |\n_2. Evita colocar signos de puntuacion, tildes, emojis, etc, solo coloca texto comun y corriente para evitar errores_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'fotofrase':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_El comando *${prefix}fotofrase* ha cambiado, ahora puedes usar:_\n\n*╭─${prefix}fotofrase1* (fuente: spinnenkop)\n*├─${prefix}fotofrase2* (fuente: DK Honery Dew)\n*├─${prefix}fotofrase3* (fuente: Little orion)\n*╰─${prefix}fotofrase4* (fuente: betty)\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'fotofrase1'://spinnenkop
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase1 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase1 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const qmaker1 = body.trim().split('|')
                if (qmaker1.length >= 3) {
                    client.reply(from, alert.process, id)
                    try {
                        const frase = arg.split('|') [0]
                        const autorq = arg.split('|') [1]
                        const tema = arg.split('|') [2]
                        const tamaño = arg.split('|') [3]
                        const temaq = tema.replace(/ /g, '').replace('\n','')
                        const tamañoq = tamaño.replace(/ /g, '').replace('\n','')
                        const responses = await fetch(`https://terhambar.com/aw/qts/proses.php?kata=${encodeURIComponent(frase)}&author=${encodeURIComponent(autorq)}&tipe=${encodeURIComponent(temaq)}&font=./font/font1.otf&size=${encodeURIComponent(tamañoq)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/qmaker.jpg`, buffer)
                        await client.sendFile(from,'./media/qmaker.jpg', ``, alert.processed, id)    
                    }catch {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                }else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase1 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase1 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'fotofrase2'://DK Honery Dew
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase2 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase2 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const qmaker2 = body.trim().split('|')
                if (qmaker2.length >= 3) {
                    client.reply(from, alert.process, id)
                    try {
                        const frase = arg.split('|') [0]
                        const autorq = arg.split('|') [1]
                        const tema = arg.split('|') [2]
                        const tamaño = arg.split('|') [3]
                        const temaq = tema.replace(/ /g, '').replace('\n','')
                        const tamañoq = tamaño.replace(/ /g, '').replace('\n','')
                        const responses = await fetch(`https://terhambar.com/aw/qts/proses.php?kata=${encodeURIComponent(frase)}&author=${encodeURIComponent(autorq)}&tipe=${encodeURIComponent(temaq)}&font=./font/font3.otf&size=${encodeURIComponent(tamañoq)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/qmaker.jpg`, buffer)
                        await client.sendFile(from,'./media/qmaker.jpg', ``, alert.processed, id)    
                    }catch {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                }else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase2 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase2 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'fotofrase3'://Little orion
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase3 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase3 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const qmaker = body.trim().split('|')
                if (qmaker.length >= 3) {
                    client.reply(from, alert.process, id)
                    try {
                        const frase = arg.split('|') [0]
                        const autorq = arg.split('|') [1]
                        const tema = arg.split('|') [2]
                        const tamaño = arg.split('|') [3]
                        const temaq = tema.replace(/ /g, '').replace('\n','')
                        const tamañoq = tamaño.replace(/ /g, '').replace('\n','')
                        const responses = await fetch(`https://terhambar.com/aw/qts/proses.php?kata=${encodeURIComponent(frase)}&author=${encodeURIComponent(autorq)}&tipe=${encodeURIComponent(temaq)}&font=./font/font4.otf&size=${encodeURIComponent(tamañoq)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/qmaker3.jpg`, buffer)
                        await client.sendFile(from,'./media/qmaker3.jpg', ``, alert.processed, id)    
                    }catch {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                }else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase3 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase3 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break            
            case 'fotofrase4'://betty
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase4 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase4 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const qmaker4 = body.trim().split('|')
                if (qmaker4.length >= 3) {
                    client.reply(from, alert.process, id)
                    try {
                        const frase = arg.split('|') [0]
                        const autorq = arg.split('|') [1]
                        const tema = arg.split('|') [2]
                        const tamaño = arg.split('|') [3]
                        const temaq = tema.replace(/ /g, '').replace('\n','')
                        const tamañoq = tamaño.replace(/ /g, '').replace('\n','')
                        const responses = await fetch(`https://terhambar.com/aw/qts/proses.php?kata=${encodeURIComponent(frase)}&author=${encodeURIComponent(autorq)}&tipe=${encodeURIComponent(temaq)}&font=./font/font2.ttf&size=${encodeURIComponent(tamañoq)}`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/qmaker.jpg`, buffer)
                        await client.sendFile(from,'./media/qmaker.jpg', ``, alert.processed, id)    
                    }catch {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    }
                }else {
                    client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas convertir una frase en una transcripcion hermosa en una imagen envía un mensaje con el siguiente formato: *${prefix}fotofrase4 frase | autor | tema | tamaño de letra*_\n\n_Ejemplo: *${prefix}fotofrase4 Eres lo que crees que eres|-Paulo Coelho|random|90*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*❍⌇─➭ Recomendaciones:*\n_1. Recuerda colocar correctamente la linea vertical ➡️ | ⬅️ tal y como aparece en el ejemplo_\n_2. Si no sabes que tema debes colocar deja el tema "random" como aparece en el ejemplo o intenta colocar temas en ingles como: love, pink, dark, night,etc._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                }
                break
            case 'texto':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas transcribir cualquier texto en una edicion de hoja de papel realista por favor envía un mensaje con el siguiente formato: *${prefix}texto <tu texto a transcribir>*_\n\n_Ejemplo: *${prefix}texto Tu sonrisa me ilumina por dentro. Saber que estás a mi lado me da la fuerza para levantarme cada mañana. Soy una persona mucho mejor por conocer el amor, y tú eres la razón por la que conozco el amor. Estar a tu alrededor es la definición de amor puro, alegría y felicidad.*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const nulisq = body.slice(7)
                const responses = await fetch(`https://api.zeks.xyz/api/nulis?text=${nulisq}&apikey=apivinz`);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/nulis.jpg`, buffer)
                        await client.sendFile(from,'./media/nulis.jpg', ``, alert.processed, id)    
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break

            //Multimedia
            case 'youtube':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                await client.reply(from, menuId.menuYoutube(pushname), id)
                break   
            case 'ytplay':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar y descargar una canción en YouTube envía un mensaje con el siguiente formato: *${prefix}ytplay + nombre de la canción*_\n\n_*Ejemplo:*_ ${prefix}ytplay shape of you\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varias canciónes seguidas ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                axios.get(`https://api.zeks.xyz/api/ytplaymp3?q=${body.slice(8)}&apikey=apivinz`)
                .then(async (res) => {
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu canción *${body.slice(8)}* en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.data.result.thumbnail}`, ``, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada_\n\n*•─•Título:* _${res.data.result.title}_\n*•─•Link:* _${res.data.result.source}_\n\n_Tu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.data.result.url_audio);
                            const buffer = await responses.buffer(); 
                            await fs.writeFile(`./media/play2.mp3`, buffer)
                            await client.sendPtt(from,'./media/play2.mp3',id)   
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'mp3yt':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar música de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp3yt + link del video o música a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp3yt https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp3 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp3(`https://youtu.be/${linkmp3}`)
                .then(async(res) => {
                    if (res.error) client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu canción en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumbnail}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada._\n\n*•─•Titulo:* _${res.result.title}_\n*•─•Peso:* _${res.result.size}_\n\n_Tu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.result.url_audio);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp3yt.mp3`, buffer)
                             await client.sendFile(from,'./media/mp3yt.mp3',id)
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                })
                break
            case 'mp4yt':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar videos de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp4yt + link del video a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp4yt https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp4 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp4(`https://youtu.be/${linkmp4}`)
                .then(async(res) => {
                    if (res.error) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumbnail}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Video encontrado._\n\n*•─•Titulo:* _${res.result.title}_\n*•─•Peso:* _${res.result.size}_\n\n_Tu video está siendo enviado, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.result.url_video);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp4yt.mp4`, buffer)
                             await client.sendFile(from,'./media/mp4yt.mp4',id)
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                })
                break
            case 'mp3yt2':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar música de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp3yt2 + link del video o música a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp3yt2 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp32 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp32(`https://youtu.be/${linkmp32}`)
                .then(async(res) => {
                    if (res.error) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu canción en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada._\n\n*•─•Titulo:* _${res.result.title}_\n*╭─Tamaño:* _${res.result.size}_\n*╰─Calidad:* _${res.result.quality}_\n\nTu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo.\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.result.link);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp3yt2.mp3`, buffer)
                             await client.sendFile(from,'./media/mp3yt2.mp3',id)
                    .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_')
                    })
                })
                break
            case 'mp4yt2':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar videos de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp4yt2 + link del video a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp4yt2 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp42 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp42(`https://youtu.be/${linkmp42}`)
                .then(async(res) => {
                    if (res.status == 'error') return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Video encontrado._\n\n*•─•Titulo:* _${res.result.title}_\n*╭─Tamaño:* _${res.result.size}_\n*╰─Calidad:* _${res.result.quality}_\n\n_Tu video esta siendo enviado, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.result.link);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp4yt2.mp4`, buffer)
                             await client.sendFile(from,'./media/mp4yt2.mp4',id)
                })
                .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                break
            case 'mp3yt3':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar música de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp3yt3 + link del video o música a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp3yt3 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp33 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp33(`https://youtu.be/${linkmp33}`)
                .then(async(res) => {
                    if (res.error) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu canción en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada._\n\n*•─•Titulo:* ${res.result.title}_\n*•─•Tamaño:* ${res.result.filesizeF}_\n\nTu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo.\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.dl_link}`, '', ``, id)
                    /*const responses = await fetch(res.result.dl_link);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp3yt3.mp3`, buffer)
                             await client.sendFile(from,'./media/mp3yt3.mp3',id)*/
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_')
                })
                break
            case 'mp4yt3':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar videos de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp4yt3 + link del video a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp4yt3 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp43 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp43(`https://youtu.be/${linkmp43}`)
                .then(async(res) => {
                    if (res.status == 'error') return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Video encontrado._\n\n*•─•Titulo:* _${res.result.title}_\n*•─•Tamaño:* _${res.result.filesizeF}_\n\n_Tu video esta siendo enviado, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.dl_link}`, '', ``, id)
                    /*const responses = await fetch(res.result.dl_link);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp4yt3.mp4`, buffer)
                             await client.sendFile(from,'./media/mp4yt3.mp4',id)*/
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'mp3yt4':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar música de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp3yt4 + link del video o música a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp3yt4 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp34 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp34(`https://youtu.be/${linkmp34}`)
                .then(async(res) => {
                    if (res.error) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu canción en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.getImages}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada._\n\n*•─•Titulo:* _${res.titleInfo}_\n\nTu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo.\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.getAudio);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/mp3yt4.mp3`, buffer)
                        await client.sendFile(from,'./media/mp3yt4.mp3',id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_')
                })
                break
            case 'mp4yt4':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar videos de YouTube, envía un mensaje con el siguiente formato: *${prefix}mp4yt4 + link del video a descargar*_\n\n_*Ejemplo:*_ ${prefix}mp4yt4 https://www.youtube.com/watch?v=JGwWNGJdvx8\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                const linkmp44 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                kaytApi.ytmp44(`https://youtu.be/${linkmp44}`)
                .then(async(res) => {
                    if (res.status == 'error') return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de YouTube por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.getImages}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Video encontrado._\n\n*•─•Titulo:* _${res.titleInfo}_\n\n_Tu video esta siendo enviado, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.getVideo);
                               const buffer = await responses.buffer(); 
                              await fs.writeFile(`./media/mp4yt4.mp4`, buffer)
                             await client.sendFile(from,'./media/mp4yt4.mp4',id)
                })
                .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    })
                break
            case 'soundcloud':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar cualquier canción de *SoundCloud* envia un mensaje con el siguiente formato: ${prefix}soundcloud + link de souncloud de la cancion que buscas._\n\n_*Ejemplo:*_ ${prefix}soundcloud https://soundcloud.com/aviwkila/aviwkila-doa-untuk-kamu\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varias canciónes seguidas ya que esto generaría una saturación en la red causando retrasos en la respuesta a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                kaytApi.scloud(args[0])
                .then(async (res) =>{
                if (res.err) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu cancion en los servidores de *SoundCloud* por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Canción encontrada._\n\n*╭─Titulo:* _${res.result.title}_\n*├─Duración:* _${res.result.duration}_\n*╰─Calidad:* _${res.result.quality}\n\n_Tu canción esta siendo enviada, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    const responses = await fetch(res.result.download);
                        const buffer = await responses.buffer(); 
                        await fs.writeFile(`./media/scloud.mp3`, buffer)
                        await client.sendFile(from,'./media/scloud.mp3',id)
                })
                .catch(()=>{
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'facebook':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Estos son los comandos de Facebook que puedes usar*_\n\n*•─•${prefix}fbsd:* _Para descargar videos de Facebook en baja calidad (SD)_\n*•─•${prefix}fbhd:*_ Para descargar videos de Facebook en alta calidad (HD)_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'fbsd':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Para descargar videos de Facebook en baja resolución (SD), envía un mensaje con el siguiente formato *${prefix}fbsd + link del video*_\n\n_*Ejemplo:*_ ${prefix}fbsd https://www.facebook.com/watch/?v=3842956882410297\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                kaytApi.fb(args[0])
                .then(async (res) => {
                    const { link, linksd} = res
                    if (res.status == 'error') return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de Facebook por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, linksd, '', '*↻     ◃◁  II  ▷▹     ⇄*\n_Video Descargado._', id)
                })
                .catch(() => {
                        client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'fbhd':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Para descargar videos de Facebook en Alta Resolución (HD), envía un mensaje con el siguiente formato *${prefix}fbhd + link del video*_\n\n_*Ejemplo:*_ ${prefix}fbhd https://www.facebook.com/watch/?v=3842956882410297 \n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                kaytApi.fb(args[0])
                .then(async (res) => {
                    const { link, linkhd} = res
                    if (res.status == 'error') return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de Facebook por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, linkhd, '', '*↻     ◃◁  II  ▷▹     ⇄*\n_Video Descargado._', id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'tiktok':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar un video de *TikTok* sin marcas de agua por favor envia un mensaje con el siguiente formato: *${prefix}tiktok + link del video*_\n\n_*Ejemplo:*_ ${prefix}tiktok https://www.tiktok.com/@graciajessicajane/video/6910824586909076738\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en la respuesta a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                kaytApi.tiktoknowm(args[0])
                .then(async (res) =>{
                if (res.err) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Estoy buscando tu video en los servidores de TikTok por favor espera..._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Video encontrado._\n\n*•─•Titulo:* _${res.result.title}_\n*•─•Usuario:* _${res.result.username}_\n\n_Tu video esta siendo enviado, por favor ten paciencia, este proceso puede tardar un tiempo._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    await client.sendFileFromUrl(from, `${res.result.result.server_1}`, '', '*↻     ◃◁  II  ▷▹     ⇄*\n_Video Descargado._', id)
                })
                .catch(()=>{
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'twitter':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_*Estos son los comandos de Twitter que puedes usar*_\n\n*•─•${prefix}twittervideo* : para descargar videos de twitter_\n*•─•${prefix}twitterimagen* : para descargar imágenes de twitter_\n*••${prefix}espiartwitter* : para obtener información acerca de un perfil en twitter_\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varios elementos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                break
            case 'twittervideo':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar videos de Twitter, envía un mensaje con el siguiente formato: *${prefix}twittervideo + link del video a descargar*_\n\n_*Ejemplo:*_ ${prefix}twittervideo https://twitter.com/i/status/1356449902423867393\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_💡Recuerda no solicitar varios videos seguidos ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    kaytApi.twvid(args[0])
                .then(async(res)=>{
                    if (res.err) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.sendFileFromUrl(from, `${res.result.videos}`, '', `*↻     ◃◁  II  ▷▹     ⇄*\n_Video Descargado._`, id)
                })
                .catch(()=>{
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'twitterimagen':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas descargar imágenes de Twitter, envía un mensaje con el siguiente formato: *${prefix}twitterimagen + link de la imágen a descargar*_\n\n_*Ejemplo:*_ ${prefix}twitterimagen https://twitter.com/TuMemeCristiano/status/1333483917635096577\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n_❍⌇─➭Recomendaciones:_\n_1. Recuerda no solicitar varias imagenes seguidas ya que esto generaría una saturación en la red causando retrasos en las respuestas a los demás comandos._\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    kaytApi.twimg(args[0])
                .then(async(res)=>{
                    if (res.err) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.sendFileFromUrl(from, `${res.result.images}`, '', `_Aqui esta tu imágen_`, id)
                })
                .catch(()=>{
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'espiartwitter':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (!isVip) return client.reply(from, alert.vips, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas buscar información acerca de un perfil en Twitter, envía un mensaje con el siguiente formato: *${prefix}espiartwitter + nombre de usuario*_\n\n_Ejemplo: *${prefix}espiartwitter andrewking71923*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                    kaytApi.twstalk(args[0])
                .then(async(res)=>{
                    if (res.err) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                    await client.sendFileFromUrl(from, `${res.result.profile}`, '', `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n\n*╭─Nombre Completo:* _${res.result.fullname}_\n*├─Nombre de Usuario:* _${res.result.username}_\n*├─Descripción:* _${res.result.descText}_\n*├─Descripción Url:* _${res.result.descUrl.replace('Not Found!','No Encontrado!')}_\n*├─Seguidores:* _${res.result.follower.replace('Followers','Seguidores')}_\n*╰─Siguiendo:* _${res.result.following.replace('Following','Siguiendo')}_\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
                })
                .catch(()=>{
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                })
                break
            case 'espiarig':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
               if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas obtener informacion de un perfil de instagram envia un mensaje con el siguiente formato: *${prefix}espiarig + usuario*_\n\n_❍⌇─➭Ejemplo: *${prefix}espiarig andrewtutoriales*_\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`, id)
               const stalk = await fetch(`https://api.zeks.xyz/api/igstalk?username=${body.slice(10)}&apikey=apivinz`)
               const stlk = await stalk.json()
                if (stalk.status == false) return client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_', id)
                if (stalk.error) return client.reply(from, stalk.error, id)
                const caps = `*⋆⋅⋅⋅⊱∘───[✧IG✧]───∘⊰⋅⋅⋅⋆*\n\n*╭─Nombre* : ${stlk.fullname}\n*├─Usuario* : ${stlk.username}\n*├─Seguidores* : ${stlk.follower}\n*├─Siguiendo* : ${stlk.following}\n*╰─Biografía* : ${stlk.bio}\n\n*⋆⋅⋅⋅⊱∘───[✧ᴷᴮ✧]───∘⊰⋅⋅⋅⋆*`
                await client.sendFileFromUrl(from, stlk.profile_pic, 'Pict.jpg', caps, id)
                break

            //FRASES
            case 'curiosidades':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/KingAndrewYT/resources/main/random/curiosidades.txt')
                .then(res => res.text())
                .then(body => {
                    let splitnix = body.split('\n')
                    let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                    client.reply(from, randomnix, id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                })
                break
            case 'gracias':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/KingAndrewYT/resources/main/gracias.txt')
                .then(res => res.text())
                .then(body => {
                    let splitnix = body.split('\n')
                    let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                    client.reply(from, randomnix, id)
                })
                .catch(() => {
                    client.reply(from, '!Gracias a ti! (◕ᴗ◕✿), Es un placer ayudarte!', id)
                })
                break
            case 'chistes':
                case 'chiste':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/KingAndrewYT/resources/main/random/chistes.txt')
                .then(res => res.text())
                .then(body => {
                    let splitpantun = body.split('\n')
                    let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                    client.reply(from, randompantun.replace(/botka/g,"\n"), id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                })
                break
            case 'motivaciones':
                case 'motivaciones':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                fetch('https://raw.githubusercontent.com/KingAndrewYT/resources/main/random/motivacion.txt')
                .then(res => res.text())
                .then(body => {
                    let splitpantun = body.split('\n')
                    let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                    client.reply(from, randompantun.replace(/botka/g,"\n"), id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_No he podido contactar con el servidor, por favor intentalo mas tarde._', id)
                })
                break

            //CAMBIADOR DE FUENTES
            case 'fancytext':
                if (!isGroupMsg) return client.reply(from, alert.groups, id)
                if (args.length == 0) return client.reply(from, `*⋆⋅⋅⋅⊱∘───[✧FT✧]───∘⊰⋅⋅⋅⋆*\n_Si deseas cambiar el estilo de fuente de un texto común y corriente a un texto con estilos de fuente espectaculares envía un mensaje con el siguiente formato: *${prefix}fancytext + texto a convertir*_\n\n_Ejemplo: *${prefix}fancytext King Andrew YT*_\n*⋆⋅⋅⋅⊱∘───[✧✧✧]───∘⊰⋅⋅⋅⋆*`, id)
                kaytApi.ftext(body.slice(11))
                .then(async (res) => {
                    await client.reply(from, `${res}`, id)
                })
                .catch(() => {
                    client.sendFile(from, `./media/error404.jpg`, '', '_¡Houston, tenemos un problema!_\n\n_Ha ocurrido un error al procesar tu solicitud, por favor verifica que el texto que has enviado no sea demasiado extenso._', id)
                })
                break
            

            break

		default:
			if (isCmd){
				await client.sendText(from, `_El comando ${prefix}${command} no existe en nuestra lista de comandos, por favor verifica que este bien escrito e intenta nuevmaente._\n_Tambien puedes colocar el comando ${prefix}menu para ver el menu de utilizades._`)
			}
			break
		}
	} catch (err){
        console.log(color('[ERROR]', 'red'), err)
	}
	
}
