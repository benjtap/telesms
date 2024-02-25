
import CryptoJS from 'crypto-js'
import VueRouter from 'vue-router'
const encryptsecret ="secretkey123";

const encrypted =false;

export default {
    
    encrypt (message) {
       
      // debugger
        var cipherText = CryptoJS.AES.encrypt(
            message.toString(),
            encryptsecret
          ).toString();
          console.log(cipherText)
          
      return cipherText
    },
    decrypt(message) {
        var bytes = CryptoJS.AES.decrypt(message, encryptsecret);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    },
   
  

   
  }
