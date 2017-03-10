package product

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "github.com/julienschmidt/httprouter"
    "net/http"
    "../../config"
    "../../model"
    "../common"
)

var sendJson func(res http.ResponseWriter, result map[string]interface{})
var sendError func(res http.ResponseWriter)
var code map[string]int

func init() {
    code      = model.ErrorCode
    sendJson  = common.SendJson
    sendError = common.SendError
}

func ListByAdmin(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
    var products []model.Product
    var result = make(map[string]interface{})

    db, err := gorm.Open(config.DB_DIALECT, config.DB_URL)
    
    if err != nil {
        sendError(res)
        return;
    }

    db.Find(&products)
    
    var productMap         = make(map[string]interface{})
    productMap["products"] = products;
    result["errNo"]        = code["SUCCESS"]
    result["msg"]          = "success"
    result["data"]         = productMap
    
    sendJson(res, result)

    defer db.Close()
}