module controller/user

go 1.13

require (
	config v0.0.0-00010101000000-000000000000
	controller/common v0.0.0-00010101000000-000000000000
	github.com/kataras/iris/v12 v12.1.8
	golang.org/x/net v0.0.0-20200324143707-d3edc9973b7e // indirect
	model v0.0.0-00010101000000-000000000000
	utils v0.0.0-00010101000000-000000000000
)

replace (
	config => ./../../config
	controller/common => ./../../controller/common
	model => ./../../model
	utils => ./../../utils
)
