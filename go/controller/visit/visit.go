package visit

import (
	"../../model"
	"gopkg.in/kataras/iris.v6"
)

// Latest30Day 近30天，每天的PV
func Latest30Day(ctx *iris.Context) {
	var userVisit model.UserVisit;
	result := userVisit.Latest30DayPV()
	var data iris.Map;
	if result == nil {
		data = iris.Map{
			"list": [0]int{},
		}
	} else {
		data = iris.Map{
			"list": result,
		}
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}
