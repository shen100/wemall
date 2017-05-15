package category

import (
	"unicode/utf8"
	"strings"
	"strconv"
	"github.com/jinzhu/gorm"
	"gopkg.in/kataras/iris.v6"
	"wemall/go/config"
	"wemall/go/model"
)

// Save 保存分类（创建或更新）
func Save(ctx *iris.Context) {
	// name, parentId, status, order 必须传的参数
	// remark 非必须
	minOrder := config.ServerConfig.MinOrder
	maxOrder := config.ServerConfig.MaxOrder
	var category model.Category
	err     := ctx.ReadJSON(&category)
	
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	isError := false
	msg     := ""

	category.Name = strings.TrimSpace(category.Name)
	if (category.Name == "") {
		isError = true
		msg     = "分类名称不能为空"
	} else if utf8.RuneCountInString(category.Name) > config.ServerConfig.MaxNameLen {
		isError = true
		msg     = "分类名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"
	} else if category.Status != model.CategoryStatusOpen && category.Status != model.CategoryStatusClose {
		isError = true
		msg     = "status无效"
	} else if category.Order < minOrder || category.Order > maxOrder {
		isError = true
		msg     = "分类的排序要在" + strconv.Itoa(minOrder) + "到" + strconv.Itoa(maxOrder) + "之间"
	} else if category.Remark != "" && utf8.RuneCountInString(category.Remark) > config.ServerConfig.MaxRemarkLen {
		isError = true
		msg     = "备注不能超过" + strconv.Itoa(config.ServerConfig.MaxRemarkLen) + "个字符"	
	}
	if isError {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : msg,
			"data"  : iris.Map{},
		})
		return
	}

	db, connErr := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if connErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	if category.ParentID != 0 {
		var parentCate model.Category
		parentErr := db.First(&parentCate, category.ParentID).Error
		
		if parentErr != nil {
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "无效的父分类",
				"data"  : iris.Map{},
			})
			return
		}
	}

	var createOrUpdate string
	if (ctx.Get("createOrUpdate") != nil) {
		createOrUpdate = ctx.Get("createOrUpdate").(string)
	} else {
		createOrUpdate = ""	
	}

	var saveErr error
	var errMsg = "error."
	var updatedCategory model.Category
	if (createOrUpdate != "update") {
		//创建分类
		saveErr = db.Create(&category).Error
	} else {
		//更新分类
		saveErr = db.First(&updatedCategory, category.ID).Error
		if saveErr == nil {
			updatedCategory.Name     = category.Name
			updatedCategory.Order    = category.Order
			updatedCategory.ParentID = category.ParentID
			updatedCategory.Status   = category.Status
			updatedCategory.Remark   = category.Remark
			saveErr = db.Save(&updatedCategory).Error
		} else {
			errMsg = "无效的分类id"
		}
	}
	if saveErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : errMsg,
			"data"  : iris.Map{},
		})
		return	
	}

	var categoryJSON model.Category = category
	if createOrUpdate == "update" {
		categoryJSON = updatedCategory
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"category": categoryJSON,
		},
	})
	return
}

// Create 创建分类
func Create(ctx *iris.Context) {
	Save(ctx)	
}

// Update 更新分类
func Update(ctx *iris.Context) {
	ctx.Set("createOrUpdate", "update")
	Save(ctx)	
}

// Info 获取分类信息
func Info(ctx *iris.Context) {
	id, err := ctx.ParamInt("id")
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的分类id",
			"data"  : iris.Map{},
		})
		return
	}

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	var category model.Category
	queryErr := db.First(&category, id).Error

	if queryErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的分类id",
			"data"  : iris.Map{},
		})
		return
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"category": category,
		},
	})
}

// List 分类列表
func List(ctx *iris.Context) {
	var categories []model.Category

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"data"  : iris.Map{},
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
		})
		return
	}

	defer db.Close()

	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))
 
	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	//默认按创建时间，降序来排序
	var orderStr = "created_at"
	if ctx.FormValue("asc") == "1" {
		orderStr += " asc"
	} else {
		orderStr += " desc"	
	}

	offset   := (pageNo - 1) * config.ServerConfig.PageSize
	queryErr := db.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&categories).Error

	if queryErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"categories": categories,
		},
	})
}

// UpdateStatus 开启或关闭分类
func UpdateStatus(ctx *iris.Context) {
	var category model.Category
	err    := ctx.ReadJSON(&category)

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的id或status",
			"data"  : iris.Map{},
		})
		return
	}

	id     := category.ID
	status := category.Status

	if status != model.CategoryStatusOpen && status != model.CategoryStatusClose {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的status!",
			"data"  : iris.Map{},
		})
		return
	}

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	var cate model.Category
	dbErr := db.First(&cate, id).Error

	if dbErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的id!",
			"data"  : iris.Map{},
		})
		return
	}

	cate.Status = status

	saveErr := db.Save(&cate).Error
	if saveErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "分类状态更新失败",
			"data"  : iris.Map{},
		})
		return
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"id"     : id,
			"status" : status,
		},
	})
}
