package common

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func SendJson(res http.ResponseWriter, result map[string]interface{}) {
    resData, err := json.Marshal(result)

    if err != nil {
        result          = make(map[string]interface{})
        result["errNo"] = 1
        result["msg"]   = "error"
        result["data"]  = make(map[string]interface{})
    }


    res.Header().Set("Content-Type", "application/json; charset=UTF-8")
    fmt.Fprint(res, string(resData))
}