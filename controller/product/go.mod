module controller/product

go 1.13

require (
	config v0.0.0-00010101000000-000000000000
	controller/common v0.0.0-00010101000000-000000000000
	github.com/kataras/iris/v12 v12.1.8
	model v0.0.0-00010101000000-000000000000
)

replace (
	config => ./../../config
	controller/common => ./../../controller/common
	model => ./../../model
	utils => ./../../utils
)
