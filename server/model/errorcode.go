package model

var ErrorCode map[string]int

func init() {
	ErrorCode = make(map[string]int)
	ErrorCode["SUCCESS"] = 0
	ErrorCode["ERROR"]   = 1
}