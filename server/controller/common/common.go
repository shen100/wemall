package common

import (
    "encoding/json"
    "fmt"
    "net/http"
    "../../model"
)

var code map[string]int

func init() {
    code = model.ErrorCode
}

func SendJson(res http.ResponseWriter, result map[string]interface{}) {
    resData, err := json.Marshal(result)
    if err != nil {
        result          = make(map[string]interface{})
        result["errNo"] = code["ERROR"]
        result["msg"]   = "error"
        result["data"]  = make(map[string]interface{})
        resData, _      = json.Marshal(result)
    }
    res.Header().Set("Content-Type", "application/json; charset=UTF-8")
    fmt.Fprint(res, string(resData))
}

func SendSuccess(res http.ResponseWriter) {
    SendSuccessWithData(res, make(map[string]interface{}))
}

func SendSuccessWithData(res http.ResponseWriter, data map[string]interface{}) {
    var result            = make(map[string]interface{})
    result["errNo"]       = code["SUCCESS"]
    result["msg"]         = "success"
    result["data"]        = data
    SendJson(res, result) 
}

func SendError(res http.ResponseWriter) {
    SendErrorWithMsg(res, "error")
}

func SendErrorWithMsg(res http.ResponseWriter, msg string) {
    var result            = make(map[string]interface{})
    result["errNo"]       = code["ERROR"]
    result["msg"]         = msg
    result["data"]        = make(map[string]interface{})
    SendJson(res, result) 
}