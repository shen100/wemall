package category

import (
    "fmt"
    "github.com/jinzhu/gorm"
    "github.com/julienschmidt/httprouter"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "net/http"
    "../../config"
    "../../model"
    "../common"
)

var SendJson func(res http.ResponseWriter, result map[string]interface{})
var ErrorCode map(string)int

func init() {
    SendJson  = common.SendJson
    ErrorCode = model.ErrorCode
}

func Create(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "Create!\n")
}

func Edit(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "Edit!\n")
}

func ListByAdmin(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
    var categories []model.Category
    var result = make(map[string]interface{})

    db, err := gorm.Open(config.DB_DIALECT, config.DB_URL)
  	
    if err != nil {
        result["errNo"]       = ErrorCode.ERROR
        result["msg"]         = "error"
        result["data"]        = make(map[string]interface{})
        SendJson(res, result)
        return;
    }

    db.Find(&categories)
    
    var cateMap           = make(map[string]interface{})
    cateMap["categories"] = categories;
    result["errNo"]       = 0
    result["msg"]         = "success"
    result["data"]        = cateMap
    
    SendJson(res, result)

    //return res.render('admin/category/listCategory');
    
    defer db.Close()
}

func OpenOrClose(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "OpenOrClose!\n")
}