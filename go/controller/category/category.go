package category

import (
	"unicode/utf8"
	"strings"
	"strconv"
	"gopkg.in/kataras/iris.v6"
	"wemall/go/config"
	"wemall/go/model"
)

// Save 保存分类（创建或更新）
func Save(ctx *iris.Context, isEdit bool) {
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
	} else if category.Sequence < minOrder || category.Sequence > maxOrder {
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

	if category.ParentID != 0 {
		var parentCate model.Category
		parentErr := model.DB.First(&parentCate, category.ParentID).Error
		
		if parentErr != nil {
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "无效的父分类",
				"data"  : iris.Map{},
			})
			return
		}
	}

	var saveErr error
	var errMsg = "error."
	var updatedCategory model.Category
	if (!isEdit) {
		//创建分类
		saveErr = model.DB.Create(&category).Error
	} else {
		//更新分类
		saveErr = model.DB.First(&updatedCategory, category.ID).Error
		if saveErr == nil {
			updatedCategory.Name     = category.Name
			updatedCategory.Sequence = category.Sequence
			updatedCategory.ParentID = category.ParentID
			updatedCategory.Status   = category.Status
			updatedCategory.Remark   = category.Remark
			saveErr = model.DB.Save(&updatedCategory).Error
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

	var categoryJSON = category
	if isEdit {
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
	Save(ctx, false)	
}

// Update 更新分类
func Update(ctx *iris.Context) {
	Save(ctx, true)	
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

	var category model.Category
	queryErr := model.DB.First(&category, id).Error

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

// AllList 所有的分类列表
func AllList(ctx *iris.Context) {
	var categories []model.Category
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
	queryErr := model.DB.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&categories).Error

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

// List 公开的分类列表
func List(ctx *iris.Context) {
	var categories []model.Category

	if model.DB.Where("status = 1").Order("sequence asc").Find(&categories).Error != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
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

	var cate model.Category
	dbErr := model.DB.First(&cate, id).Error

	if dbErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的id!",
			"data"  : iris.Map{},
		})
		return
	}

	cate.Status = status

	saveErr := model.DB.Save(&cate).Error
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
