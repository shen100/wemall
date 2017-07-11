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
	if resultErr != nil {
		return "", resultErr
	}
	return string(result), nil
}

// AESDecrypt AES解密
func AESDecrypt(cipherBytes, key, iv []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil {
        return nil, err
    }
    blockModel := cipher.NewCBCDecrypter(block, iv)
    dst        := make([]byte, len(cipherBytes))
    blockModel.CryptBlocks(dst, cipherBytes)
    dst = PKCS7UnPadding(dst, block.BlockSize())
    return dst, nil
}

// PKCS7UnPadding pkcs7填充方式
func PKCS7UnPadding(dst []byte, blockSize int) []byte {
    length    := len(dst)
    unpadding := int(dst[length - 1])
    return dst[:(length - unpadding)]
}
