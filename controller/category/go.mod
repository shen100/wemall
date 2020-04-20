module controller/category

go 1.13

require (
	config v0.0.0-00010101000000-000000000000
	controller/common v0.0.0-00010101000000-000000000000
	golang.org/x/net v0.0.0-20200324143707-d3edc9973b7e // indirect
	gopkg.in/kataras/iris.v6 v6.0.0-20170603191843-09a2066268f9
	model v0.0.0-00010101000000-000000000000
)

replace (
	config => ./../../config
	controller/common => ./../../controller/common
	model => ./../../model
	utils => ./../../utils
)
