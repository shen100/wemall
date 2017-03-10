package category

import (
    "strconv"
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
var sendErrorWithMsg func(res http.ResponseWriter, msg string)
var sendSuccessWithData func(res http.ResponseWriter, data map[string]interface{})
var code map[string]int

func init() {
    code                = model.ErrorCode
    sendJson            = common.SendJson
    sendSuccessWithData = common.SendSuccessWithData
    sendError           = common.SendError
    sendErrorWithMsg    = common.SendErrorWithMsg
}

func ListByAdmin(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
    var categories []model.Category
    var result = make(map[string]interface{})

    db, err := gorm.Open(config.DB_DIALECT, config.DB_URL)
    
    if err != nil {
        sendError(res)
        return;
    }

    db.Find(&categories)
    
    var cateMap           = make(map[string]interface{})
    cateMap["categories"] = categories;
    result["errNo"]       = code["SUCCESS"]
    result["msg"]         = "success"
    result["data"]        = cateMap
    
    sendJson(res, result)

    defer db.Close()
}

func OpenOrCloseStatus(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
    id,     err1 := strconv.Atoi(params.ByName("id"))  
    status, err2 := strconv.Atoi(params.ByName("status"))

    if err1 != nil {
        sendErrorWithMsg(res, "无效的id") 
        return;
    }

    if err2 != nil {
        sendErrorWithMsg(res, "无效的status") 
        return;
    }

    if status != model.CATEGORY_STATUS_OPEN && status != model.CATEGORY_STATUS_CLOSE {
        sendErrorWithMsg(res, "无效的status!")
        return 
    }

    db, err := gorm.Open(config.DB_DIALECT, config.DB_URL)
    
    if err != nil {
        sendError(res)
        return;
    }

    var cate model.Category
    dbErr := db.First(&cate, id).Error
    
    if dbErr != nil {
        sendErrorWithMsg(res, "无效的id!")
        return;    
    }

    cate.Status = status

    saveErr := db.Save(&cate).Error
    if saveErr != nil {
        sendErrorWithMsg(res, "分类状态更新失败")
        return;    
    }
    data := make(map[string]interface{})
    data["id"]     = id
    data["status"] = status
    sendSuccessWithData(res, data)
}



















