module wemall

go 1.13

require (
	config v0.0.0-00010101000000-000000000000
	github.com/jinzhu/gorm v1.9.12
	gopkg.in/kataras/iris.v6 v6.0.0-20170603191843-09a2066268f9
	model v0.0.0-00010101000000-000000000000
	route v0.0.0-00010101000000-000000000000
)

replace (
	config => ./config
	controller/admin => ./controller/admin
	controller/cart => ./controller/cart
	controller/category => ./controller/category
	controller/common => ./controller/common
	controller/order => ./controller/order
	controller/product => ./controller/product
	controller/ueditor => ./controller/ueditor
	controller/user => ./controller/user
	controller/visit => ./controller/visit
	model => ./model
	route => ./route
	utils => ./utils
)
