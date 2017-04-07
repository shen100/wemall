package helpers

// Helpers handlebars 实用函数
var Helpers map[string]interface{}

func init() {
	Helpers = make(map[string]interface{})
	Helpers["equal222222"] = func() bool {
		return true
	}
}