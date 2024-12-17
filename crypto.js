// AES Algorithms work

import CryptoJS from "crypto-js";

const cipherText = CryptoJS.AES.encrypt('hiren Parmar', "123").toString()   //123 is key
console.log("cipher Text :", cipherText)

const plaintext = CryptoJS.AES.decrypt(cipherText,"123").toString(CryptoJS.enc.Utf8)
console.log("Plain Text :", plaintext)