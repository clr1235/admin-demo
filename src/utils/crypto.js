// 加密 解密
import CryptoJS from 'crypto-js';

// MD5
const md5 = data => CryptoJS.MD5(data).toString();

function getAesString(data, key, iv) { // 加密
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString(); // 返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) { // 解密
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// AES 对称秘钥加密
const aes = {
    en: (data, KP) => getAesString(data, KP.key, KP.iv),
    de: (data, KP) => getDAesString(data, KP.key, KP.iv)
};



/**
 * 签名
 * @param ssid 会话id
 * @param nonce 随机数
 * @param timestamp 签名时间戳
 */
const sign = (KP, ssid, nonce, timestamp,url) => {
    const signsrc = ssid + nonce + timestamp + url;
    const aesEn = aes.en(signsrc, KP);
    const md5aesEn = md5(aesEn);
    return md5aesEn;
};

/* 登录密码加密 */
const encryptPassword = (KP, password) => {
    const aesPass = aes.en(password, KP);
    return aesPass;
};

/* 登录用户名加密 */
const uname = (KP, username) => {
    const aesUser = aes.en(username, KP);
    return aesUser;
};

/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
const aesEncrypt = (word, keyWord = 'XwKsGlMcdPMEhR1B') => {
    var key = CryptoJS.enc.Utf8.parse(keyWord)
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  }

export {
    aes,
    md5,
    sign,
    encryptPassword,
    uname,
    aesEncrypt,
};