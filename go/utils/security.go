package utils

import (
    "encoding/base64"
	"crypto/aes"
	"crypto/cipher"
	"fmt"
)

// DecodeWeAppUserInfo 解密微信小程序用户信息
func DecodeWeAppUserInfo(encryptedData string, sessionKey string, iv string) (string, error) {
	cipher, err := base64.StdEncoding.DecodeString(encryptedData)
	if err != nil {
		fmt.Println("encryptedData: ", encryptedData, "\n", err.Error())
		return "", err
	}

	key, keyErr := base64.StdEncoding.DecodeString(sessionKey)
	if keyErr != nil {
		fmt.Println("sessionKey: ", sessionKey, "\n", keyErr.Error())
		return "", keyErr
	}

	theIV, ivErr := base64.StdEncoding.DecodeString(iv)
	if ivErr != nil {
		fmt.Println("iv: ", iv, "\n", ivErr.Error())
		return "", ivErr
	}
	
	result, resultErr := AESDecrypt(cipher, key, theIV)
	resultStr := string(result)
	fmt.Println(resultStr)
	return string(result), resultErr
}

func AESDecrypt(ciphertext, key, iv []byte) ([]byte, error) {
   block, err := aes.NewCipher(key) //选择加密算法
   if err != nil {
      return nil, err
   }
   blockModel := cipher.NewCBCDecrypter(block, iv)
   plantText := make([]byte, len(ciphertext))
   blockModel.CryptBlocks(plantText, ciphertext)
   plantText = PKCS7UnPadding(plantText, block.BlockSize())
   return plantText, nil
}

func PKCS7UnPadding(plantText []byte, blockSize int) []byte {
   length := len(plantText)
   unpadding := int(plantText[length-1])
   return plantText[:(length - unpadding)]
}
