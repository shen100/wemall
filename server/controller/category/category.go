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

var sendJson func(res http.ResponseWriter, result map[string]interface{})
var code map[string]int

func init() {
    sendJson = common.SendJson
    code     = model.ErrorCode
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
        result["errNo"]       = code["ERROR"]
        result["msg"]         = "error"
        result["data"]        = make(map[string]interface{})
        sendJson(res, result)
        return;
    }

    db.Find(&categories)
    
    var cateMap           = make(map[string]interface{})
    cateMap["categories"] = categories;
    result["errNo"]       = code["SUCCESS"]
    result["msg"]         = "success"
    result["data"]        = cateMap
    
    sendJson(res, result)

    //return res.render('admin/category/listCategory');
    
    defer db.Close()
}

func OpenOrClose(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
    fmt.Fprint(res, "OpenOrClose!\n")
}